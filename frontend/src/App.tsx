import { useState, useEffect, Suspense, lazy } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';

// Lazy load components
const Profile = lazy(() => import('./Profile'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));

interface CVData {
  name: string;
  title: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    credly: string;
    portfolio: string;
    location: string;
  };
  profile: string;
  skills: Record<string, string>;
  experience: {
    role: string;
    company: string;
    location: string;
    date: string;
    description: string[];
  }[];
  education: {
    title: string;
    institution: string;
    location: string;
    date: string;
  }[];
  languages: {
    language: string;
    level: string;
  }[];
  certifications: string[];
}

function App() {
  const [language, setLanguage] = useState('es');
  const [data, setData] = useState<CVData | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetch(`https://josereimondez-portfolio-backend.onrender.com/api/${language}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [language]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-navy-50 to-navy-100">
        <div className="w-24 h-24 mb-8 relative">
          <div className="absolute inset-0 border-4 border-navy-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-navy-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <div className="text-2xl font-semibold text-navy-800">
          Cargando tu portfolio...
        </div>
        <div className="mt-4 text-navy-600 animate-pulse">
          Por favor, espera un momento
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header with glass effect */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Language Selector */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setLanguage('es')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === 'es' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                ES
              </button>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['profile', 'projects', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {language === 'es'
                    ? tab === 'profile'
                      ? 'Perfil'
                      : tab === 'projects'
                      ? 'Proyectos'
                      : 'Contacto'
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { href: data.contact.linkedin, Icon: FaLinkedin, hoverColor: 'hover:text-blue-600' },
                { href: data.contact.github, Icon: FaGithub, hoverColor: 'hover:text-gray-900' },
                { href: data.contact.credly, Icon: SiCredly, hoverColor: 'hover:text-blue-500' }
              ].map(({ href, Icon, hoverColor }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 ${hoverColor} transition-all duration-300 transform hover:scale-110`}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden sticky top-16 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-4 py-3">
        <div className="flex justify-between space-x-2">
          {['profile', 'projects', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {language === 'es'
                ? tab === 'profile'
                  ? 'Perfil'
                  : tab === 'projects'
                  ? 'Proyectos'
                  : 'Contacto'
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-32 w-32 bg-blue-200 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-blue-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-blue-200 rounded"></div>
              </div>
            </div>
          }
        >
          {activeTab === 'profile' && <Profile data={data} language={language} />}
          {activeTab === 'projects' && <Projects language={language} />}
          {activeTab === 'contact' && <Contact language={language} />}
        </Suspense>
      </main>
    </div>
  );
}

export default App;