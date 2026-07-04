import { useState } from 'react';
import { useSendMessage } from '../hooks/useSendMessage';
import '../components/Contact.css';   

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const mutation = useSendMessage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: () => {
        alert('Message sent!');
        setForm({ name: '', email: '', message: '' });
      },
      onError: () => alert('Failed to send.'),
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1 className="contact-title">
          Contact <span>Me</span>
        </h1>
        <p className="contact-subtitle">
          I'd love to hear from you – drop a message!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="contact-form-group">
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
          <div className="contact-form-group">
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="contact-form-input"
              required
            />
          </div>
          <div className="contact-form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="contact-form-textarea"
              required
            />
          </div>
          <button
            type="submit"
            className="contact-submit-btn"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Sending...' : 'Send Message'}
          </button>
        </form>

               
             
        </div>
      </div>
    
  );
}