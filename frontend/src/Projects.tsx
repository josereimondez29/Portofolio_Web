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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-8">
              {language === 'es' ? 'Proyectos Destacados' : 'Featured Projects'}
            </h1>
            
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
  );
}

export default Projects;