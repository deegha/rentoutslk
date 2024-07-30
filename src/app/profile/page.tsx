'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ProfileCard, InAuthed } from '@/components';
import BeatLoader from 'react-spinners/BeatLoader';

const fetchUserData = async (userId: string) => {
  const response = await fetch(`/api/get-user?id=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return await response.json();
};

const Profile: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (session?.user?.id) {
        try {
          const userId = session.user.id;
          const data = await fetchUserData(userId);
          setUserData(data);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      }
      setLoading(false);
    };
    loadUserData();
  }, [session]);

  if (loading) {
    return (
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
    );
  }

  if (!session || !session.user || !session.user.id) {
    return <InAuthed />;
  }

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

export default Profile;
