import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'Customhooks/Authprovider';

// only loggedin user can aceess
function OnlyLogedinuser({ children }) {
  // 🧞‍♀️
  const getState= localStorage.getItem('isAuthenticated');

  if (!getState) {
    return <Navigate to="/redirecttoauth" replace />;
  };

  return children;
};

export default React.memo(OnlyLogedinuser);