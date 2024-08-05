'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ProfileCard, InAuthed } from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';

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

  if (!session || !session.user || !session.user.id) {
    return (
      <>
        <Header />
        <RouterProfile />
        <InAuthed />
        <Footer />
      </>
    );
  }

  const userData = await fetchUserData(session.user.id);

  return (
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
  );
};

export default ProfilePage;
