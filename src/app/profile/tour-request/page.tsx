import React from 'react';
// import { redirect } from 'next/navigation';
import { auth } from '@/auth';
// import { InAuthed } from '@/components';
import { Header, RouterProfile, Footer, InAuthed } from '@/components';
import { CustomSession } from '@/interface/session';

const TourRequest: React.FC = async () => {
  const session = (await auth()) as CustomSession | null;

  if (!session) {
    return (
      <>
        <Header />
        <RouterProfile isAdmin={false} />
        <InAuthed />
        <Footer />
      </>
    );
  }

  const isAdmin = session.user?.admin || false;

  return (
    <>
      <Header />
      <RouterProfile isAdmin={isAdmin} />
      <div>
        <section>
          <h1>Profile</h1>
          <div>
            <label>
              Name:
              <input type="text" />
            </label>
          </div>
          <div>
            <label>Phone Number:</label>
          </div>
          <div>
            <label>City:</label>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TourRequest;
