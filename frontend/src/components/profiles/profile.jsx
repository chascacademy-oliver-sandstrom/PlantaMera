import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserData } from '../../api/auth';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data); // set the fetched user data to userData
        console.log(data, userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
  
    <div className="profile">
      <h1>Profile</h1>
      {userData && (
        <div>
          {/* <img src={userData.profilePic} alt="" /> */}
          <h2>Name: {userData.userName}</h2>
          <h2>Email: {userData.email}</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
