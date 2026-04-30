import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, HelpCircle, MessageSquare } from 'lucide-react';
import './home.css';

export default function Home() {
  const features = [
    {
      title: 'Interactive Timeline',
      description: 'Follow the journey of an election from notification to result declaration step-by-step.',
      icon: <BookOpen className="feature-icon" size={32} />,
      link: '/learn',
      color: 'var(--primary)'
    },
    {
      title: 'Study Flashcards',
      description: 'Quickly grasp key terminology like EVM, VVPAT, and Model Code of Conduct.',
      icon: <Layers className="feature-icon" size={32} />,
      link: '/flashcards',
      color: 'var(--india-saffron)'
    },
    {
      title: 'Test Your Knowledge',
      description: 'Take interactive quizzes to see how much you know about the democratic process.',
      icon: <HelpCircle className="feature-icon" size={32} />,
      link: '/quizzes',
      color: 'var(--india-green)'
    },
    {
      title: 'Election Assistant Chat',
      description: 'Got a specific question? Ask our interactive AI assistant for clear, simple answers.',
      icon: <MessageSquare className="feature-icon" size={32} />,
      link: '/chat',
      color: 'var(--accent)'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content animate-fade-in">
            <div className="badge">Indian Democracy Simplified</div>
            <h1 className="h1">
              Understand the <span className="text-gradient">Power of Your Vote</span>
            </h1>
            <p className="p hero-subtitle">
              An interactive guide to the Indian Election System. Explore timelines, test your knowledge, and ask questions to our intelligent assistant.
            </p>
            <div className="hero-actions">
              <Link href="/learn" className="btn btn-primary btn-lg">
                Start Learning <ArrowRight size={18} />
              </Link>
              <Link href="/chat" className="btn btn-outline btn-lg glass">
                Ask the Assistant
              </Link>
            </div>
          </div>
          
          {/* Abstract Hero Graphic */}
          <div className="hero-graphic animate-fade-in delay-200">
             <div className="circle-bg"></div>
             <div className="glass-card main-card">
               <div className="card-header">
                 <div className="dot red"></div>
                 <div className="dot yellow"></div>
                 <div className="dot green"></div>
               </div>
               <div className="card-body">
                 <div className="line line-1"></div>
                 <div className="line line-2"></div>
                 <div className="line line-3"></div>
                 <div className="button-mockup">Vote</div>
               </div>
             </div>
             <div className="glass-card float-card-1 delay-300">
               EVM Basics
             </div>
             <div className="glass-card float-card-2 delay-100">
               Live Quiz
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features bg-secondary">
        <div className="container">
          <div className="section-header text-center animate-fade-in">
            <h2 className="h2">Everything you need to know</h2>
            <p className="p max-w-2xl mx-auto">
              We break down complex electoral processes into bite-sized, interactive modules.
            </p>
          </div>

          <div className="grid features-grid">
            {features.map((feature, idx) => (
              <Link href={feature.link} key={idx} className={`card feature-card animate-fade-in delay-${(idx + 1) * 100}`}>
                <div className="icon-wrapper" style={{ color: feature.color, backgroundColor: `${feature.color}20` }}>
                  {feature.icon}
                </div>
                <h3 className="h3" style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p className="p" style={{ fontSize: '0.9rem' }}>{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
