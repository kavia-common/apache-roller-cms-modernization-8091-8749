import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../src/components/ui/Button';

describe('Button', () => {
  it('renders label and handles click', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save</Button>);
    const btn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
