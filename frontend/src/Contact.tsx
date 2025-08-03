import { type FormEvent } from 'react';

interface ContactProps {
  language: string;
}

function Contact({ language }: ContactProps) {
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
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h3 className="text-3xl font-bold text-navy-800 border-b-2 border-navy-500 pb-3 mb-6">{language === 'es' ? 'Contacto' : 'Contact'}</h3>
      <form onSubmit={handleContactSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg text-navy-700 font-semibold mb-2">{language === 'es' ? 'Nombre' : 'Name'}</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-all duration-200" 
            required 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg text-navy-700 font-semibold mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-all duration-200" 
            required 
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg text-navy-700 font-semibold mb-2">{language === 'es' ? 'Mensaje' : 'Message'}</label>
          <textarea 
            id="message" 
            name="message" 
            rows={6} 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 transition-all duration-200" 
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="bg-navy-800 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-navy-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 transform hover:scale-105"
        >
          {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default Contact;