import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import cloudinary from 'cloudinary';
import {
  setDoc,
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import slugify from 'slugify';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function createUniqueSlug(title: string, city: string) {
  const baseSlug = slugify(`${title}-${city}`, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let isUnique = false;

  while (!isUnique) {
    const listingRef = doc(db, 'listings', uniqueSlug);
    const listingSnapshot = await getDoc(listingRef);
    if (listingSnapshot.exists()) {
      uniqueSlug = `${baseSlug}-${Math.random().toString(36).substr(2, 5)}`;
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

    const slug = await createUniqueSlug(data.title, data.city);

    const images = data.images || [];
    const uploadPromises = images.map(async (imageBase64: string) => {
      if (imageBase64.startsWith('data:image')) {
        const uploadResponse = await cloudinary.v2.uploader.upload(
          imageBase64,
          {
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          },
        );
        return uploadResponse.secure_url;
      }
      return imageBase64;
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const filteredImageUrls = uploadedImages.filter(Boolean);

    const listingData = {
      ...data,
      images: filteredImageUrls,
      status: 'created',
      verified: false,
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
      message: 'Listing created successfully',
      listingSlug: slug,
    });
  } catch (error) {
    // console.error('Error creating listing:', error);
    return NextResponse.json(
      { message: 'Failed to create listing' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const { propertyId, ownerId, ...updateData } = data;

    // console.log('Received payload:', data);

    if (!propertyId) {
      // console.error('Property ID is missing in request body');
      return NextResponse.json(
        { message: 'Property ID is required' },
        { status: 400 },
      );
    }

    const listingRef = doc(db, 'listings', propertyId);
    const listingSnapshot = await getDoc(listingRef);

    if (!listingSnapshot.exists()) {
      // console.error('Document with the specified propertyId does not exist');
      return NextResponse.json(
        { message: 'Listing does not exist' },
        { status: 404 },
      );
    }

    // console.log('Updating Firestore document...');
    await updateDoc(listingRef, { ...updateData });
    // console.log('Firestore document updated successfully');

    return NextResponse.json({
      message: 'Listing updated successfully',
      listingSlug: propertyId,
    });
  } catch (error) {
    // console.error('Error updating listing:', error);
    return NextResponse.json(
      { message: 'Failed to update listing' },
      { status: 500 },
    );
  }
}
