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
import { PropertyProps } from '@/interface/property';
import FavouriteListings from '@/components/profile/favoutiteListings/favouriteListings';
import { SearchProvider } from '@/context/searchProvider/searchProvider';

const FavouritePage = async () => {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user || Date.now() >= session.user.exp * 1000 * 24) {
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

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/favourite-properties/profile`,
    {
      headers: {
        Authorization: `Bearer ${session.user.idToken}`,
      },
    },
  );

  if (!response.ok) {
    return (
      <>
        <SearchProvider>
          <Header />
          <RouterProfile isAdmin={false} />
          <p>Failed to fetch favourite properties.</p>
          <LookingForProperty />
          <Footer />
        </SearchProvider>
      </>
    );
  }

  const data = await response.json();
  const savedProperties: PropertyProps[] = data.savedProperties;

  return (
    <>
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
          <FavouriteListings listings={savedProperties} />
        </div>
        <LookingForProperty />
        <Footer />
      </SearchProvider>
    </>
  );
};

export default FavouritePage;
