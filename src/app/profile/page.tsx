import React from 'react';
import {
  ProfileCard,
  InAuthed,
  Header,
  RouterProfile,
  Footer,
} from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';
import { auth } from '@/auth';
import { CustomSession } from '@/interface/session';
import PageTitle from '@/components/nav/pageTitle';

const fetchUserData = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/get-user?id=${userId}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return await response.json();
};

const ProfilePage = async () => {
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

  const userData = await fetchUserData(session.user.id);

  return (
    <>
      <Header />
      <PageTitle title="rentoutslk | Profile" />
      <RouterProfile isAdmin={session.user.admin} />
      <section
        style={{
          backgroundColor: '#F7F7F7',
          width: '100%',
          minHeight: '68vh',
          zIndex: 20,
        }}
      >
        {userData ? (
          <ProfileCard user={userData} userId={session.user.id} />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <BeatLoader color="#DE225C" />
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default ProfilePage;
