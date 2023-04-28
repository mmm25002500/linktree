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
      document.documentElement.classList.remove('dark');
      document.getElementsByTagName('body')[0].style.backgroundImage = `url('${BackgroundImage}')`;
      // document.getElementsByTagName('body')[0].classList.add(`bg-[url('${BackgroundImage}')]`);
      document.getElementsByTagName('body')[0].classList.remove('bg-white', 'bg-gray-800');
    }
  }, [darkMode]);

  return (
    <nav className="">
      <div className=" flex flex-wrap items-center justify-between mx-auto">
        <div></div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
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
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;