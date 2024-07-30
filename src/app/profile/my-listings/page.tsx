import React from 'react';
import { auth } from '@/auth';
import { InAuthed } from '@/components';
import { CustomSession } from '@/interface/session';

const Listinigs: React.FC = async () => {
  const session = (await auth()) as CustomSession | null;
  // const { data: session, status, update } = useSession();

  if (!session) {
    return <InAuthed />;
  }
  // const userId = session.user.id;
  // const userData = await fetchUserData(userId);
  // const user = session.user;
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

export default Listinigs;
