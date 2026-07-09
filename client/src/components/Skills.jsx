import { useQuery } from '@tanstack/react-query';
import './Skills.css';
import api from '../api/client';

export default function Skills() {
  const { data: skillsData = [], isLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await api.get('/skills');
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const categoryOrder = ['Languages', 'Frontend', 'Backend', 'Security & Tools', 'DevOps & Tools', 'Other'];

  if (isLoading) {
    return (
      <div className="skills-loading">
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem' }}>
          Loading skills...
        </p>
      </div>
    );
  }

  if (!skillsData.length) {
    return <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem' }}>No skills added yet.</p>;
  }

  // Group skills by category
  const grouped = skillsData.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    let icon = skill.icon ? <i className={skill.icon}></i> : null;
    acc[category].push({
      name: skill.level ? `${skill.name} (${skill.level})` : skill.name,
      icon,
      id: skill.id,
    });
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">Technical <span>Skills</span></h2>
          <p className="skills-subtitle">
            Technologies and tools I use across full-stack development and security.
          </p>
        </div>
        <div className="skills-grid">
          {sortedCategories.map((category) => (
            <div key={category} className="skill-card">
              <h3 className="skill-category-title">{category}</h3>
              <ul className="skill-list">
                {grouped[category].map((item, idx) => (
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