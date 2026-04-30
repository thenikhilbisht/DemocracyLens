'use client';

import { useState } from 'react';
import { flashcardData } from '@/data/election';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import './flashcards.css';

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcardData.length);
    }, 150); // wait for flip animation to reset
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + flashcardData.length) % flashcardData.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = flashcardData[currentIndex];

  return (
    <div className="flashcards-page container">
      <div className="page-header text-center animate-fade-in">
        <h1 className="h1">Election Vocabulary</h1>
        <p className="p max-w-2xl mx-auto">
          Master the key terms of the Indian Election System. Click the card to flip it.
        </p>
      </div>

      <div className="flashcard-container animate-fade-in delay-100">
        <div className="flashcard-progress">
          Card {currentIndex + 1} of {flashcardData.length}
        </div>

        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flashcard-inner">
            {/* Front */}
            <div className="flashcard-front card glass">
              <h2 className="h2 text-gradient">{currentCard.front}</h2>
              <div className="flip-hint">
                <RotateCw size={16} /> Click to flip
              </div>
            </div>

            {/* Back */}
            <div className="flashcard-back card glass" style={{ borderColor: 'var(--primary)' }}>
              <h3 className="h3 mb-2">{currentCard.front}</h3>
              <p className="p" style={{ color: 'var(--foreground)', fontSize: '1.1rem' }}>
                {currentCard.back}
              </p>
            </div>
          </div>
        </div>

        <div className="flashcard-controls">
          <button className="btn btn-outline glass" onClick={handlePrev}>
            <ChevronLeft size={20} /> Previous
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
