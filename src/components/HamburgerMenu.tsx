import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center p-2 text-white focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      <div
        className={`absolute right-0 z-10 w-48 mt-2 bg-gray-800 rounded-md shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {isOpen && (
          <div className="py-2">
            <Link
              to="/"
              className="block px-4 py-2 text-white hover:bg-blue-600 transition duration-200 rounded-md"
            >
              Inicio
            </Link>
            <Link
              to="/results"
              className="block px-4 py-2 text-white hover:bg-blue-600 transition duration-200 rounded-md"
            >
              Resultados
            </Link>
            <Link
              to="/squad"
              className="block px-4 py-2 text-white hover:bg-blue-600 transition duration-200 rounded-md"
            >
              Plantel
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-white hover:bg-blue-600 transition duration-200 rounded-md"
            >
              Sobre Nosotros
            </Link>
            <Link
              to="/honours"
              className="block px-4 py-2 text-white hover:bg-blue-600 transition duration-200 rounded-md"
            >
              Títulos
            </Link>
          </div>
        )}
      </div>

      <div className="hidden md:flex space-x-4">
        <Link to="/" className="text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-200">
          Inicio
        </Link>
        <Link
          to="/results"
          className="text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-200"
        >
          Resultados
        </Link>
        <Link
          to="/squad"
          className="text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-200"
        >
          Plantel
        </Link>
        <Link
          to="/about"
          className="text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-200"
        >
          Sobre Nosotros
        </Link>
      </div>
    </div>
  );
};

export default HamburgerMenu;
