import { useState, useEffect } from 'react';

function App() {
  const [language, setLanguage] = useState('es');
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/${language}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [language]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-end mb-4">
          <button onClick={() => setLanguage('es')} className={`px-4 py-2 rounded-lg ${language === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>ES</button>
          <button onClick={() => setLanguage('en')} className={`ml-2 px-4 py-2 rounded-lg ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>EN</button>
        </div>
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <h2 className="text-2xl text-gray-600">{data.title}</h2>
        </header>
        <section>
          <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{language === 'es' ? 'Perfil Profesional' : 'Professional Profile'}</h3>
          <p>{data.profile}</p>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{language === 'es' ? 'Habilidades Técnicas' : 'Technical Skills'}</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category}>
                <h4 className="font-bold">{category}</h4>
                <p>{skills}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{language === 'es' ? 'Experiencia Laboral' : 'Work Experience'}</h3>
          {data.experience.map((job, index) => (
            <div key={index} className="mb-6">
              <h4 className="text-xl font-bold">{job.role}</h4>
              <p className="text-gray-600">{job.company} | {job.location} | {job.date}</p>
              <ul className="list-disc list-inside mt-2">
                {job.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{language === 'es' ? 'Educación' : 'Education'}</h3>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-xl font-bold">{edu.title}</h4>
              <p className="text-gray-600">{edu.institution} | {edu.location} | {edu.date}</p>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{language === 'es' ? 'Idiomas' : 'Languages'}</h3>
          {data.languages.map((lang, index) => (
            <div key={index} className="mb-2">
              <p><span className="font-bold">{lang.language}:</span> {lang.level}</p>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{language === 'es' ? 'Certificaciones' : 'Certifications'}</h3>
          <ul className="list-disc list-inside">
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}

export default App;