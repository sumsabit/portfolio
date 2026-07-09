import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting">👋 Hello, I'm</p>
          <h1 className="hero-title">
            <span className="hero-name">Sumeya Sabit</span>
            <br />
            <span className="hero-title-gradient">Computer Science Graduate &amp; Web Penetration Tester</span>
          </h1>
          <p className="hero-desc">
            I specialize in <strong>web penetration testing</strong> with hands-on experience from my INSA internship. 
            I build secure <strong>full-stack applications</strong> with React and NestJS, driven by a passion for cybersecurity 
            and scalable backend systems.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="hero-btn-primary">
              Contact Me
            </Link>
            <a href="/Sumeya_CV.pdf" download="Sumeya_Sabit_CV.pdf" className="hero-btn-secondary">
              📄 Download CV
            </a>
          </div>
          <div className="hero-meta">
            <span className="hero-meta-item">🎯 Open to opportunities</span>
            <span className="hero-meta-dot">•</span>
            <span className="hero-meta-item">📍 Addis Ababa, Ethiopia</span>
          </div>
          <div className="hero-socials">
            <a
              href="mailto:sumeyasabit1@gmail.com"
              className="social-icon email"
              aria-label="Email"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://t.me/@sumsabit"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon telegram"
              aria-label="Telegram"
            >
              <i className="fab fa-telegram-plane"></i>
            </a>
            <a
              href="https://linkedin.com/in/sumeya-sabit-siraj"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/sumsabit"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon github"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}