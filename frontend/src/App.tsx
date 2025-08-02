import { useState, useEffect, type FormEvent } from 'react';

interface CVData {
  name: string;
  title: string;
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

  useEffect(() => {
    fetch(`https://josereimondez-portfolio-backend.onrender.com/api/${language}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [language]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    fetch('https://josereimondez-portfolio-backend.onrender.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      (event.target as HTMLFormElement).reset();
    });
  };

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

        <section className="mt-8">
          <h3 className="text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4">{language === 'es' ? 'Contacto' : 'Contact'}</h3>
          <form onSubmit={handleContactSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">{language === 'es' ? 'Nombre' : 'Name'}</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">{language === 'es' ? 'Mensaje' : 'Message'}</label>
              <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border rounded-lg" required></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">{language === 'es' ? 'Enviar' : 'Send'}</button>
          </form>
        </section>

      </div>
    </div>
  );
}

export default App;