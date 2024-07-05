import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const Profile: React.FC = async () => {
  const session = await auth();
  if (!session) {
    redirect('/');
  }
  const user = session.user;
  return (
    <div>
      <h1>Profile</h1>
      <p>User Name: {user?.name}</p>
      <p>User Email: {user?.email}</p>
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
    </div>
  );
};

export default Profile;
