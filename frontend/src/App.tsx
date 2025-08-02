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
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'projects', 'contact'

  useEffect(() => {
    fetch(`https://josereimondez-portfolio-backend.onrender.com/api/${language}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [language]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-8 md:my-12">
        {/* Language and Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <div className="flex space-x-5 mb-3 sm:mb-0">
            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
              <FaLinkedin size={28} />
            </a>
            <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300 transform hover:scale-110">
              <FaGithub size={28} />
            </a>
            <a href={data.contact.credly} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300 transform hover:scale-110">
              <SiCredly size={28} />
            </a>
          </div>
          <div>
            <button onClick={() => setLanguage('es')} className={`px-4 py-2 rounded-full text-sm font-medium ${language === 'es' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition-all duration-300`}>ES</button>
            <button onClick={() => setLanguage('en')} className={`ml-3 px-4 py-2 rounded-full text-sm font-medium ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition-all duration-300`}>EN</button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="bg-gray-700 p-4 shadow-md">
          <ul className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-10">
            <li>
              <button onClick={() => setActiveTab('profile')} className={`block w-full sm:w-auto text-center text-xl font-semibold ${activeTab === 'profile' ? 'text-blue-400 border-b-3 border-blue-400' : 'text-white hover:text-gray-300'} pb-2 transition-all duration-300`}>
                {language === 'es' ? 'Perfil' : 'Profile'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('projects')} className={`block w-full sm:w-auto text-center text-xl font-semibold ${activeTab === 'projects' ? 'text-blue-400 border-b-3 border-blue-400' : 'text-white hover:text-gray-300'} pb-2 transition-all duration-300`}>
                {language === 'es' ? 'Proyectos' : 'Projects'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className={`block w-full sm:w-auto text-center text-xl font-semibold ${activeTab === 'contact' ? 'text-blue-400 border-b-3 border-blue-400' : 'text-white hover:text-gray-300'} pb-2 transition-all duration-300`}>
                {language === 'es' ? 'Contacto' : 'Contact'}
              </button>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="p-6 md:p-10">
          <Suspense fallback={<div className="text-center text-2xl font-semibold text-gray-600 py-10">Cargando sección...</div>}>
            {activeTab === 'profile' && <Profile data={data} language={language} />}
            {activeTab === 'projects' && <Projects language={language} />}
            {activeTab === 'contact' && <Contact language={language} />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;