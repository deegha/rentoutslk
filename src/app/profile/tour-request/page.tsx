import React from 'react';
// import { redirect } from 'next/navigation';
// import { auth } from '@/auth';
// import { InAuthed } from '@/components';

const TourRequst: React.FC = async () => {
  // const session = (await auth()) as CustomSession | null;

  //  if (!session) {
  //    return <InAuthed/> ;
  //  }
  // const userId = session.user.id;
  // const userData = await fetchUserData(userId);
  return (
    <>
      <div>
        <section>
          <h1>Profile</h1>
          {/* <p>User Name: {user?.name}</p>
          <p>User Email: {user?.email}</p> */}
          <div>
            <label>
              Name:
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Phone Number:
              {/* <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /> */}
            </label>
          </div>
          <div>
            <label>
              City:
              {/* <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          /> */}
            </label>
          </div>
          {/* <button onClick={handleUpdateProfile}>Update Profile</button>
          <button onClick={handleLogout}>Logout</button> */}
        </section>
      </div>
    </>
  );
};

export default TourRequst;
