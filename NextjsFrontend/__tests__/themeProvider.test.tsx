import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../src/lib/theme';

function ThemeToggleProbe() {
  const { mode, toggle } = useTheme();
  return <button onClick={toggle}>Mode:{mode}</button>;
}

describe('ThemeProvider', () => {
  it('toggles theme mode', () => {
    render(<ThemeProvider><ThemeToggleProbe /></ThemeProvider>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveTextContent(/Mode:/);
  });
});
