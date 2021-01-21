import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders with styles', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
