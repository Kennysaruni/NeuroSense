import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Activity as ActivityIcon, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/Neurosciencelogo.svg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            {/* Absolute positioning trick to keep the logo massive without breaking navbar layout bounds */}
            <Link to="/" className="relative flex items-center h-full w-48 -ml-6 z-10">
              <img
                src={logo}
                alt="NeuroSense Africa"
                className="absolute top-1/2 left-0 -translate-y-1/2 h-64 w-64 max-w-none origin-left"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all ${
                isActive('/')
                  ? 'text-brand-blue bg-blue-50/70'
                  : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/library"
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all ${
                isActive('/library')
                  ? 'text-brand-blue bg-blue-50/70'
                  : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
              }`}
            >
              Library
            </Link>
            <Link
              to="/activity"
              className={`px-4 py-2 rounded-xl text-base font-bold transition-all ${
                isActive('/activity')
                  ? 'text-brand-blue bg-blue-50/70'
                  : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
              }`}
            >
              Practice Hub
            </Link>
            <a
              href="#get-started"
              className="bg-brand-blue text-white px-7 py-3 rounded-2xl font-black shadow-[0_4px_14px_0_rgba(26,93,173,0.39)] hover:shadow-[0_6px_20px_rgba(26,93,173,0.23)] hover:bg-blue-800 hover:-translate-y-0.5 border-b-[4px] border-blue-900 active:border-b-0 active:translate-y-[4px] transition-all"
            >
              Get Started! 🚀
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden z-20">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-brand-blue transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl">
          <div className="px-4 pt-3 pb-5 space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                isActive('/')
                  ? 'text-brand-blue bg-blue-50'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <HomeIcon className="w-5 h-5 text-brand-blue" />
              <span>Home</span>
            </Link>
            <Link
              to="/library"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                isActive('/library')
                  ? 'text-brand-blue bg-blue-50'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5 text-brand-teal" />
              <span>Library</span>
            </Link>
            <Link
              to="/activity"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                isActive('/activity')
                  ? 'text-brand-blue bg-blue-50'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <ActivityIcon className="w-5 h-5 text-brand-green" />
              <span>Practice Hub</span>
            </Link>
            <div className="pt-2">
              <a
                href="#get-started"
                className="w-full flex items-center justify-center bg-brand-blue text-white py-3.5 rounded-2xl font-black shadow-md hover:bg-blue-800 transition-colors border-b-[4px] border-blue-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started! 🚀
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
