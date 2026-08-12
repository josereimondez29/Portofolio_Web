import React from 'react';
import { FaGithub } from 'react-icons/fa';

interface GithubProject {
  name: string;
  description: string | null;
  url: string;
  openGraphImageUrl: string;
  primaryLanguage: {
    name: string;
  } | null;
}

interface ProjectsProps {
  language: string;
}

function Projects({ language }: ProjectsProps) {
  const [pinnedProjects, setPinnedProjects] = React.useState<GithubProject[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch('https://josereimondez-portfolio-backend.onrender.com/api/github/pinned-projects')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPinnedProjects(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pinned projects:', error);
        setError(language === 'es' ? 
          'Error al cargar los proyectos. Por favor, inténtalo de nuevo más tarde.' : 
          'Error loading projects. Please try again later.');
        setIsLoading(false);
      });
  }, [language]);

  const featuredWebProjects = [
    {
      title: 'GB Automations',
      description: language === 'es' ? 'Soluciones de automatización web profesionales' : 'Professional web automation solutions',
      url: 'https://gbautomations.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'AutoBI - Analytics Agent as a Service',
      description: language === 'es' ? 'Plataforma de análisis inteligente y agentes de IA' : 'Intelligent analytics platform and AI agents',
      url: 'https://app.gbautomations.com',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-12">
              {language === 'es' ? 'Proyectos Destacados' : 'Featured Projects'}
            </h1>
            
            {/* Sección de Proyectos Web Destacados */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-navy-700 mb-6">
                {language === 'es' ? 'Proyectos Web' : 'Web Projects'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredWebProjects.map((project, index) => (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {/* Preview de la web usando una imagen externa */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 group-hover:opacity-80 transition-opacity duration-300`}></div>
                    
                    {/* Screenshot usando API de terceros */}
                    <img
                      src={`https://image.thum.io/get/width/800/crop/600/${project.url}`}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    
                    {/* Contenido */}
                    <div className="relative z-10 flex flex-col justify-end h-full p-8 text-white">
                      <h3 className="text-3xl sm:text-4xl font-bold mb-3 group-hover:translate-y-1 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <p className="text-lg opacity-90 mb-4">
                        {project.description}
                      </p>
                      <div className="inline-flex items-center text-white font-semibold text-lg group-hover:gap-3 transition-all duration-300">
                        <span>{language === 'es' ? 'Visitar' : 'Visit'}</span>
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Sección de Repositorios GitHub */}
            <div>
              <h2 className="text-2xl font-bold text-navy-700 mb-6">
                {language === 'es' ? 'Repositorios GitHub' : 'GitHub Repositories'}
              </h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-800"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pinnedProjects.map((project, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group">
                      <div className="h-48 bg-navy-100 flex items-center justify-center relative">
                        {project.openGraphImageUrl ? (
                          <img 
                            src={project.openGraphImageUrl} 
                            alt={project.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-navy-100 flex items-center justify-center">
                            <FaGithub className="text-6xl text-navy-300" />
                          </div>
                        )}
                        {project.primaryLanguage && (
                          <span className="absolute bottom-2 right-2 bg-navy-800 text-white px-2 py-1 rounded text-sm">
                            {project.primaryLanguage.name}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h4 className="text-xl font-bold text-navy-800 mb-2">{project.name}</h4>
                        <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                          {project.description || (language === 'es' ? 'Sin descripción' : 'No description')}
                        </p>
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-navy-600 hover:text-navy-800 transition-colors duration-300"
                        >
                          <FaGithub className="mr-2" />
                          {language === 'es' ? 'Ver en GitHub' : 'View on GitHub'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;