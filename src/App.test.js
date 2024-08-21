import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Login link', () => {
  render(<App />);
  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
});

test('renders Home link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Expenses link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Expenses/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders LogOut link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/LogOut/i);
  expect(linkElement).toBeInTheDocument();
});

