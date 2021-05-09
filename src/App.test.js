import { render, screen } from '@testing-library/react';
import App from './App';

test('renders class component', () => {
  render(<App />);
  const classComponent = screen.getByText(/Class Component/i);
  expect(classComponent).toBeInTheDocument();
});
test('renders hook component', () => {
  render(<App />);
  const hookComponent = screen.getByText(/Hooks/i);
  expect(hookComponent).toBeInTheDocument();
});
