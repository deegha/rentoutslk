import React from 'react';
import { auth } from '@/auth';
import { CustomSession } from '@/interface/session';
import { Header, RouterProfile, Footer, InAuthed } from '@/components';
import PageTitle from '@/components/nav/pageTitle';
import CheckListings from '@/components/profile/checkListings';

const fetchUserData = async (userId: string, idToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/get-user?id=${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

const CheckListingsPage = async () => {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user || Date.now() >= session.user.exp * 1000) {
    return (
      <>
        <Header />
        <PageTitle title="rentoutslk | My listings" />
        <RouterProfile isAdmin={false} />
        <InAuthed />
        <Footer />
      </>
    );
  }

  if (!session.user.idToken) {
    return;
  }

  try {
    const userData = await fetchUserData(session.user.id, session.user.idToken);

    return (
      <>
        <Header />
        <PageTitle title="rentoutslk | My listings" />
        <RouterProfile isAdmin={session.user.admin} />
        <div
          style={{
            backgroundColor: '#F7F7F7',
            width: '100%',
            minHeight: '70vh',
            zIndex: 20,
          }}
        >
          <CheckListings _userData={userData} idToken={session.user.idToken} />
        </div>
        <Footer />
      </>
    );
  } catch (error) {
    return (
      <>
        <Header />
        <PageTitle title="rentoutslk | My listings" />
        <RouterProfile isAdmin={false} />
        <InAuthed />
        <Footer />
      </>
    );
  }
};

export default CheckListingsPage;
