import { render, screen } from '@testing-library/react';
import TextInput from '../src/components/ui/TextInput';

describe('TextInput', () => {
  it('associates label with input', () => {
    render(<TextInput label="Username" value="" onChange={() => {}} />);
    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
  });
});
