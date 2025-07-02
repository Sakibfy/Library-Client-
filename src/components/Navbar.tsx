import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            📚 LibraryApp
          </Link>

          <div className="hidden md:flex space-x-4">
            <NavLink to="/books" className={linkClass}>
              All Books
            </NavLink>
            <NavLink to="/create-book" className={linkClass}>
              Add Book
            </NavLink>
            <NavLink to="/borrow-summary" className={linkClass}>
              Borrow Summary
            </NavLink>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <NavLink to="/books" className={linkClass} onClick={() => setIsOpen(false)}>
            All Books
          </NavLink>
          <NavLink to="/create-book" className={linkClass} onClick={() => setIsOpen(false)}>
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={linkClass} onClick={() => setIsOpen(false)}>
            Borrow Summary
          </NavLink>
        </div>
      )}
    </nav>
  );
}
