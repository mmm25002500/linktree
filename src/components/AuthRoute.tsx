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

    const checkAuth = onAuthStateChanged(Auth, (user) => {
        if (user) {
            setLoading(false);
        } else {
            console.log('User is not logged in');
            navigate('/login');
        }
    });

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>{props.children}</>
    )
}

export default AuthRoute;