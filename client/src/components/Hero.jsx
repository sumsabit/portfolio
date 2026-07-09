import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-greeting">👋 Hello, I'm</p>
          <h1 className="hero-title">
            <span>Sumeya Sabit</span>
            <br />
            <span className="hero-title-gradient">Computer Science Graduate</span>
          </h1>
          <p className="hero-desc">
            Passionate about cybersecurity, frontend development, backend development, and building secure, scalable applications.
          </p>

          {/* ✅ Buttons */}
          <div className="hero-buttons">
            <Link to="/projects" className="hero-btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="hero-btn-secondary">
              Contact Me
            </Link>
            <a href="/Sumeya_CV.pdf" download="Sumeya_Sabit_CV.pdf" className="hero-btn-download">
              📄 Download CV
            </a>
          </div>

          {/* ✅ Social Icons (with proper content) */}
          <div className="hero-meta">
            <div className="hero-social-icons">
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
      </div>
    </section>
  );
}