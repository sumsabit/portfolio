import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import '../components/AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hero state
  const [hero, setHero] = useState({ title: '', subtitle: '', availability: '' });

  // About state
  const [about, setAbout] = useState({ bio: '', tags: [], education: '', experience: [] });

  // Skills state
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ category: '', name: '', icon: '', level: '' });
  const [editingSkill, setEditingSkill] = useState(null);

  // Contact state
  const [contact, setContact] = useState({ email: '', phone: '', location: '', social: {} });

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    description: '',
    features: [],
    technologies: '',
    github: '',
    demo: '',
    reportLink: ''   // ✅ Added reportLink
  });
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Fetch all data
  useEffect(() => {
    fetchHero();
    fetchAbout();
    fetchSkills();
    fetchContact();
    fetchProjects();
  }, []);

  const fetchHero = async () => {
    const res = await api.get('/hero');
    setHero(res.data);
  };

  const fetchAbout = async () => {
    const res = await api.get('/about');
    setAbout(res.data);
  };

  const fetchSkills = async () => {
    const res = await api.get('/skills');
    setSkills(res.data);
  };

  const fetchContact = async () => {
    const res = await api.get('/contact');
    setContact(res.data);
  };

  const fetchProjects = async () => {
    const res = await api.get('/projects');
    setProjects(res.data);
  };

  // Hero update
  const handleHeroUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.patch('/hero', hero);
    setLoading(false);
    alert('Hero updated!');
  };

  // About update
  const handleAboutUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.patch('/about', about);
    setLoading(false);
    alert('About updated!');
  };

  // Skills CRUD
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingSkill) {
      await api.patch(`/skills/${editingSkill.id}`, newSkill);
      setEditingSkill(null);
    } else {
      await api.post('/skills', newSkill);
    }
    setNewSkill({ category: '', name: '', icon: '', level: '' });
    fetchSkills();
    setLoading(false);
  };

  const handleSkillDelete = async (id) => {
    if (confirm('Delete this skill?')) {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    }
  };

  const handleSkillEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkill(skill);
  };

  // Contact update
  const handleContactUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.patch('/contact', contact);
    setLoading(false);
    alert('Contact updated!');
  };

  // Projects CRUD
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editingProjectId) {
      await api.patch(`/projects/${editingProjectId}`, projectForm);
      setEditingProjectId(null);
    } else {
      await api.post('/projects', projectForm);
    }
    setProjectForm({ title: '', slug: '', description: '', features: [], technologies: '', github: '', demo: '', reportLink: '' });
    fetchProjects();
    setLoading(false);
  };

  const handleProjectDelete = async (id) => {
    if (confirm('Delete this project?')) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  const handleProjectEdit = (project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      features: project.features || [],
      technologies: project.technologies || '',
      github: project.github || '',
      demo: project.demo || '',
      reportLink: project.reportLink || '',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Admin <span>Dashboard</span></h1>
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}>Hero</button>
          <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About</button>
          <button className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>Skills</button>
          <button className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contact</button>
          <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Projects</button>
        </div>

        <div className="admin-content">
          {loading && <p className="admin-loading">Saving...</p>}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="admin-section">
              <h2>Edit Hero Section</h2>
              <form onSubmit={handleHeroUpdate}>
                <input
                  type="text"
                  placeholder="Title"
                  value={hero.title || ''}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  value={hero.subtitle || ''}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Availability"
                  value={hero.availability || ''}
                  onChange={(e) => setHero({ ...hero, availability: e.target.value })}
                  className="admin-form-input"
                />
                <button type="submit" className="admin-submit-btn">Update Hero</button>
              </form>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="admin-section">
              <h2>Edit About Section</h2>
              <form onSubmit={handleAboutUpdate}>
                <textarea
                  placeholder="Bio"
                  value={about.bio || ''}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  className="admin-form-input"
                  rows="4"
                />
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  value={about.tags?.join(', ') || ''}
                  onChange={(e) => setAbout({ ...about, tags: e.target.value.split(',').map(t => t.trim()) })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Education"
                  value={about.education || ''}
                  onChange={(e) => setAbout({ ...about, education: e.target.value })}
                  className="admin-form-input"
                />
                <button type="submit" className="admin-submit-btn">Update About</button>
              </form>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="admin-section">
              <h2>Manage Skills</h2>
              <form onSubmit={handleSkillSubmit}>
                <input
                  type="text"
                  placeholder="Category"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Icon (CSS class, e.g., fab fa-react)"
                  value={newSkill.icon}
                  onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Level (e.g., Proficient)"
                  value={newSkill.level || ''}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="admin-form-input"
                />
                <div className="admin-form-buttons">
                  <button type="submit" className="admin-submit-btn">
                    {editingSkill ? 'Update Skill' : 'Add Skill'}
                  </button>
                  {editingSkill && (
                    <button
                      type="button"
                      onClick={() => { setEditingSkill(null); setNewSkill({ category: '', name: '', icon: '', level: '' }); }}
                      className="admin-cancel-btn"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="admin-list">
                {skills.map((skill) => (
                  <div key={skill.id} className="admin-list-item">
                    <span><strong>{skill.name}</strong> ({skill.category})</span>
                    <div>
                      <button onClick={() => handleSkillEdit(skill)} className="admin-edit-btn">Edit</button>
                      <button onClick={() => handleSkillDelete(skill.id)} className="admin-delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="admin-section">
              <h2>Edit Contact Info</h2>
              <form onSubmit={handleContactUpdate}>
                <input
                  type="email"
                  placeholder="Email"
                  value={contact.email || ''}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={contact.phone || ''}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={contact.location || ''}
                  onChange={(e) => setContact({ ...contact, location: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  type="text"
                  placeholder="Social (JSON: {telegram: 'url', linkedin: 'url', github: 'url'})"
                  value={JSON.stringify(contact.social || {})}
                  onChange={(e) => setContact({ ...contact, social: JSON.parse(e.target.value) })}
                  className="admin-form-input"
                />
                <button type="submit" className="admin-submit-btn">Update Contact</button>
              </form>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="admin-section">
              <h2>Manage Projects</h2>
              <form onSubmit={handleProjectSubmit}>
                <input
                  placeholder="Title"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="admin-form-input"
                  required
                />
                <input
                  placeholder="Slug"
                  value={projectForm.slug}
                  onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                  className="admin-form-input"
                  required
                />
                <input
                  placeholder="Description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="admin-form-input"
                  required
                />
                <textarea
                  placeholder="Features (one per line)"
                  value={projectForm.features?.join('\n') || ''}
                  onChange={(e) => setProjectForm({
                    ...projectForm,
                    features: e.target.value.split('\n').filter(f => f.trim())
                  })}
                  className="admin-form-input"
                  rows="4"
                />
                <input
                  placeholder="Technologies (comma separated)"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  placeholder="GitHub URL (optional)"
                  value={projectForm.github || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  placeholder="Live Demo URL (optional)"
                  value={projectForm.demo || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                  className="admin-form-input"
                />
                <input
                  placeholder="Report Link (optional, e.g., /dvwa-report.pdf)"
                  value={projectForm.reportLink || ''}
                  onChange={(e) => setProjectForm({ ...projectForm, reportLink: e.target.value })}
                  className="admin-form-input"
                />
                <div className="admin-form-buttons">
                  <button type="submit" className="admin-submit-btn">
                    {editingProjectId ? 'Update Project' : 'Create Project'}
                  </button>
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({ title: '', slug: '', description: '', features: [], technologies: '', github: '', demo: '', reportLink: '' });
                      }}
                      className="admin-cancel-btn"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="admin-list">
                {projects.map((p) => (
                  <div key={p.id} className="admin-list-item">
                    <span><strong>{p.title}</strong></span>
                    <div>
                      <button onClick={() => handleProjectEdit(p)} className="admin-edit-btn">Edit</button>
                      <button onClick={() => handleProjectDelete(p.id)} className="admin-delete-btn">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}