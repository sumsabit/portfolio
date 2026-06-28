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
          <div className="hero-buttons">
            <Link to="/projects" className="hero-btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="hero-btn-secondary">
              Contact Me
            </Link>
          </div>
          <div className="hero-meta">
            <span className="hero-meta-item">
              <span className="hero-meta-dot"></span> Open to opportunities
            </span>
            <span className="hero-meta-item">📍 Addis Ababa, Ethiopia</span>
          </div>
        </div>
      </div>
    </section>
  );
}