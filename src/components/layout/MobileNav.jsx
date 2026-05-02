'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Layers, MessageSquare } from 'lucide-react';
import './mobile-nav.css';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: <Home size={22} /> },
    { name: 'Learn', href: '/learn', icon: <BookOpen size={22} /> },
    { name: 'Flashcards', href: '/flashcards', icon: <Layers size={22} /> },
    { name: 'Chat', href: '/chat', icon: <MessageSquare size={22} /> },
  ];

  return (
    <nav className="mobile-nav glass">
      {navItems.map((item) => (
        <Link 
          key={item.name} 
          href={item.href}
          className={`mobile-nav-item ${pathname === item.href ? 'active' : ''}`}
        >
          <div className="mobile-nav-icon-wrapper">
            {item.icon}
          </div>
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
