import { useState } from 'react';
import { useSendMessage } from '../hooks/useSendMessage';
import '../components/Contact.css';   // ✅ fixed path

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

        <div className="contact-social-links">
          <p className="contact-social-text">Or connect with me on:</p>
          <div className="contact-social-icons">
            <a 
              href="mailto:sumeyasabit1@gmail.com" 
              className="social-icon email"
            >
              <i className="fas fa-envelope"></i> Email
            </a>
            <a 
              href="https://t.me/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon telegram"
            >
              <i className="fab fa-telegram-plane"></i> Telegram
            </a>
            <a 
              href="https://linkedin.com/in/sumeya-sabit-siraj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon linkedin"
            >
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a 
              href="https://github.com/sumsabit" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon github"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}