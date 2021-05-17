import { render, screen } from '@testing-library/react';
import App from './App';

xtest('renders learn react link', () => { // Este test está siendo skipeado
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
