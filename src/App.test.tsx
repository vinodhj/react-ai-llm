import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Workers AI LLM Playground heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Workers AI LLM Playground ✨/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders input box and buttons', () => {
  render(<App />);

  // Check for input box placeholder
  const inputElement = screen.getByPlaceholderText(/Ask AI LLM Anything.../i);
  expect(inputElement).toBeInTheDocument();

  // Check for Ask button
  const askButton = screen.getByText(/Ask/i);
  expect(askButton).toBeInTheDocument();

  // Check for Run button
  const runButton = screen.getByText(/Run ✨/i);
  expect(runButton).toBeInTheDocument();
});

test('allows user to add and delete messages', () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/Ask AI LLM Anything.../i);
  const askButton = screen.getByText(/Ask/i);

  // Simulate typing in input box
  fireEvent.change(inputElement, { target: { value: 'Hello AI' } });

  // Simulate clicking the Ask button
  fireEvent.click(askButton);

  // Check if the message is added
  const addedMessage = screen.getByText(/Hello AI/i);
  expect(addedMessage).toBeInTheDocument();

  // Simulate clicking the Delete button
  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);

  // Check if the message is deleted
  expect(addedMessage).not.toBeInTheDocument();
});
