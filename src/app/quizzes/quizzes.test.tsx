import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quizzes from './page';
import { quizData } from '@/data/election';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  CheckCircle2: () => <div data-testid="check-icon" />,
  XCircle: () => <div data-testid="x-icon" />,
  ArrowRight: () => <div data-testid="arrow-icon" />,
  RotateCcw: () => <div data-testid="rotate-icon" />,
}));

describe('Quizzes Component', () => {
  it('renders the first question initially', () => {
    render(<Quizzes />);
    expect(screen.getByText(quizData[0].question)).toBeInTheDocument();
    expect(screen.getByText('Question 1 of ' + quizData.length)).toBeInTheDocument();
  });

  it('shows explanation and next button after an option is selected', async () => {
    render(<Quizzes />);
    const firstOption = screen.getByText(quizData[0].options[0]);
    fireEvent.click(firstOption);

    expect(screen.getByText(/Explanation:/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Question/i)).toBeInTheDocument();
  });

  it('updates score correctly when correct answer is selected', () => {
    render(<Quizzes />);
    const question = quizData[0];
    const correctOption = screen.getByText(question.options[question.correctAnswer]);
    
    fireEvent.click(correctOption);
    expect(screen.getByText(/Score: 1/i)).toBeInTheDocument();
  });

  it('completes the quiz and shows results', async () => {
    render(<Quizzes />);
    
    // Iterate through all questions
    for (let i = 0; i < quizData.length; i++) {
      const question = quizData[i];
      const option = screen.getByText(question.options[0]);
      fireEvent.click(option);
      
      const nextBtn = screen.getByText(i === quizData.length - 1 ? /See Results/i : /Next Question/i);
      fireEvent.click(nextBtn);
    }

    expect(screen.getByText(/Quiz Completed!/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
  });
});
