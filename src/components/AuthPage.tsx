import React from 'react';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

const AuthRoute = (props: Props) => {

  const Auth = getAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    checkAuth();
    return () => checkAuth();
  }, [Auth]);

  // check if user is logged in
  const checkAuth = onAuthStateChanged(Auth, (user) => {
    if (user) {
      // if user logged in, set loading to false and navigate to home page
      console.log('User is logged in');

      toast.success('檢測成功，已是登入狀態!', {
        position: "top-right"
      });
    } else {
      // if user not logged in, set loading to false and navigate to login page
      console.log('User is not logged in');
      toast(
        <span className='align-middle'>
          <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} className='text-orange-400 pr-2'/>
          請先登入
        </span>, {
        position: "top-right"
      });
      navigate('/login');
    }
  });
  return (
    <>{props.children}</>
  )
}

export default AuthRoute;