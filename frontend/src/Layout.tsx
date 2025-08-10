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

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo y título */}
            <h1 className="text-2xl font-bold text-navy-600">
              {language === 'es' ? 'Portafolio Web' : 'Portfolio Web'}
            </h1>

            {/* Navegación para pantallas grandes */}
            <nav className="hidden md:block">
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

            {/* Botones de idioma para pantallas grandes */}
            <div className="hidden md:flex space-x-2">
              <button
                onClick={() => setLanguage('es')}
                className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
                  language === 'es' ? 'bg-navy-800' : 'bg-navy-600 hover:bg-navy-700'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
                  language === 'en' ? 'bg-navy-800' : 'bg-navy-600 hover:bg-navy-700'
                }`}
              >
                English
              </button>
            </div>

            {/* Botón de menú para móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-navy-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-2 border-t border-gray-200">
              <nav className="space-y-2">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:bg-navy-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'es' ? 'Perfil' : 'Profile'}
                </Link>
                <Link
                  to="/projects"
                  className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:bg-navy-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'es' ? 'Proyectos' : 'Projects'}
                </Link>
                <Link
                  to="/blog"
                  className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:bg-navy-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-navy-600 hover:bg-navy-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'es' ? 'Contacto' : 'Contact'}
                </Link>

                {/* Botones de idioma en móvil */}
                <div className="flex space-x-2 mt-4 px-3">
                  <button
                    onClick={() => {
                      setLanguage('es');
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded text-white text-sm font-medium transition-all duration-300 ${
                      language === 'es' ? 'bg-navy-800' : 'bg-navy-600'
                    }`}
                  >
                    ESP
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded text-white text-sm font-medium transition-all duration-300 ${
                      language === 'en' ? 'bg-navy-800' : 'bg-navy-600'
                    }`}
                  >
                    ENG
                  </button>
                </div>
              </nav>

              {/* Iconos de redes sociales centrados en móvil */}
              <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
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
            </div>
          )}

          {/* Iconos de redes sociales para pantallas grandes */}
          <div className="hidden md:flex justify-center mt-4">
            <div className="flex space-x-6">
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
