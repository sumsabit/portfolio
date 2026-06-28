import './About.css';

export default function About() {
  return (
    <section  id="about" className="about-section">
      <div className="about-container">
        <div className="about-header">
          <span className="about-badge">About Me</span>
          <h2 className="about-title">
            Who I <span>Am</span>
          </h2>
          <p className="about-subtitle">
            A quick overview of my background, education, and professional experience.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3 className="about-card-title">
              <span className="icon">👩‍💻</span> Who I Am
            </h3>
            <p className="about-text">
              I am a Computer Science graduate with hands-on experience in web penetration testing from my internship at INSA. 
              I have skills in identifying web vulnerabilities, using Python for scripting, and full-stack development with React and NestJS. 
              I am motivated to apply my skills in cybersecurity and software development in real-world environments.
            </p>
            <div className="about-tags">
              <span className="about-tag">Cybersecurity</span>
              <span className="about-tag">Full-Stack</span>
              <span className="about-tag">Python</span>
            </div>
            <div className="about-divider">
              <span className="about-status">
                <span className="about-status-dot"></span> Open to work
              </span>
            </div>
          </div>

          <div className="about-card">
            <h3 className="about-card-title">
              <span className="icon">📚</span> Education & Experience
            </h3>
            <div className="about-experience">
              <div className="exp-item">
                <p className="exp-item-title">B.Sc. Computer Science</p>
                <p className="exp-item-org">Jimma University, Ethiopia</p>
                <p className="exp-item-highlight">✅ Graduated: 2026</p>
              </div>
              <div className="exp-item" style={{ borderLeftColor: '#60a5fa' }}>
                <p className="exp-item-title">Web Penetration Testing Intern</p>
                <p className="exp-item-org">INSA (Information Network Security Administration)</p>
                <p className="exp-item-desc">Vulnerability assessment, Linux, networking</p>
              </div>
              <div className="exp-item" style={{ borderLeftColor: '#3b82f6' }}>
                <p className="exp-item-title">Frontend Developer</p>
                <p className="exp-item-org">React, TypeScript, Tailwind CSS</p>
                <p className="exp-item-desc">Building responsive, interactive user interfaces</p>
              </div>
              <div className="exp-item" style={{ borderLeftColor: '#1d4ed8' }}>
                <p className="exp-item-title">Backend Developer (NestJS)</p>
                <p className="exp-item-org">REST APIs, PostgreSQL, TypeScript</p>
                <p className="exp-item-desc">Scalable server-side architecture and database design</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-cta">
          <a href="/contact">Let's work together →</a>
        </div>
      </div>
    </section>
  );
}