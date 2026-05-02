import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, HelpCircle, MessageSquare } from 'lucide-react';

export default function Home() {
  const features = [
    {
      title: 'Interactive Timeline',
      description: 'Follow the journey of an election from notification to result declaration step-by-step.',
      icon: <BookOpen size={32} />,
      link: '/learn',
      color: 'var(--primary)'
    },
    {
      title: 'Study Flashcards',
      description: 'Quickly grasp key terminology like EVM, VVPAT, and Model Code of Conduct.',
      icon: <Layers size={32} />,
      link: '/flashcards',
      color: 'var(--india-saffron)'
    },
    {
      title: 'Test Your Knowledge',
      description: 'Take interactive quizzes to see how much you know about the democratic process.',
      icon: <HelpCircle size={32} />,
      link: '/quizzes',
      color: 'var(--india-green)'
    },
    {
      title: 'Election Assistant Chat',
      description: 'Got a specific question? Ask our interactive AI assistant for clear, simple answers.',
      icon: <MessageSquare size={32} />,
      link: '/chat',
      color: 'var(--accent)'
    }
  ];

  return (
    <div className="pb-16 flex flex-col gap-20">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-28 min-h-[70vh] flex items-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-100px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[var(--india-saffron)] blur-[120px] opacity-10 -z-10" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[var(--primary)] blur-[120px] opacity-10 -z-10" />

        <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="animate-fade-in text-center lg:text-left z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--secondary)] text-[var(--primary)] text-sm font-semibold mb-8 border border-[var(--border)]">
              Indian Democracy Simplified
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Understand the <span className="text-gradient">Power of Your Vote</span>
            </h1>
            <p className="text-lg lg:text-xl text-[var(--muted-foreground)] mb-10 max-w-[550px] mx-auto lg:mx-0 leading-relaxed">
              An interactive guide to the Indian Election System. Explore timelines, test your knowledge, and ask questions to our intelligent assistant.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="/learn" className="btn btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                Start Learning <ArrowRight size={18} />
              </Link>
              <Link href="/chat" className="btn btn-outline glass px-8 py-4 text-lg w-full sm:w-auto">
                Ask the Assistant
              </Link>
            </div>
          </div>
          
          {/* Hero Graphic */}
          <div className="relative h-[300px] lg:h-[400px] flex items-center justify-center animate-fade-in delay-200 mt-8 lg:mt-0">
             <div className="absolute w-[250px] lg:w-[300px] h-[250px] lg:h-[300px] rounded-full bg-gradient-to-br from-[var(--india-saffron)] via-[var(--primary)] to-[var(--india-green)] opacity-20 blur-[50px] animate-pulse" />
             
             {/* Main Card Mockup */}
             <div className="relative w-[240px] lg:w-[280px] h-[300px] lg:h-[350px] bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-2xl z-10 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-[var(--border)] flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="h-3 w-full bg-[var(--secondary)] rounded-full" />
                  <div className="h-3 w-4/5 bg-[var(--secondary)] rounded-full" />
                  <div className="h-3 w-3/5 bg-[var(--secondary)] rounded-full" />
                  <div className="mt-auto p-3 rounded-lg bg-[var(--primary)] text-white text-center font-bold text-sm">
                    Vote
                  </div>
                </div>
             </div>

             {/* Floating elements */}
             <div className="absolute -top-[5%] -right-[5%] bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] rounded-2xl p-4 lg:p-6 font-bold text-sm lg:text-base shadow-xl z-20 animate-bounce">
               EVM Basics
             </div>
             <div className="absolute -bottom-[5%] -left-[5%] bg-[var(--card)]/80 backdrop-blur-xl border border-[var(--border)] rounded-2xl p-4 lg:p-6 font-bold text-sm lg:text-base shadow-xl z-20 animate-bounce delay-100">
               Live Quiz
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[var(--background)]">
        <div className="container">
          <div className="mb-16 text-center animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Everything you need to know</h2>
            <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              We break down complex electoral processes into bite-sized, interactive modules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <Link 
                href={feature.link} 
                key={idx} 
                className="card flex flex-col items-start no-underline animate-fade-in group hover:border-[var(--primary)] transition-all active:scale-[0.98]" 
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-active:scale-90" style={{ color: feature.color, backgroundColor: `${feature.color}20` }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
