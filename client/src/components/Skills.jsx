import { useState, useEffect } from 'react';
import './Skills.css';
import api from '../api/client';

export default function Skills() {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);

  const categoryOrder = [
    'Languages',
    'Frontend',
    'Backend',
    'Security & Tools'
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        console.log('🔍 Skills component mounted, fetching data...'); // ← DEBUG
        const response = await api.get('/skills');
        const data = response.data;
        console.log('📦 Skills data received:', data); // ← DEBUG

        const grouped = data.reduce((acc, skill) => {
          const category = skill.category || 'Other';
          if (!acc[category]) acc[category] = [];
          let icon = null;
          if (skill.icon) {
            icon = <i className={skill.icon}></i>;
          }
          acc[category].push({
            name: skill.level ? `${skill.name} (${skill.level})` : skill.name,
            icon: icon,
            id: skill.id,
          });
          return acc;
        }, {});

        setSkills(grouped);
      } catch (error) {
        console.error('❌ Error fetching skills:', error);
        setSkills({});
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem' }}>Loading skills...</p>;
  }

  if (Object.keys(skills).length === 0) {
    return <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem' }}>No skills added yet.</p>;
  }

  const sortedCategories = Object.keys(skills).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">
            Technical <span>Skills</span>
          </h2>
          <p className="skills-subtitle">
            Technologies and tools I use across full-stack development and security.
          </p>
        </div>
        <div className="skills-grid">
          {sortedCategories.map((category) => (
            <div key={category} className="skill-card">
              <h3 className="skill-category-title">{category}</h3>
              <ul className="skill-list">
                {skills[category].map((item, idx) => (
                  <li key={idx} className="skill-list-item">
                    <span className="skill-icon">{item.icon}</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
