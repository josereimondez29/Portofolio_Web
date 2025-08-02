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
    <div className="p-6">
      <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{language === 'es' ? 'Contacto' : 'Contact'}</h3>
      <form onSubmit={handleContactSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg text-gray-700 font-semibold mb-1">{language === 'es' ? 'Nombre' : 'Name'}</label>
          <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg text-gray-700 font-semibold mb-1">Email</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg text-gray-700 font-semibold mb-1">{language === 'es' ? 'Mensaje' : 'Message'}</label>
          <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default Contact;
