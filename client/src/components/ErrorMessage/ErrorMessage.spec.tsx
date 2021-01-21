import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('CreateEvent', () => {
  it('should render with styles correctly', () => {
    const { container } = render(<ErrorMessage>An error ocurred</ErrorMessage>);

    expect(container).toMatchSnapshot();
  });

  it('should have the "alert" role', () => {
    render(<ErrorMessage>An error ocurred</ErrorMessage>);

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
