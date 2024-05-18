import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

describe('Header', () => {
  test('renders Header component', () => {
    render(<Header showBackground={false} />);

    expect(screen.getByText('AlgoQuiz')).toBeInTheDocument();
    expect(screen.getAllByText('PRACTICE')).toHaveLength(2); // header and header overlay
    expect(screen.getAllByText('ACCOUNT')).toHaveLength(2); // header and header overlay

    const logo = screen.getByAltText('Algoquiz Logo');
    expect(logo).toBeInTheDocument();
  });
});