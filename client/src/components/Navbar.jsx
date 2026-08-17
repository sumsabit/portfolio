import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <a href="#home" className="navbar-logo">
          <span>Sumeya</span> Sabit
        </a>

        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>

          <a href="/admin/login" className="navbar-admin">
            Admin
          </a>

          <ThemeToggle />
        </div>

        <button className="navbar-toggle" aria-label="Menu">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

      </div>
    </nav>
  );
}