import React from 'react';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  children: React.ReactNode;
}

const AuthRoute = (props: Props) => {

  const Auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    checkAuth();
    return () => checkAuth();
  }, [Auth]);

  // check if user is logged in
  const checkAuth = onAuthStateChanged(Auth, (user) => {
    if (user) {
      // if user logged in, set loading to false and navigate to home page
      setLoading(false);
      console.log('User is logged in');
      toast(
        <span className='align-middle'>
          <FontAwesomeIcon icon={['fas', 'triangle-exclamation']} className='text-orange-400 pr-2'/>
          已經登入了喔！
        </span>, {
        position: "top-right"
      });
      navigate('/setting');
    } else {
      // if user not logged in, set loading to false and navigate to login page
      console.log('User is not logged in');
      // navigate('/login');
    }
  });

  // if (loading) {
  //     return (
  //         <div>Redirect...</div>
  //     )
  // }
  return (
    <>
      {props.children}
    </>
  )
}

export default AuthRoute;