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

    const msgHtml = `
      <h3>New Tour Request</h3>
      <p><strong>Name:</strong> ${name || 'N/A'}</p>
      <p><strong>Email:</strong> ${email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong> ${message || 'N/A'}</p>
      ${firstQuestion ? `<p><strong>${firstQuestion}:</strong> ${firstAnswer || 'N/A'}</p>` : ''}
      ${secondQuestion ? `<p><strong>${secondQuestion}:</strong> ${secondAnswer || 'N/A'}</p>` : ''}
      ${customQuestion ? `<p><strong>${customQuestion}:</strong> ${customAnswer || 'N/A'}</p>` : ''}
      <p><strong>Property:</strong> <a href="https://rentoutslk.vercel.app/${propertyId}">https://rentoutslk.vercel.app/${propertyId}</a> </p>
    `;

    const ownerMsg = {
      to: ownerEmail,
      from: sendGridFromEmail,
      subject: 'New Tour Request Received',
      text: `You have received a new tour request for your property.`,
      html: msgHtml,
    };

    const userMsg = {
      to: email,
      from: sendGridFromEmail,
      subject: 'Tour Request Sent Successfully',
      text: `Thank you for requesting a tour! Here are the details of your request.`,
      html: `
        <h3>Your Tour Request for ${title} in ${city}</h3>
        <p>Thank you for reaching out! The property owner will review your request and contact you soon.</p>
        ${msgHtml}
      `,
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
