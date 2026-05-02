'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, HelpCircle, Layers, MessageSquare, Menu, X, Landmark, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import './navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Check initial theme
    const savedTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(savedTheme);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = [
    { name: 'Learn', href: '/learn', icon: <BookOpen size={18} /> },
    { name: 'Flashcards', href: '/flashcards', icon: <Layers size={18} /> },
    { name: 'Quizzes', href: '/quizzes', icon: <HelpCircle size={18} /> },
    { name: 'Chat', href: '/chat', icon: <MessageSquare size={18} /> },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container navbar-container">
        <Link href="/" className="logo-container">
          <Landmark className="logo-icon" size={28} />
          <span className="logo-text text-gradient">Democracy<span className="text-[var(--foreground)]">Lens</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            className="theme-toggle p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu glass animate-fade-in mobile-only">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
