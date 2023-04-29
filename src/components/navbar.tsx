import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// bg
import BackgroundImage from '../assets/bg.jpg';
import { Link } from 'react-router-dom';

// google
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode'));

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
        <button onClick={ () => signOut(auth)}>
          <FontAwesomeIcon icon={['fas', 'right-from-bracket']} className='pl-1 text-cyan-500' />
        </button>
      )
    } else {
      // if user not logged in, navigate to login page
      return (
        <Link to='/login' type="button" >
          <FontAwesomeIcon icon={['fas', 'right-to-bracket']} className='pl-1 text-cyan-500' />
        </Link>
      )
    }
  }


  return (
    <nav className="">
      <div className=" flex flex-wrap items-center justify-between mx-auto">
        <div></div>
        <div className="block w-auto pt-2 pr-2" id="navbar-multi-level">
          <ul className="flex font-medium p-0 flex-row space-x-8 mt-0">
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
            <li>
               <LoginPage />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;