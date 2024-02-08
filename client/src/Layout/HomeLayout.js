import React, { useState, useEffect } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';

function HomeLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const isLoggedIn = useSelector((store) => store?.authSlice?.isLoggedIn);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      setIsDarkMode(mediaQuery.matches);
    });
  }, []);

  function hideDrawer() {
    const element = document.getElementsByClassName('drawer-toggle');
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width = '0';
  }

  const handleLogout = async (e) => {
    // e.preventDefault();
    // const res = await dispatch(logout());
    // if (res.payload && res.payload.status) {
    //   navigate('/');
    // } else {
    //   console.error('Logout failed or status is false');
    // }
  };

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} className={`min-h-[90vh] `}>
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu size={'32px'} className="font-bold text-white m-4" />
          </label>
        </div>
        <div className="drawer-side w-auto">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li className="text-xl mb-2">Home</li>
            <li className="text-xl mb-2">About Us</li>
            <li className="text-xl mb-2">Adopt</li>
            <li className="text-xl mg-2">Volunteer</li>
            <li className="text-xl mb-2">Donate</li>

            {isLoggedIn && (
              <li className="text-xl mb-2">
                <Link to="/ticket">Tickets</Link>
              </li>
            )}

            {!isLoggedIn && (
              <div className="w-full flex items-center justify-center">
                <button className="btn-primary bg-pink-800 px-4 py-1 font-semibold rounded-md">
                  <Link to="/login">Login</Link>
                </button>
                <button className="btn-secondary bg-purple-800 px-4 py-1 font-semibold rounded-md">
                  <Link to="/signup">Signup</Link>
                </button>
              </div>
            )}

            {isLoggedIn && (
              <div className="w-full flex items-center justify-center">
                <button className="btn-primary w-full bg-pink-800 px-4 py-1 font-semibold rounded-md">
                  <Link to="/user/profile">Profile</Link>
                </button>

                <button className="btn-secondary w-full bg-purple-800 px-4 py-1 font-semibold rounded-md">
                  <Link>Logout</Link>
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
