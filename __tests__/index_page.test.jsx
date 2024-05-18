import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Index page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders without crashing', () => {
    expect(screen.getByText('Welcome to')).toBeInTheDocument();
    expect(screen.getAllByText('AlgoQuiz')).toHaveLength(2); // index page and header component
    expect(screen.getByText('Data Structures and Algorithms')).toBeInTheDocument();
    expect(screen.getByText('Get ready to ace your next technical interview.')).toBeInTheDocument();
    expect(screen.getByText('Learn key concepts and patterns in a fun and interactive way.')).toBeInTheDocument();
  });

  test('renders company logos', () => {
    const companies = [
      "airwallex",
      "amazon",
      "anz",
      "atlassian",
      "canva",
      "citadel",
      "commbank",
      "google",
      "imc",
      "janestreet",
      "meta",
      "optiver",
      "sig",
      "tiktok",
    ];

    companies.forEach(company => {
      expect(screen.getByAltText(`${company} logo`)).toBeInTheDocument();
    });
  });
});