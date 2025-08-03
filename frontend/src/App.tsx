import { useState, useEffect, Suspense, lazy } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';
import type { CVData } from './types/CVData';

// Lazy load components
const Profile = lazy(() => import('./Profile'));
const Projects = lazy(() => import('./Projects'));
const Blog = lazy(() => import('./Blog'));
const Contact = lazy(() => import('./Contact'));

function App() {
  const [language, setLanguage] = useState('es');
  const [data, setData] = useState<CVData | null>(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://josereimondez-portfolio-backend.onrender.com/api/${language}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Si hay un error, podemos establecer un estado de datos mínimo para que la app no se quede cargando
        setData({
          name: "José Reimondez",
          title: language === 'es' ? "Desarrollador Full Stack" : "Full Stack Developer",
          contact: {
            phone: "",
            email: "",
            linkedin: "https://www.linkedin.com/",
            github: "https://github.com/",
            credly: "",
            portfolio: "",
            location: ""
          },
          profile: "",
          skills: {},
          experience: [],
          education: [],
          languages: [],
          certifications: []
        });
      }
    };

    fetchData();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-navy-50">
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
                    ? 'bg-navy-800 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-navy-50'
                }`}
              >
                ES
              </button>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-navy-800 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-navy-50'
                }`}
              >
                EN
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['profile', 'projects', 'blog', 'contact'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-navy-800 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  {language === 'es'
                    ? tab === 'profile'
                      ? 'Perfil'
                      : tab === 'projects'
                      ? 'Proyectos'
                      : tab === 'blog'
                      ? 'Blog'
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
          {['profile', 'projects', 'blog', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-navy-800 text-white shadow-lg'
                  : 'text-gray-600 hover:text-navy-700 hover:bg-navy-50'
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
                <div className="h-32 w-32 bg-navy-200 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-navy-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-navy-200 rounded"></div>
              </div>
            </div>
          }
        >
          {activeTab === 'profile' && data && <Profile data={data} language={language} />}
          {activeTab === 'projects' && <Projects language={language} />}
          {activeTab === 'blog' && <Blog language={language} />}
          {activeTab === 'contact' && <Contact language={language} />}
        </Suspense>
      </main>
    </div>
  );
}

export default App;