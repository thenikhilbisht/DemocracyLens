'use client';

import { useState, useRef, useEffect } from 'react';
import { quizData } from '@/data/election';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function Quizzes() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const questionRef = useRef<HTMLHeadingElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const question = quizData[currentQuestionIdx];

  // Accessibility: Focus the question when it changes
  useEffect(() => {
    if (questionRef.current && !isFinished) {
      questionRef.current.focus();
    }
  }, [currentQuestionIdx, isFinished]);

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Accessibility: Move focus to the next button after answering
    setTimeout(() => {
      nextBtnRef.current?.focus();
    }, 100);
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizData.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="container min-h-[80vh] flex items-center justify-center py-16">
        <div className="card glass text-center p-12 max-w-[500px] w-full animate-fade-in" role="alert">
          <h2 className="text-4xl font-bold text-gradient mb-6">Quiz Completed!</h2>
          <div className="text-6xl font-bold text-[var(--primary)] mb-6">
            {score} <span className="text-2xl text-[var(--muted-foreground)]">/ {quizData.length}</span>
          </div>
          <p className="text-[var(--muted-foreground)] mb-8">
            {score === quizData.length ? 'Perfect score! You are an election expert.' : 
             score > quizData.length / 2 ? 'Great job! You know your stuff.' : 
             'Good attempt! Review the flashcards to learn more.'}
          </p>
          <button className="btn btn-primary btn-lg px-8 py-4 text-lg" onClick={handleRestart}>
            <RotateCcw size={20} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 lg:py-24 max-w-3xl mx-auto min-h-screen flex flex-col gap-12">
      <header className="text-center animate-fade-in mt-4 lg:mt-8">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">Test Your Knowledge</h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          See how well you understand the Indian democratic process.
        </p>
      </header>

      <div className="animate-fade-in delay-100 flex-1">
        <div className="w-full h-2 bg-[var(--border)] rounded-full mb-10 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[var(--india-saffron)] to-[var(--india-green)] transition-all duration-500 ease-out" 
            style={{ width: `${(currentQuestionIdx / quizData.length) * 100}%` }}
            role="progressbar"
            aria-valuenow={(currentQuestionIdx / quizData.length) * 100}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        </div>

        <div className="flex justify-between items-center mb-8 px-2">
          <span className="text-xs lg:text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-widest">
            Question {currentQuestionIdx + 1} of {quizData.length}
          </span>
          <span className="bg-[var(--primary)] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-md" aria-live="polite">
            Score: {score}
          </span>
        </div>

        <div className="card glass p-8 lg:p-12 relative shadow-2xl border border-white/10">
          <h3 
            ref={questionRef} 
            tabIndex={-1} 
            className="text-2xl lg:text-3xl font-bold mb-10 outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-4 rounded-xl leading-tight"
          >
            {question.question}
          </h3>
          
          <div className="grid gap-4 lg:gap-6" role="radiogroup">
            {question.options.map((option, index) => {
              let classes = "flex justify-between items-center p-5 lg:p-6 border border-[var(--border)] rounded-2xl font-bold transition-all text-left w-full shadow-sm";
              let Icon = null;
              
              if (isAnswered) {
                if (index === question.correctAnswer) {
                  classes += " bg-green-500/20 border-green-500 text-green-500 ring-2 ring-green-500/20";
                  Icon = <CheckCircle2 size={24} />;
                } else if (index === selectedOption) {
                  classes += " bg-red-500/20 border-red-500 text-red-500 ring-2 ring-red-500/20";
                  Icon = <XCircle size={24} />;
                } else {
                  classes += " opacity-40 grayscale-[50%]";
                }
              } else {
                classes += " hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 hover:shadow-lg active:scale-[0.98] cursor-pointer";
              }

              return (
                <button 
                  key={index} 
                  className={classes}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                  aria-pressed={selectedOption === index}
                >
                  <span className="text-lg">{option}</span>
                  {Icon}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="mt-10 p-6 lg:p-8 bg-[var(--secondary)] rounded-2xl border-l-8 border-[var(--primary)] animate-fade-in shadow-inner" aria-live="assertive">
              <strong className="block mb-2 text-[var(--primary)] text-sm uppercase tracking-wider">Detailed Explanation</strong> 
              <p className="text-[var(--foreground)] text-lg leading-relaxed">{question.explanation}</p>
            </div>
          )}

          {isAnswered && (
            <div className="mt-10 flex justify-end animate-fade-in">
              <button 
                ref={nextBtnRef}
                className="btn btn-primary px-8 py-4 flex items-center gap-3 group text-lg" 
                onClick={handleNext}
              >
                {currentQuestionIdx === quizData.length - 1 ? 'See Results' : 'Next Question'} 
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
