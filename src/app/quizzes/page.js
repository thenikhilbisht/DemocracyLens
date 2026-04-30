'use client';

import { useState } from 'react';
import { quizData } from '@/data/election';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import './quizzes.css';

export default function Quizzes() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = quizData[currentQuestionIdx];

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizData.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
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
      <div className="quizzes-page container flex-center" style={{ minHeight: '80vh' }}>
        <div className="card glass text-center result-card animate-fade-in">
          <h2 className="h1 text-gradient">Quiz Completed!</h2>
          <div className="score-display">
            <span className="score">{score}</span>
            <span className="out-of">/ {quizData.length}</span>
          </div>
          <p className="p" style={{ marginBottom: '2rem' }}>
            {score === quizData.length ? 'Perfect score! You are an election expert.' : 
             score > quizData.length / 2 ? 'Great job! You know your stuff.' : 
             'Good attempt! Review the flashcards to learn more.'}
          </p>
          <button className="btn btn-primary btn-lg" onClick={handleRestart}>
            <RotateCcw size={20} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quizzes-page container">
      <div className="page-header text-center animate-fade-in">
        <h1 className="h1">Test Your Knowledge</h1>
        <p className="p max-w-2xl mx-auto">
          See how well you understand the Indian democratic process.
        </p>
      </div>

      <div className="quiz-container animate-fade-in delay-100">
        <div className="quiz-progress-bar">
          <div 
            className="quiz-progress-fill" 
            style={{ width: `${((currentQuestionIdx) / quizData.length) * 100}%` }}
          ></div>
        </div>
        <div className="quiz-header">
          <span className="question-count">Question {currentQuestionIdx + 1} of {quizData.length}</span>
          <span className="score-badge">Score: {score}</span>
        </div>

        <div className="card glass question-card">
          <h3 className="h3 question-text">{question.question}</h3>
          
          <div className="options-grid">
            {question.options.map((option, index) => {
              let btnClass = 'option-btn';
              let Icon = null;
              
              if (isAnswered) {
                if (index === question.correctAnswer) {
                  btnClass += ' correct';
                  Icon = <CheckCircle2 size={20} />;
                } else if (index === selectedOption) {
                  btnClass += ' incorrect';
                  Icon = <XCircle size={20} />;
                } else {
                  btnClass += ' disabled';
                }
              }

              return (
                <button 
                  key={index} 
                  className={btnClass}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                >
                  <span className="option-text">{option}</span>
                  {Icon}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="explanation-box animate-fade-in">
              <strong>Explanation:</strong> {question.explanation}
            </div>
          )}

          {isAnswered && (
            <div className="quiz-actions animate-fade-in">
              <button className="btn btn-primary" onClick={handleNext}>
                {currentQuestionIdx === quizData.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
