'use client';
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-[#1F5F8D] text-white font-poppins">
      <div className="flex justify-between items-center p-4 md:px-8">
        {/* Brand */}
        <div className="text-lg font-semibold">Civic Data Lab</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <div className="cursor-pointer hover:text-[#84DCCF]">
            <FiSearch size={20} />
          </div>
          <div className="cursor-pointer hover:text-[#84DCCF]">All Data</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">Sectors</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">Use Cases</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">Publishers</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">About Us</div>
          <button className="bg-[#84DCCF] text-black px-3 py-1 rounded-md">
            Login / Signup
          </button>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {menuOpen && (
        <div className="md:hidden bg-[#1F5F8D] border-t border-[#84DCCF] text-sm font-medium px-6 py-4 space-y-3">
          <div className="flex items-center gap-2 cursor-pointer hover:text-[#84DCCF]">
            <FiSearch size={18} />
            <span>Search</span>
          </div>
          <div className="cursor-pointer hover:text-[#84DCCF]">All Data</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">Sectors</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">Use Cases</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">Publishers</div>
          <div className="cursor-pointer hover:text-[#84DCCF]">About Us</div>
          <button className="bg-[#84DCCF] text-black px-4 py-2 w-full rounded-md mt-2 cursor-pointer">
            Login / Signup
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
