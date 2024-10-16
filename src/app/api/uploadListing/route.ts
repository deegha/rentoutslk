import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import cloudinary from 'cloudinary';
import {
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import slugify from 'slugify';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function generateRandomDigits(length: number): string {
  return Math.random()
    .toString()
    .slice(2, 2 + length);
}

async function createUniqueSlug(title: string, place: string) {
  const baseSlug = slugify(`${title}-${place}`, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let isUnique = false;

  while (!isUnique) {
    const listingRef = doc(db, 'listings', uniqueSlug);
    const listingSnapshot = await getDoc(listingRef);

    if (listingSnapshot.exists()) {
      uniqueSlug = `${baseSlug}-${generateRandomDigits(5)}`;
    } else {
      isUnique = true;
    }
  }

  return uniqueSlug;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = data.userId;

    const slug = await createUniqueSlug(data.title, data.place);

    const imageKeys = Object.keys(data).filter((key) =>
      key.startsWith('image'),
    );

    const uploadPromises = imageKeys.map(async (imageKey) => {
      const base64String = data[imageKey];

      if (
        typeof base64String === 'string' &&
        base64String.startsWith('data:image')
      ) {
        const uploadResponse = await cloudinary.v2.uploader.upload(
          base64String,
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          },
        );
        return { [imageKey]: uploadResponse.secure_url };
      }
      return null;
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {},
    );

    const listingData = {
      ...data,
      ...imageUrls,
      status: 'not verified',
      active: true,
      createdAt: serverTimestamp(),
      views: 0,
      ownerId: userId,
    };

    const listingRef = doc(db, 'listings', slug);
    await setDoc(listingRef, listingData);

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      listings: arrayUnion(slug),
    });

    return NextResponse.json({
      message: 'Listing published successfully',
      listingSlug: slug,
    });
  } catch (error) {
    console.error('Error publishing listing:', error);
    return NextResponse.json(
      { message: 'Failed to publish listing' },
      { status: 500 },
    );
  }
}
