import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { CVData } from './types/CVData';
import Layout from './Layout';

// Lazy load components
const Profile = lazy(() => import('./Profile'));
const Projects = lazy(() => import('./Projects'));
const Blog = lazy(() => import('./Blog'));
const Contact = lazy(() => import('./Contact'));
const Post = lazy(() => import('./routes/Post'));

function App() {
  const [language, setLanguage] = useState('es');
  const [data, setData] = useState<CVData | null>(null);

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
          {language === 'es' ? 'Cargando tu portafolio...' : 'Loading your portfolio...'}
        </div>
        <div className="mt-4 text-navy-600 animate-pulse">
          {language === 'es' ? 'Por favor, espera un momento' : 'Please wait a moment'}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout language={language} setLanguage={setLanguage} data={data}>
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 border-4 border-navy-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-navy-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Profile data={data} language={language} />} />
            <Route path="/projects" element={<Projects language={language} />} />
            <Route path="/blog" element={<Blog language={language} />} />
            <Route path="/blog/:slug" element={<Post language={language} />} />
            <Route path="/contact" element={<Contact language={language} data={data} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
