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

  // ------------------------------------------------------------------
  // 1. Define the four main categories with display name, icon, and
  //    which database categories they map to.
  // ------------------------------------------------------------------
  const mainCategories = [
    {
      key: 'Backend Development',
      icon: 'fas fa-server',
      dbCategories: ['Backend', 'Backend Development']
    },
    {
      key: 'Frontend Development',
      icon: 'fas fa-laptop-code',
      dbCategories: ['Frontend']
    },
    {
      key: 'Security & Tools',
      icon: 'fas fa-shield-alt',
      dbCategories: ['Security & Tools']
    },
    {
      key: 'DevOps & Automation',
      icon: 'fas fa-cogs',
      dbCategories: ['DevOps & Tools', 'DevOps']
    }
  ];

  // Build a reverse map: databaseCategory -> mainCategoryKey
  const categoryMap = {};
  mainCategories.forEach((cat) => {
    cat.dbCategories.forEach((dbCat) => {
      categoryMap[dbCat] = cat.key;
    });
  });

  // ------------------------------------------------------------------
  // 2. Process skills: assign to main categories or highlights
  // ------------------------------------------------------------------
  const mainSkills = {};
  mainCategories.forEach((cat) => {
    mainSkills[cat.key] = [];
  });

  const highlights = [];

  skillsData.forEach((skill) => {
    const dbCat = skill.category || 'Other';
    const mainKey = categoryMap[dbCat];
    if (mainKey && mainSkills[mainKey] !== undefined) {
      mainSkills[mainKey].push(skill);
    } else {
      highlights.push(skill);
    }
  });

  // Sort highlights alphabetically
  highlights.sort((a, b) => a.name.localeCompare(b.name));

  const categoryOrder = ['Backend Development', 'Frontend Development', 'Security & Tools', 'DevOps & Automation'];

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

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2 className="skills-title">Technical <span>Skills</span></h2>
          <p className="skills-subtitle">
            Technologies and tools I use across full-stack development and security.
          </p>
        </div>

        {/* ---- Main Category Cards with Icons ---- */}
        <div className="skills-grid">
          {categoryOrder.map((categoryKey) => {
            const catConfig = mainCategories.find(c => c.key === categoryKey);
            return (
              <div key={categoryKey} className="skill-card">
                <h3 className="skill-category-title">
                  <i className={catConfig.icon}></i> {categoryKey}
                </h3>
                <div className="skill-tags">
                  {mainSkills[categoryKey].map((skill) => (
                    <span key={skill.id} className="skill-tag">
                      {skill.icon && <i className={skill.icon}></i>}
                      {skill.name}
                      {skill.level && <span className="skill-level">({skill.level})</span>}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Tech-stack Highlights ---- */}
        {highlights.length > 0 && (
          <div className="tech-highlights">
            <h3 className="tech-highlights-title">Tech-stack Highlights</h3>
            <div className="tech-highlights-tags">
              {highlights.map((skill) => (
                <span key={skill.id} className="highlight-tag">
                  {skill.icon && <i className={skill.icon}></i>}
                  {skill.name}
                  {skill.level && <span className="skill-level">({skill.level})</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}