import React from 'react';
import { auth } from '@/auth';
import { CustomSession } from '@/interface/session';
import {
  Header,
  RouterProfile,
  Footer,
  InAuthed,
  CheckListings,
} from '@/components';
import { PropertyProps } from '@/interface/property';

const CheckListingsPage = async () => {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user || Date.now() >= session.user.exp * 1000) {
    return (
      <>
        <Header />
        <RouterProfile isAdmin={false} />
        <InAuthed />
        <Footer />
      </>
    );
  }
  console.log(session);
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/check-listings`,
    {
      headers: {
        Authorization: `Bearer ${session.user.idToken}`,
      },
    },
  );

  if (!response.ok) {
    console.error('Failed to fetch listings');
    return (
      <>
        <Header />
        <RouterProfile isAdmin={false} />
        <p>Failed to fetch listings.</p>
        <Footer />
      </>
    );
  }

  const data = await response.json();
  const listings: PropertyProps[] = data.listings;

  return (
    <>
      <Header />
      <RouterProfile isAdmin={session.user.admin} />
      <div
        style={{
          backgroundColor: '#F7F7F7',
          width: '100%',
          minHeight: '70vh',
          zIndex: 20,
        }}
      >
        <CheckListings listings={listings} idToken={session.user.idToken} />
      </div>
      <Footer />
    </>
  );
};

export default CheckListingsPage;
