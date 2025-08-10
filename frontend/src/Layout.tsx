import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';
import type { CVData } from './types/CVData';

interface LayoutProps {
  children: React.ReactNode;
  language: string;
  setLanguage: (lang: string) => void;
  data: CVData | null;
}

const Layout: React.FC<LayoutProps> = ({ children, language, setLanguage, data }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <h1 className="text-2xl font-bold text-navy-600">
                {language === 'es' ? 'Portafolio Web' : 'Portfolio Web'}
              </h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      to="/"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === '/'
                          ? 'bg-navy-100 text-navy-800'
                          : 'text-navy-600 hover:bg-navy-50'
                      }`}
                    >
                      {language === 'es' ? 'Perfil' : 'Profile'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/projects"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === '/projects'
                          ? 'bg-navy-100 text-navy-800'
                          : 'text-navy-600 hover:bg-navy-50'
                      }`}
                    >
                      {language === 'es' ? 'Proyectos' : 'Projects'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname.startsWith('/blog')
                          ? 'bg-navy-100 text-navy-800'
                          : 'text-navy-600 hover:bg-navy-50'
                      }`}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === '/contact'
                          ? 'bg-navy-100 text-navy-800'
                          : 'text-navy-600 hover:bg-navy-50'
                      }`}
                    >
                      {language === 'es' ? 'Contacto' : 'Contact'}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex space-x-4">
                <a
                  href={data?.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-navy-800"
                  title="GitHub"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href={data?.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-[#0077b5]"
                  title="LinkedIn"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href={data?.contact.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-[#F36C21]"
                  title="Credly"
                >
                  <SiCredly size={24} />
                </a>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
                    language === 'es' ? 'bg-navy-800' : 'bg-navy-600 hover:bg-navy-700'
                  }`}
                  style={{ minWidth: '100px' }}
                >
                  Español
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
                    language === 'en' ? 'bg-navy-800' : 'bg-navy-600 hover:bg-navy-700'
                  }`}
                  style={{ minWidth: '100px' }}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-navy-600">
            © {new Date().getFullYear()} José Reimondez
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
