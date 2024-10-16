import React from 'react';
import {
  ProfileCard,
  InAuthed,
  Header,
  RouterProfile,
  Footer,
  LookingForProperty,
} from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';
import { auth } from '@/auth';
import { CustomSession } from '@/interface/session';
import PageTitle from '@/components/nav/pageTitle';
import { SearchProvider } from '@/context/searchProvider/searchProvider';

const fetchUserData = async (userId: string, idToken: string) => {
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
};

const ProfilePage = async () => {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user || Date.now() >= session.user.exp * 1000) {
    return (
      <>
        <SearchProvider>
          <Header />
          <PageTitle title="rentoutslk | Profile" />
          <RouterProfile isAdmin={false} />
          <InAuthed />
          <LookingForProperty />
          <Footer />
        </SearchProvider>
      </>
    );
  }

  try {
    const userData = await fetchUserData(session.user.id, session.user.idToken);

    return (
      <>
        <SearchProvider>
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
                <BeatLoader color="#DE225C" />
              </div>
            )}
          </section>
          <LookingForProperty />
          <Footer />
        </SearchProvider>
      </>
    );
  } catch {
    return (
      <>
        <SearchProvider>
          <Header />
          <PageTitle title="rentoutslk | Profile" />
          <RouterProfile isAdmin={false} />
          <InAuthed />
          <LookingForProperty />
          <Footer />
        </SearchProvider>
      </>
    );
  }
};

export default ProfilePage;
