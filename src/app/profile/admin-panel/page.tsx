import React from 'react';
import { auth } from '@/auth';
import { CustomSession } from '@/interface/session';
import { Header, RouterProfile, Footer, InAuthed } from '@/components';
import { PropertyProps } from '@/interface/property';
import { AdminPanel } from '@/components/profile/adminPanel/adminPanel';

const AdminPanelPage = async () => {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user) {
    return (
      <>
        <Header />
        <RouterProfile isAdmin={false} />
        <InAuthed />
        <Footer />
      </>
    );
  }

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/check-listings/not-verifed`,
    {
      headers: {
        Authorization: `Bearer ${session.user.idToken}`,
      },
    },
  );

  if (!response.ok) {
    console.error('Failed to fetch unverified listings');
    return <p>Failed to fetch listings.</p>;
  }

  const data = await response.json();
  const listings: PropertyProps[] = data.listings;
  return (
    <>
      <Header />
      <RouterProfile isAdmin={true} />
      <div
        style={{
          backgroundColor: '#F7F7F7',
          width: '100%',
          minHeight: '70vh',
          zIndex: 20,
        }}
      >
        <AdminPanel listings={listings} idToken={session.user.idToken} />
      </div>
      <Footer />
    </>
  );
};

export default AdminPanelPage;
