import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders the DemocracyLens logo text', () => {
    render(<Footer />);
    const logoText = screen.getByText('DemocracyLens');
    expect(logoText).toBeInTheDocument();
  });

  it('renders the educational purpose disclaimer', () => {
    render(<Footer />);
    const disclaimer = screen.getByText(/Built for educational purposes/i);
    expect(disclaimer).toBeInTheDocument();
  });
});
