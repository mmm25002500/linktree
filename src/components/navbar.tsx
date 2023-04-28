import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// bg
import BackgroundImage from '../assets/bg.jpg';

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

  return (
    <nav className="">
      <div className=" flex flex-wrap items-center justify-between mx-auto">
        <div></div>
        <div className="block w-auto pt-2 pr-2" id="navbar-multi-level">
          <ul className="flex font-medium p-0 flex-row space-x-8 mt-0">
            <li className=''>
              <button onClick={() => setDarkMode('white')} type="button">
                <FontAwesomeIcon icon={['fas', 'sun']} className='pl-1 text-cyan-500' />
              </button>
            </li>
              
            <li>
              <button onClick={() => setDarkMode('bg')} type="button" >
                <FontAwesomeIcon icon={['fas', 'mountain-sun']} className='pl-1 text-cyan-500' />
              </button>
            </li>
            <li>
              <button onClick={() => setDarkMode('dark')} type="button" >
                <FontAwesomeIcon icon={['fas', 'moon']} className='pl-1 text-cyan-500' />
              </button>
            </li>
            {/* <li>
              <button onClick={() => console.log('登入')} type="button" >
                <FontAwesomeIcon icon={['fas', 'right-to-bracket']} className='pl-1 text-cyan-500' />
              </button>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;