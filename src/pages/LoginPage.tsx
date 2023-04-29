import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

// google
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import GoogleLoginImage from "../assets/Oauth/btn_google_signin_dark.png";

const LoginPage = () => {

  // Google Auth
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  // implement login method with popup
  const signInWithGoogle = () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(response => {
        console.log(response.user.uid);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <Card>
        <h1 className="text-center text-3xl">登入 Login</h1>
        <button onClick={() => signInWithGoogle()} disabled={authing} className="flex mx-auto">
          <img src={ GoogleLoginImage } className="w-52" />
        </button>
      </Card>
    </div>
  )
}

export default LoginPage;