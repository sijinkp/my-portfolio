import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="mono">Built with React & Vite · No trackers</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
