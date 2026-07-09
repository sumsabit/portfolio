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

  // Category display names (map to match the reference style)
  const categoryDisplayNames = {
    'Languages': 'Languages',
    'Frontend': 'Frontend',
    'Backend': 'Backend Development',
    'Security & Tools': 'Security & Tools',
    'DevOps & Tools': 'DevOps & Automation',
    'Other': 'Other',
  };

  // Skills that appear in the "Tech-stack Highlights" section
  const highlightSkills = [
    'Python', 'JavaScript', 'TypeScript', 'React',
    'Node.js', 'NestJS', 'PostgreSQL', 'Docker',
    'Git', 'Linux CLI', 'Burp Suite'
  ];

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
    acc[category].push(skill);
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

  // Get skills for highlights (only those that exist in the data)
  const allSkillNames = skillsData.map(s => s.name);
  const highlighted = highlightSkills.filter(s => allSkillNames.includes(s));

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">Technical <span>Skills</span></h2>
          <p className="skills-subtitle">
            Technologies and tools I use across full-stack development and security.
          </p>
        </div>

        {/* Category Cards with Tags */}
        <div className="skills-grid">
          {sortedCategories.map((category) => (
            <div key={category} className="skill-card">
              <h3 className="skill-category-title">
                {categoryDisplayNames[category] || category}
              </h3>
              <div className="skill-tags">
                {grouped[category].map((skill) => (
                  <span key={skill.id} className="skill-tag">
                    {skill.icon && <i className={skill.icon}></i>}
                    {skill.name}
                    {skill.level && <span className="skill-level">({skill.level})</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech-stack Highlights */}
        {highlighted.length > 0 && (
          <div className="tech-highlights">
            <h3 className="tech-highlights-title">Tech-stack Highlights</h3>
            <div className="tech-highlights-tags">
              {highlighted.map((skill) => (
                <span key={skill} className="highlight-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}