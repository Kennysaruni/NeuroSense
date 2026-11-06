import { Link } from 'react-router-dom';
import logoWhite from '../assets/Neurosciencewhitelogo.svg';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img
                src={logoWhite}
                alt="NeuroSense Africa"
                className="h-12 w-auto max-h-14 object-contain"
              />
            </div>
            <p className="text-base text-slate-400 max-w-md font-medium leading-relaxed">
              Empowering children with neurodevelopmental differences across Africa.
              Providing structured guides, classroom strategies, and interactive tools.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/library" className="text-slate-400 hover:text-white font-medium transition-colors">
                  Educational Library
                </Link>
              </li>
              <li>
                <Link to="/activity" className="text-slate-400 hover:text-white font-medium transition-colors">
                  Practice Hub (Speech &amp; Focus)
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@neurosenseafrica.com" className="text-slate-400 hover:text-white font-medium transition-colors">
                  hello@neurosenseafrica.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} NeuroSense Africa. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 font-medium">
            A Digital Health Initiative by{' '}
            <a
              href="https://macklemoresolutions.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white underline transition-colors"
            >
              Macklemore Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
