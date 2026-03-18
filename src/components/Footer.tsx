import { Link } from 'react-router-dom';
import logoWhite from '../assets/Neurosciencewhitelogo.svg';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="relative h-16 w-full mb-6 z-10">
              <img 
                src={logoWhite} 
                alt="NeuroSense Africa" 
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 h-64 w-64 max-w-none" 
              />
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Supporting children with neurodevelopmental differences across Africa.
              Providing resources for schools, caregivers, and children.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/library" className="text-sm hover:text-white transition-colors">Library</Link></li>
              <li><Link to="/activity" className="text-sm hover:text-white transition-colors">Speech Practice</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:hello@neurosenseafrica.com" className="text-sm hover:text-white transition-colors">hello@neurosenseafrica.com</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} NeuroSense Africa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
