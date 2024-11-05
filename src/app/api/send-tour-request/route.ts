import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  arrayUnion,
} from 'firebase/firestore';
import sgMail from '@sendgrid/mail';

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const sendGridFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sendGridUserTemplateId = 'd-93cb17b1b3124c708fb055b5d068e357';
const sendGridOwnerTemplateId = 'd-e0c851e1801d4fa1a3e2a3a15c1b2681';

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
      firstAnswer,
      secondAnswer,
      customAnswer,
      title,
      city,
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

    const tourRequestData = {
      propertyId,
      ownerId,
      userId,
      name,
      email,
      phone,
      message,
      firstAnswer,
      secondAnswer,
      customAnswer,
      createdAt: serverTimestamp(),
      status: 'pending',
      title,
      city,
      ...(firstQuestion && { firstQuestion }),
      ...(secondQuestion && { secondQuestion }),
      ...(customQuestion && { customQuestion }),
    };

    const tourRequestRef = await addDoc(
      collection(db, 'tourRequests'),
      tourRequestData,
    );
    const tourRequestId = tourRequestRef.id;

    await updateDoc(ownerRef, {
      receivedTourRequests: arrayUnion(tourRequestId),
    });

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      sentTourRequests: arrayUnion(tourRequestId),
    });

    const ownerEmail = ownerData.email;

    if (!sendGridFromEmail) {
      throw new Error('SendGrid "from" email is missing');
    }

    const ownerMsg = {
      to: ownerEmail,
      from: sendGridFromEmail,
      templateId: sendGridOwnerTemplateId,
      dynamic_template_data: {
        name,
        email,
        phone,
        message,
        firstQuestion,
        firstAnswer,
        secondQuestion,
        secondAnswer,
        customQuestion,
        customAnswer,
        propertyId,
        title,
        city,
      },
    };

    const userMsg = {
      to: email,
      from: sendGridFromEmail,
      templateId: sendGridUserTemplateId,
      dynamic_template_data: {
        name,
        email,
        phone,
        message,
        firstQuestion,
        firstAnswer,
        secondQuestion,
        secondAnswer,
        customQuestion,
        customAnswer,
        propertyId,
        title,
        city,
      },
    };

    await Promise.all([sgMail.send(ownerMsg), sgMail.send(userMsg)]);

    return NextResponse.json(
      {
        message:
          'Tour request sent successfully, and email notifications sent to both owner and requester.',
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
