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
import PageTitle from '@/components/nav/pageTitle';
import FavouriteListings from '@/components/profile/favoutiteListings/favouriteListings';

const FavouritePage = async () => {
  const session = (await auth()) as CustomSession;

  if (!session || !session.user || Date.now() >= session.user.exp * 1000) {
    return (
      <>
        <SearchProvider>
          <Header />
          <PageTitle title="rentoutslk | Favourite" />
          <RouterProfile isAdmin={false} />
          <InAuthed />
          <LookingForProperty />
          <Footer />
        </SearchProvider>
      </>
    );
  }

  return (
    <>
      <SearchProvider>
        <Header />
        <PageTitle title="rentoutslk | Favourite" />
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
    </>
  );
};

export default FavouritePage;
