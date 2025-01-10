import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Navbar = ({ user }) => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center text-xl font-bold text-gray-900">
              Evrine Minayo
            </Link>
          </div>

          <div className="flex items-center">
            {isAdmin && (
              <>
                {user ? (
                  <>
                    <Link to="/admin" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                      Dashboard
                    </Link>
                    <button
                      onClick={() => signOut(auth)}
                      className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
