import React from 'react';
import { auth } from '@/auth';
import { Header, RouterProfile, Footer, InAuthed } from '@/components';
import { CustomSession } from '@/interface/session';
import SentTourRequestSection from '@/components/profile/receivedTourRequest/SentTourRequestSection';

export async function generateMetadata() {
  return {
    title: 'rentoutslk | Sent tour requests',
    description: 'View and manage all your tour requests on rentoutslk.',
    openGraph: {
      title: 'rentoutslk | Sent tour requests',
      description: 'View and manage all your tour requests on rentoutslk.',
      url: 'https://rentoutslk.vercel.app/profile/sent-tour-request',
      siteName: 'RentoutSLK',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'rentoutslk | Sent tour requests',
      description: 'View and manage all your tour requests on rentoutslk.',
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

const TourRequest: React.FC = async () => {
  const session = (await auth()) as CustomSession | null;

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

  if (!session.user.idToken) {
    return;
  }

  try {
    const userData = await fetchUserData(session.user.id, session.user.idToken);

    return (
      <>
        <Header />
        <RouterProfile isAdmin={userData.admin} />
        <section
          style={{
            backgroundColor: '#F7F7F7',
            width: '100%',
            minHeight: '70vh',
            zIndex: 20,
          }}
        >
          <SentTourRequestSection
            _userData={userData}
            idToken={session.user.idToken}
          />
        </section>
        <Footer />
      </>
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

export default TourRequest;
