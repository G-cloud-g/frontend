import React from 'react';
import Header from '../../components/Header';
import '../../node_modules/react-perfect-scrollbar/dist/css/styles.css';

import Userprofilesection from '../../components/editeProfile/profile';
const Profile = () => {
  return (
    <>
      <Header />
      <Userprofilesection />
    </>
  );
};

export default Profile;
