import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import sgMail from '@sendgrid/mail';

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const sendGridFromEmail = process.env.SENDGRID_FROM_EMAIL;

if (!sendGridApiKey || !sendGridFromEmail) {
  throw new Error(
    'SendGrid API Key or From Email is missing in environment variables.',
  );
}

sgMail.setApiKey(sendGridApiKey);

export async function POST(req: NextRequest) {
  try {
    const {
      propertyId,
      ownerId,
      userId,
      name,
      email,
      phone,
      message,
      firstQuestion,
      secondQuestion,
      customQuestion,
    } = await req.json();

    if (!propertyId || !ownerId || !userId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const ownerRef = doc(db, 'users', ownerId);
    const ownerDoc = await getDoc(ownerRef);

    if (!ownerDoc.exists()) {
      console.error('Owner not found for ID:', ownerId);
      return NextResponse.json({ message: 'Owner not found' }, { status: 404 });
    }

    const ownerData = ownerDoc.data();
    if (!ownerData?.email) {
      throw new Error('Owner email is missing');
    }

    const tourRequestRef = await addDoc(collection(db, 'tourRequests'), {
      propertyId,
      ownerId,
      userId,
      name,
      email,
      phone,
      message,
      firstQuestion,
      secondQuestion,
      customQuestion,
      createdAt: serverTimestamp(),
    });

    const tourRequestId = tourRequestRef.id;

    // const timestamp = Timestamp.now();

    await updateDoc(ownerRef, {
      receivedTourRequests: {
        tourRequestId,
        // propertyId,
        // userId,
        // name,
        // email,
        // phone,
        // message,
        // firstQuestion,
        // secondQuestion,
        // customQuestion,
        // createdAt: timestamp,
      },
    });

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      sentTourRequests: {
        tourRequestId,
        // propertyId,
        // ownerId,
        // message,
        // firstQuestion,
        // secondQuestion,
        // customQuestion,
        // createdAt: timestamp,
      },
    });

    const ownerEmail = ownerData.email;

    if (!sendGridFromEmail) {
      throw new Error('SendGrid "from" email is missing');
    }

    const msg = {
      to: ownerEmail,
      from: sendGridFromEmail,
      subject: 'New Tour Request Received',
      text: `You have received a new tour request for your property.`,
      html: `
        <h3>New Tour Request</h3>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
        <p><strong>First Question:</strong> ${firstQuestion || 'N/A'}</p>
        <p><strong>Second Question:</strong> ${secondQuestion || 'N/A'}</p>
        <p><strong>Custom Question:</strong> ${customQuestion || 'N/A'}</p>
        <p><strong>Property:</strong> <a href="https://rentoutslk.vercel.app/${propertyId}">https://rentoutslk.vercel.app/${propertyId}</a> </p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      {
        message:
          'Tour request sent successfully, and email notification sent to owner.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending tour request:', error);
    return NextResponse.json(
      { message: 'Failed to send tour request' },
      { status: 500 },
    );
  }
}
