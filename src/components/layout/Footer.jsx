import Link from 'next/link';
import { Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '3rem 0',
      marginTop: 'auto',
      backgroundColor: 'var(--card)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        textAlign: 'center'
      }}>
        <Link href="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
          <Landmark className="logo-icon" size={24} style={{ color: 'var(--primary)' }}/>
          <span className="logo-text" style={{ fontWeight: 700, fontSize: '1.25rem' }}>DemocracyLens</span>
        </Link>
        <p className="p" style={{ maxWidth: '500px' }}>
          An interactive educational platform designed to simplify and explain the Indian Election System to citizens and students alike.
        </p>
        <div style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} DemocracyLens. Built for educational purposes.
        </div>
      </div>
    </footer>
  );
}
