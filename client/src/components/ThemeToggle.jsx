import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggle}
      style={{
        background: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: '9999px',
        padding: '0.4rem 0.8rem',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontSize: '0.85rem',
        transition: 'all 0.3s',
      }}
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}  {/* ✅ Shows current mode */}
    </button>
  );
}