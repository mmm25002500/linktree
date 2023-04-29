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
            navigate('/');
        } else {
            // if user not logged in, set loading to false and navigate to login page
            console.log('User is not logged in');
            navigate('/login');
        }
    });

    if (loading) {
        return (
            <div>Redirect...</div>
        )
    }
    return (
        <>{props.children}</>
    )
}

export default AuthRoute;