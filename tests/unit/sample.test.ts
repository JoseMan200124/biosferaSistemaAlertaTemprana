import { render, screen } from '@testing-library/react';
import React from 'react';

function Hello() {
  return <div>Hello</div>;
}

test('renders', () => {
  render(<Hello />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
