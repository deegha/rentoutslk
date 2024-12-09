import React from 'react';
import { auth } from '@/auth';
import { CustomSession } from '@/interface/session';
import {
  Header,
  RouterProfile,
  Footer,
  InAuthed,
  LookingForProperty,
} from '@/components';
import { SearchProvider } from '@/context/searchProvider/searchProvider';
import FavouriteListings from '@/components/profile/favoutiteListings/favouriteListings';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | Favourite Listings',
    description: 'View your favourite properties on rentoutslk.',
    openGraph: {
      title: 'rentoutslk | Favourite Listings',
      description: 'View your favourite properties on rentoutslk.',
      url: 'https://rentoutslk.vercel.app/profile/favourite',
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'rentoutslk | Favourite Listings',
      description: 'View your favourite properties on rentoutslk.',
    },
  };
}

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

const FavouritePage = async () => {
  const session = (await auth()) as CustomSession;

  if (
    !session ||
    !session.user ||
    !session.user.exp ||
    Date.now() >= session.user.exp * 1000
  ) {
    return (
      <SearchProvider>
        <Header />
        <RouterProfile isAdmin={false} />
        <InAuthed />
        <LookingForProperty />
        <Footer />
      </SearchProvider>
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
    const userData = await fetchUserData(
      session.user.id,
      session.user.idToken ?? '',
    );

    return (
      <SearchProvider>
        <Header />
        <RouterProfile isAdmin={userData.admin || false} />
        <div
          style={{
            backgroundColor: '#F7F7F7',
            width: '100%',
            minHeight: '70vh',
            zIndex: 20,
          }}
        >
          <FavouriteListings idToken={session.user.idToken} />
        </div>
        <LookingForProperty />
        <Footer />
      </SearchProvider>
    );
  } catch (error) {
    return (
      <>
        <Header />
        <RouterProfile isAdmin={false} />
        <InAuthed />
        <Footer />
      </>
    );
  }
};

export default FavouritePage;
