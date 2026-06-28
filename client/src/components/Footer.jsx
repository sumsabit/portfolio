import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Sumeya. Built with React, NestJS, and <span className="heart">❤️</span>
        </p>
        <p className="footer-tagline">
          Computer Science Graduate | Web Penetration Tester | Full‑Stack Developer
        </p>
      </div>
    </footer>
  );
}