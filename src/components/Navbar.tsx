import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <span className="font-bold text-xl text-brand-blue">NeuroSense Africa</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Home</Link>
            <Link to="/library" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Library</Link>
            <Link to="/activity" className="text-slate-600 hover:text-brand-blue font-medium transition-colors">Speech Practice</Link>
            <a href="#early-access" className="bg-brand-blue text-white px-4 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors">
              Early Access
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-500 hover:text-brand-blue focus:outline-none"
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
              to="/library" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-blue hover:bg-slate-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Library
            </Link>
            <Link 
              to="/activity" 
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
