import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Evrine Minayo. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://github.com/Eve-rine" className="text-gray-400 hover:text-white">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/evrine-minayo-175a501a0" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;