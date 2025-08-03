import React from 'react';
import profileImage from './assets/images/foto perfil.jpg';
import type { CVData } from './types/CVData';

interface ProfileProps {
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
  projects: {
    name: string;
    description: string;
    image: string;
    githubUrl: string;
  }[];
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
          <div className="absolute inset-0 bg-gradient-to-r from-navy-800 to-navy-900 opacity-10"></div>
          <div className="relative z-10 px-6 py-8 sm:px-12 sm:py-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img 
                  src={profileImage} 
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-3 leading-tight">
                  {data.name}
                </h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl text-navy-700 font-medium mb-4">
                  {data.title}
                </h2>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="w-5 text-navy-600">📧</span>
                    {data.contact.email}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="w-5 text-navy-600">📱</span>
                    {data.contact.phone}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="w-5 text-navy-600">📍</span>
                    {data.contact.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-6">{language === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</h3>
          <p className="text-gray-700 leading-relaxed text-lg">{data.profile}</p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-6">{language === 'es' ? 'Habilidades Técnicas' : 'Technical Skills'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category} className="bg-gray-50 hover:bg-navy-50 p-5 rounded-lg shadow-sm border border-gray-200 transition-colors duration-300">
                <h4 className="text-xl font-semibold text-navy-800 mb-2">{category}</h4>
                <p className="text-gray-600 text-base">{skills}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-6">{language === 'es' ? 'Experiencia Laboral' : 'Work Experience'}</h3>
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

        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-6">{language === 'es' ? 'Educación' : 'Education'}</h3>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="p-5 bg-gray-50 hover:bg-navy-50 rounded-lg shadow-sm border border-gray-200 transition-colors duration-300">
                <h4 className="text-xl font-bold text-navy-800">{edu.title}</h4>
                <p className="text-gray-600 text-base">{edu.institution} | {edu.location} | {edu.date}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-6">{language === 'es' ? 'Idiomas' : 'Languages'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.languages.map((lang, index) => (
              <div key={index} className="p-5 bg-gray-50 hover:bg-navy-50 rounded-lg shadow-sm border border-gray-200 transition-colors duration-300">
                <p className="text-gray-700 text-base"><span className="font-bold text-navy-800">{lang.language}:</span> {lang.level}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-6">{language === 'es' ? 'Certificaciones' : 'Certifications'}</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base ml-4">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Profile;