import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/Neurosciencelogo.svg'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            {/* Absolute positioning trick to keep the logo massive without breaking navbar layout bounds */}
            <Link to="/" className="relative flex items-center h-full w-48 -ml-6 z-10">
              <img src={logo} alt="NeuroSense Africa" className="absolute top-1/2 left-0 -translate-y-1/2 h-64 w-64 max-w-none origin-left" />
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 px-3 py-2 rounded-lg font-medium transition-all">Home</Link>
            <Link to="/#" className="text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 px-3 py-2 rounded-lg font-medium transition-all">Library</Link>
            <Link to="/#" className="text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 px-3 py-2 rounded-lg font-medium transition-all">Speech Practice</Link>
            <a href="#early-access" className="bg-brand-blue text-white px-7 py-2.5 rounded-full font-medium shadow-[0_4px_14px_0_rgba(26,93,173,0.39)] hover:shadow-[0_6px_20px_rgba(26,93,173,0.23)] hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-300">
              Early Access
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden z-20">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-brand-blue transition-colors focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/#"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Library
            </Link>
            <Link
              to="/#"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Speech Practice
            </Link>
            <a
              href="#early-access"
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-blue hover:bg-slate-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Early Access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
