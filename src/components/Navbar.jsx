import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">

        <a href="/" className="flex items-center gap-3">
          <img
            src="/src/assets/suitcase.png"
            alt="Job Logo"
            className="h-10 w-10 object-contain invert"
          />
          <div className="text-2xl font-bold">
            Job Application Manager
          </div>
        </a>


        {/* Subtitle */}
        <div className="text-sm sm:text-base font-medium text-gray-300 mt-2 sm:mt-0">
          Track your career journey
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
