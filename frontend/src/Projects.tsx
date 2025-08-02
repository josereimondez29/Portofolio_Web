interface ProjectsProps {
  language: string;
}

function Projects({ language }: ProjectsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-5">{language === 'es' ? 'Mis Proyectos' : 'My Projects'}</h3>
      <p className="text-gray-700 text-lg leading-relaxed">
        {language === 'es' 
          ? 'Aquí se mostrarán tus proyectos más destacados. Por favor, proporcióname los detalles de tus proyectos (título, descripción, tecnologías, enlaces a GitHub/demo, y opcionalmente una imagen) para que pueda añadirlos aquí.'
          : 'Here your most iconic projects will be displayed. Please provide me with the details of your projects (title, description, technologies, GitHub/demo links, and optionally an image) so I can add them here.'}
      </p>
      {/* Aquí se renderizarán los proyectos */}
    </div>
  );
}

export default Projects;