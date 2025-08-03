import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';

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

interface ProfileProps {
  data: CVData;
  language: string;
}

function Profile({ data, language }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <header className="relative rounded-3xl bg-white shadow-xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
          <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-20">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 leading-tight tracking-tight text-center">
              {data.name}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-semibold mb-8 tracking-wide text-center">
              {data.title}
            </h2>
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-110 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
            <FaLinkedin size={32} />
          </a>
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 transform hover:scale-110">
            <FaGithub size={32} />
          </a>
          <a href={data.contact.credly} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-700 transition-colors duration-300 transform hover:scale-110">
            <SiCredly size={32} />
          </a>
        </div>
        <p className="text-lg md:text-xl text-gray-700 font-medium">
          <span className="block">{data.contact.email}</span>
          <span className="block">{data.contact.phone}</span>
          <span className="block">{data.contact.location}</span>
        </p>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-5">{language === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</h3>
        <p className="text-gray-700 leading-relaxed text-lg">{data.profile}</p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-5">{language === 'es' ? 'Habilidades Técnicas' : 'Technical Skills'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(data.skills).map(([category, skills]) => (
            <div key={category} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{category}</h4>
              <p className="text-gray-600 text-base">{skills}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-5">{language === 'es' ? 'Experiencia Laboral' : 'Work Experience'}</h3>
        <div className="space-y-8">
          {data.experience.map((job, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800">{job.role}</h4>
              <p className="text-gray-600 mb-2 text-base">{job.company} | {job.location} | {job.date}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-base">
                {job.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-5">{language === 'es' ? 'Educación' : 'Education'}</h3>
        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800">{edu.title}</h4>
              <p className="text-gray-600 text-base">{edu.institution} | {edu.location} | {edu.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-5">{language === 'es' ? 'Idiomas' : 'Languages'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.languages.map((lang, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-700 text-base"><span className="font-bold">{lang.language}:</span> {lang.level}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-5">{language === 'es' ? 'Certificaciones' : 'Certifications'}</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-base ml-4">
          {data.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Profile;