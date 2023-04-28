import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (darkMode) {
    localStorage.setItem('darkMode', 'true');
    document.documentElement.classList.add('dark');
    } else {
    localStorage.setItem('darkMode', 'false');
    document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)} type="button" className='absolute right-2 top-2'>
        {
          localStorage.getItem('darkMode') === 'true' ? (
            <FontAwesomeIcon icon={['fas', 'sun']} className='pl-1 text-cyan-500' />
          ) : (
            <FontAwesomeIcon icon={['fas', 'moon']} className='pl-1 text-cyan-500' />
          )
        }
      </button>
    </div>
  )
}

export default Navbar;