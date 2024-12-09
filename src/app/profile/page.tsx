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

export async function generateMetadata() {
  const session = (await auth()) as CustomSession;

  if (
    !session ||
    !session.user ||
    !session.user.exp ||
    Date.now() >= session.user.exp * 1000 ||
    !session.user.id ||
    !session.user.idToken
  ) {
    return {
      title: 'rentoutslk | Profile',
      description: 'Your profile on rentoutslk.',
      openGraph: {
        title: 'rentoutslk | Profile',
        description: 'Your profile on rentoutslk.',
        url: 'https://rentoutslk.vercel.app/profile',
        siteName: 'RentoutSLK',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'rentoutslk | Profile',
        description: 'Your profile on rentoutslk.',
      },
    };
  }

  try {
    const userData = await fetchUserData(
      session.user.id,
      session.user.idToken ?? '',
    );

    return {
      title: `rentoutslk | ${userData.name || 'User'}'s Profile`,
      description: `${userData.name || 'User'}'s profile on rentoutslk. View listings, requests, and manage your account.`,
      openGraph: {
        title: `rentoutslk | ${userData.name || 'User'}'s Profile`,
        description: `Explore ${userData.name || 'User'}'s profile on rentoutslk.`,
        url: 'https://rentoutslk.vercel.app/profile',
        siteName: 'RentoutSLK',
      },
      twitter: {
        card: 'summary_large_image',
        title: `rentoutslk | ${userData.name || 'User'}'s Profile`,
        description: `Explore ${userData.name || 'User'}'s profile on rentoutslk.`,
      },
    };
  } catch (error) {
    console.error('Error fetching user data for metadata:', error);

    return {
      title: 'rentoutslk | Profile',
      description: 'Your profile on rentoutslk.',
      openGraph: {
        title: 'rentoutslk | Profile',
        description: 'Your profile on rentoutslk.',
        url: 'https://rentoutslk.vercel.app/profile',
        siteName: 'RentoutSLK',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'rentoutslk | Profile',
        description: 'Your profile on rentoutslk.',
      },
    };
  }
}

const ProfilePage = async () => {
  const session = (await auth()) as CustomSession;

  if (
    !session ||
    !session.user ||
    !session.user.exp ||
    Date.now() >= session.user.exp * 1000
  ) {
    return (
      <>
        <SearchProvider>
          <Header />

          <RouterProfile isAdmin={false} />
          <InAuthed />
          <LookingForProperty />
          <Footer />
        </SearchProvider>
      </>
    );
  }

  if (!session.user.id || !session.user.idToken) {
    console.error('User ID or ID Token is undefined.');
    return (
      <div>
        <p>Error: Unable to authenticate user.</p>
      </div>
    );
  }

  try {
    const userData = await fetchUserData(session.user.id, session.user.idToken);

    return (
      <>
        <SearchProvider>
          <Header />

          <RouterProfile isAdmin={userData.admin} />
          <section
            style={{
              backgroundColor: '#F7F7F7',
              width: '100%',
              minHeight: '68vh',
              zIndex: 20,
            }}
          >
            {userData ? (
              <ProfileCard user={userData} userId={session.user.id || ''} />
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
