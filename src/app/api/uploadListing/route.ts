import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import cloudinary from 'cloudinary';
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = data.userId;

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
    };

    const docRef = await addDoc(collection(db, 'listings'), listingData);

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      listings: arrayUnion(docRef.id),
    });

    return NextResponse.json({
      message: 'Listing published successfully',
      listingId: docRef.id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to publish listing' },
      { status: 500 },
    );
  }
}
