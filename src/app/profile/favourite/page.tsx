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

const FavouritePage = async () => {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user || Date.now() >= session.user.exp * 1000) {
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

  return (
    <SearchProvider>
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
        <FavouriteListings idToken={session.user.idToken} />
      </div>
      <LookingForProperty />
      <Footer />
    </SearchProvider>
  );
};

export default FavouritePage;
