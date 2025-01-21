import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import api from '..api'; // Assuming you have an axios instance configured
import { Switch } from "@material-tailwind/react";


const Navigationpage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const dropdownRef = useRef(null); // Ref for dropdown menu

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Fetch user's profile data on component mount
  useEffect(() => {
    api
      .get('https://blogapi-qm9m.onrender.com/api/profile/') // Adjust the endpoint if necessary
      .then((response) => {
        if (response.data.length > 0) {
          const profileData = response.data[0]; // Assuming a single profile per user
          setProfilePicture(profileData.profile_pic);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
  }, []);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-3">
          <img src="/logo-r.png" className="h-8" alt="Logo" />
          <span className="text-2xl font-semibold text-gray-800 dark:text-white">Nexus trends</span>
        </a>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500">
            Home
          </a>
          <a href="#" className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500">
            About
          </a>
          <a href="#" className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500">
            Services
          </a>
          <a href="#" className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-500">
            Contact
          </a>
          <Switch
          id="dark-mode-toggle"
          color="blue"
          defaultChecked={false} // Optional: Initial state
          className='transition-colors duration-200 ease-in-out bg-gray-300 checked:bg-blue-500'
          onChange={() => {
          document.documentElement.classList.toggle("dark");
          }}
          />

        </div>

        <div ref={dropdownRef} className="relative">
          {/* Profile Image and Dropdown Button */}
          <img
            alt="profile"
            src={profilePicture ? profilePicture : "https://via.placeholder.com/150?text=No+Image"}
            className="h-10 w-10 rounded-full cursor-pointer object-cover"
            onClick={toggleDropdown} // Toggle dropdown menu on click
          />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <NavLink to="/profileview" className="block w-full text-left dark:text-white">My Profile</NavLink>
              </li>
              <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <NavLink to="/editprofile" className="block w-full text-left dark:text-white">Edit Profile</NavLink>
              </li>
              <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <NavLink to="/mypostlist" className="block w-full text-left dark:text-white">My Posts</NavLink>
              </li>
              <hr className="border-gray-200 dark:border-gray-700" />
              <li className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                <NavLink to="/logout" className="block w-full text-left dark:text-white">Sign Out</NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigationpage;
