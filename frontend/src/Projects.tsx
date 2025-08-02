interface ProjectsProps {
  language: string;
}

function Projects({ language }: ProjectsProps) {
  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Mis Proyectos' : 'My Projects'}</h3>
      <p className="text-gray-700">{language === 'es' ? 'Aquí se mostrarán tus proyectos más destacados.' : 'Here your most iconic projects will be displayed.'}</p>
      {/* Aquí se renderizarán los proyectos */}
    </div>
  );
}

export default Projects;
