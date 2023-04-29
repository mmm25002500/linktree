import React from 'react';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';

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
        } else {
            // if user not logged in, set loading to false and navigate to login page
            console.log('User is not logged in');
            navigate('/login');
        }
    });
    return (
        <>{props.children}</>
    )
}

export default AuthRoute;