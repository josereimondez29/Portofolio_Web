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
    <div className="p-6">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">{data.name}</h1>
        <h2 className="text-3xl text-blue-600 font-semibold mb-4">{data.title}</h2>
        <div className="flex justify-center space-x-6 mb-4">
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700 transition-colors duration-300">
            <FaLinkedin size={30} />
          </a>
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors duration-300">
            <FaGithub size={30} />
          </a>
          <a href={data.contact.credly} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-700 transition-colors duration-300">
            <SiCredly size={30} />
          </a>
        </div>
        <p className="text-lg text-gray-700">{data.contact.email} | {data.contact.phone} | {data.contact.location}</p>
      </header>

      <section className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</h3>
        <p className="text-gray-700 leading-relaxed">{data.profile}</p>
      </section>

      <section className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Habilidades Técnicas' : 'Technical Skills'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(data.skills).map(([category, skills]) => (
            <div key={category} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{category}</h4>
              <p className="text-gray-600">{skills}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Experiencia Laboral' : 'Work Experience'}</h3>
        {data.experience.map((job, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h4 className="text-xl font-bold text-gray-800">{job.role}</h4>
            <p className="text-gray-600 mb-2">{job.company} | {job.location} | {job.date}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {job.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Educación' : 'Education'}</h3>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h4 className="text-xl font-bold text-gray-800">{edu.title}</h4>
            <p className="text-gray-600">{edu.institution} | {edu.location} | {edu.date}</p>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Idiomas' : 'Languages'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.languages.map((lang, index) => (
            <div key={index} className="mb-2 p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="text-gray-700"><span className="font-bold">{lang.language}:</span> {lang.level}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Certificaciones' : 'Certifications'}</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {data.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Profile;
