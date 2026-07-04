import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import '../components/AdminDashboard.css';

// ✅ TYPES (FIXES ALL "never" + "any" issues)
type Skill = {
  id: string;
  name: string;
  category: string;
  icon?: string;
  level?: string;
};

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  technologies: string;
  github?: string;
  demo?: string;
};

type Contact = {
  email: string;
  phone: string;
  location: string;
  social: Record<string, string>;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hero
  const [hero, setHero] = useState({ title: '', subtitle: '', availability: '' });

  // About
  const [about, setAbout] = useState({ bio: '', tags: [] as string[], education: '', experience: [] });

  // Skills ✅ FIXED
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    category: '',
    name: '',
    icon: '',
    level: ''
  });
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Contact
  const [contact, setContact] = useState<Contact>({
    email: '',
    phone: '',
    location: '',
    social: {}
  });

  // Projects ✅ FIXED
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState<Project>({
    id: '',
    title: '',
    slug: '',
    description: '',
    features: [],
    technologies: '',
    github: '',
    demo: ''
  });
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    fetchHero();
    fetchAbout();
    fetchSkills();
    fetchContact();
    fetchProjects();
  }, []);

  const fetchHero = async () => setHero((await api.get('/hero')).data);
  const fetchAbout = async () => setAbout((await api.get('/about')).data);
  const fetchSkills = async () => setSkills((await api.get('/skills')).data);
  const fetchContact = async () => setContact((await api.get('/contact')).data);
  const fetchProjects = async () => setProjects((await api.get('/projects')).data);

  // Hero
  const handleHeroUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.patch('/hero', hero);
    setLoading(false);
    alert('Hero updated!');
  };

  // About
  const handleAboutUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.patch('/about', about);
    setLoading(false);
    alert('About updated!');
  };

  // Skills CRUD
  const handleSkillSubmit = async (e: React.FormEvent) => {
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

  const handleSkillDelete = async (id: string) => {
    if (confirm('Delete this skill?')) {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    }
  };

  const handleSkillEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setNewSkill(skill);
  };

  // Contact (SAFE JSON)
  const handleContactUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await api.patch('/contact', contact);
    setLoading(false);
    alert('Contact updated!');
  };

  // Projects
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingProjectId) {
      await api.patch(`/projects/${editingProjectId}`, projectForm);
      setEditingProjectId(null);
    } else {
      await api.post('/projects', projectForm);
    }

    setProjectForm({
      id: '',
      title: '',
      slug: '',
      description: '',
      features: [],
      technologies: '',
      github: '',
      demo: ''
    });

    fetchProjects();
    setLoading(false);
  };

  const handleProjectDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  const handleProjectEdit = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectForm(project);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">

        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">Admin <span>Dashboard</span></h1>
          <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button onClick={() => setActiveTab('hero')}>Hero</button>
          <button onClick={() => setActiveTab('about')}>About</button>
          <button onClick={() => setActiveTab('skills')}>Skills</button>
          <button onClick={() => setActiveTab('contact')}>Contact</button>
          <button onClick={() => setActiveTab('projects')}>Projects</button>
        </div>

        <div className="admin-content">

          {/* SKILLS TAB (NOW FIXED) */}
          {activeTab === 'skills' && (
            <div className="admin-section">
              <h2>Manage Skills</h2>

              <form onSubmit={handleSkillSubmit}>
                <input
                  placeholder="Category"
                  value={newSkill.category || ''}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="admin-form-input"
                />

                <input
                  placeholder="Name"
                  value={newSkill.name || ''}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="admin-form-input"
                />

                <button type="submit" className="admin-submit-btn">
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
                </button>
              </form>

              {/* LIST */}
              <div className="admin-list">
                {skills.map((skill) => (
                  <div key={skill.id} className="admin-list-item">
                    <span>{skill.name}</span>
                    <button onClick={() => handleSkillDelete(skill.id)}>Delete</button>
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