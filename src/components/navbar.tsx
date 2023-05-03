import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// bg
import BackgroundImage from '../assets/bg.webp';
import { Link } from 'react-router-dom';

import { toast } from 'react-hot-toast';

// google
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'));
  const navigate = useNavigate();
  
  const [auth_uid, setAuthUid] = useState('');
  const [remote_uid, setRemoteUid] = useState('');
  const [remote_id, setRemoteId] = useState('');

  const db = getFirestore();
  const userCollRef = collection(db, "user");

  useEffect(() => {
    // get user id from auth
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUid(user.uid);
        
        const q = query(userCollRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          if (doc.data())
            // setUserExist(true);
            setRemoteUid(doc.data().uid);
            setRemoteId(doc.data().user_id);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (darkMode === 'white') {
      localStorage.setItem('darkMode', 'white');
      document.documentElement.classList.remove('dark');
      document.getElementsByTagName('body')[0].style.backgroundImage = '';
      document.getElementsByTagName('body')[0].classList.remove('bg-gray-800');
      document.getElementsByTagName('body')[0].classList.add('bg-white');
    } else if (darkMode === 'dark') {
      localStorage.setItem('darkMode', 'dark');
      document.documentElement.classList.add('dark');
      document.getElementsByTagName('body')[0].style.backgroundImage = '';
      document.getElementsByTagName('body')[0].classList.remove('bg-white');
      document.getElementsByTagName('body')[0].classList.add('bg-gray-800');
    } else if (darkMode === 'bg') {
      localStorage.setItem('darkMode', 'bg');
      document.documentElement.classList.add('dark');
      document.getElementsByTagName('body')[0].style.backgroundImage = `url('${BackgroundImage}')`;
      document.getElementsByTagName('body')[0].classList.remove('bg-white', 'bg-gray-800');
    }
  }, [darkMode]);

  // google
  const auth = getAuth();

  // navbar login & logout btn
  const LoginPage = () => {

    const [user, setUser] = useState<User | null>(null);;

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);
    
    if (user) {
      // if user logged in, show logout btn
      return (
        <>
          {/* Sign out */}
          <li>
            <button
              onClick={() =>
                signOut(auth)
                  .then(res => {
                    toast.error('登出成功!', {
                      position: "top-right"
                    });
                  })
                  .catch(err => {
                    toast.error('登出失敗!', {
                      position: "top-right"
                    });
                  }
                  )
              }
            >
              <FontAwesomeIcon icon={['fas', 'right-from-bracket']} className='pl-1 text-cyan-500' />
            </button>
          </li>

          {/* Setting */}
          <li>
            <button onClick={ () => navigate('/setting')}>
              <FontAwesomeIcon icon={['fas', 'gear']} className='pl-1 text-cyan-500' />
            </button>
          </li>

          {/* My LinkTree */}
          <li>
            <button onClick={ () => navigate('/me')}>
              <FontAwesomeIcon icon={['fas', 'address-card']} className='pl-1 text-cyan-500' />
            </button>
          </li>
        </>
      )
    } else {
      // if user not logged in, navigate to login page
      return (
        // Sign in
        <li>
          <Link to='/login' type="button" >
            <FontAwesomeIcon icon={['fas', 'right-to-bracket']} className='pl-1 text-cyan-500' />
          </Link>
        </li>
      )
    }
  }


  return (
    <nav className="">
      <div className=" flex flex-wrap items-center justify-between mx-auto">
        <div></div>
        <div className="block w-auto pt-2 pr-2" id="navbar-multi-level">
          <ul className="flex font-medium p-0 flex-row space-x-8 mt-0">
            {/* homepage */}
            <li>
              <button onClick={ () => navigate('/')}>
                <FontAwesomeIcon icon={['fas', 'house']} className='pl-1 text-cyan-500' />
              </button>
            </li>

            {/* search */}
            <li>
              <button onClick={ () => navigate('/search')}>
                <FontAwesomeIcon icon={['fas', 'magnifying-glass']} className='pl-1 text-cyan-500' />
              </button>
            </li>
            
            {/* light mode */}
            <li className=''>
              <button onClick={() => setDarkMode('white')} type="button">
                <FontAwesomeIcon icon={['fas', 'sun']} className='pl-1 text-cyan-500' />
              </button>
            </li>

            {/* dark mode */}
            <li>
              <button onClick={() => setDarkMode('dark')} type="button" >
                <FontAwesomeIcon icon={['fas', 'moon']} className='pl-1 text-cyan-500' />
              </button>
            </li>

            {/* bg mode */}
            <li>
              <button onClick={() => setDarkMode('bg')} type="button" >
                <FontAwesomeIcon icon={['fas', 'mountain-sun']} className='pl-1 text-cyan-500' />
              </button>
            </li>

            {/* login page */}
            <LoginPage />

            {/* setting page */}
            <li>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;