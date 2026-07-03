import { useState, useEffect } from 'react';
import './Projects.css';
import api from '../api/client';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
const response = await api.get('/projects');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem' }}>Loading projects...</p>;
  }

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">
            My <span>Projects</span>
          </h2>
          <p className="projects-subtitle">
            A selection of my work – from AI-powered systems to security research.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const { title, description, features, technologies, github, reportLink, featured } = project;

            // Convert technologies to array if it's a string
            let techArray = [];
            if (typeof technologies === 'string') {
              techArray = technologies.split(',').map(t => t.trim()).filter(t => t);
            } else if (Array.isArray(technologies)) {
              techArray = technologies;
            }

            return (
              <div key={index} className={`project-card ${featured ? 'featured' : ''}`}>
                {featured && <span className="project-badge">⭐ Featured</span>}
                <h3 className="project-title">{title}</h3>
                <p className="project-description">{description}</p>

                {features && features.length > 0 && (
                  <ul className="project-features">
                    {features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                )}

                <div className="project-tech">
                  {techArray.map((t, idx) => (
                    <span key={idx} className="project-tech-item">{t}</span>
                  ))}
                </div>

                <div className="project-links">
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="project-btn-github">
                      <i className="fab fa-github"></i> GitHub
                    </a>
                  )}
                  {reportLink && (
                    <a href={reportLink} target="_blank" rel="noopener noreferrer" className="project-btn-report">
                      <span className="btn-icon">📄</span> View Report
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}         