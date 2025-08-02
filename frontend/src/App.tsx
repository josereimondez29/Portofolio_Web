import { useState, useEffect, Suspense, lazy } from 'react';
import { FaGithub, FaLinkedin, FaCredly } from 'react-icons/fa';

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
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden my-8">
        {/* Language and Social Icons */}
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="flex space-x-4">
            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300">
              <FaGithub size={24} />
            </a>
            <a href={data.contact.credly} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">
              <FaCredly size={24} />
            </a>
          </div>
          <div>
            <button onClick={() => setLanguage('es')} className={`px-3 py-1 rounded-md text-sm font-medium ${language === 'es' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition-colors duration-300`}>ES</button>
            <button onClick={() => setLanguage('en')} className={`ml-2 px-3 py-1 rounded-md text-sm font-medium ${language === 'en' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition-colors duration-300`}>EN</button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="bg-gray-700 p-4">
          <ul className="flex justify-center space-x-8">
            <li>
              <button onClick={() => setActiveTab('profile')} className={`text-lg font-medium ${activeTab === 'profile' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white hover:text-gray-300'} pb-2 transition-colors duration-300`}>
                {language === 'es' ? 'Perfil' : 'Profile'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('projects')} className={`text-lg font-medium ${activeTab === 'projects' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white hover:text-gray-300'} pb-2 transition-colors duration-300`}>
                {language === 'es' ? 'Proyectos' : 'Projects'}
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className={`text-lg font-medium ${activeTab === 'contact' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white hover:text-gray-300'} pb-2 transition-colors duration-300`}>
                {language === 'es' ? 'Contacto' : 'Contact'}
              </button>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="p-8">
          <Suspense fallback={<div className="text-center text-xl text-gray-600">Loading section...</div>}>
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
