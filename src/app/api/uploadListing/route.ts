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
    const data = await req.json(); // Extract data from the request
    const userId = data.userId;

    // Extract image keys from the data
    const imageKeys = Object.keys(data).filter((key) =>
      key.startsWith('image'),
    );

    // Upload images to Cloudinary
    const uploadPromises = imageKeys.map(async (imageKey) => {
      const base64String = data[imageKey];
      console.log(`Type of base64String for ${imageKey}:`, typeof base64String);

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
        return { [imageKey]: uploadResponse.secure_url }; // Return the image URL
      }
      return null;
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const imageUrls = uploadedImages.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {},
    );

    // Combine the data with the uploaded image URLs
    const listingData = {
      ...data, // Original data
      ...imageUrls, // Cloudinary URLs
      status: 'not verified',
      active: true,
      createdAt: serverTimestamp(),
      views: 0,
    };

    // Save listing to Firestore
    const docRef = await addDoc(collection(db, 'listings'), listingData);

    // Update user's listings array in Firestore
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      listings: arrayUnion(docRef.id),
    });

    return NextResponse.json({
      message: 'Listing published successfully',
    });
  } catch (error) {
    console.error('Error publishing listing:', error);
    return NextResponse.json(
      { message: 'Failed to publish listing' },
      { status: 500 },
    );
  }
}
