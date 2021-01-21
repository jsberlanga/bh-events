import { render } from '@testing-library/react';
import Loading from './Loading';

describe('CreateEvent', () => {
  it('should render with styles correctly', () => {
    const { container } = render(<Loading />);

    expect(container).toMatchSnapshot();
  });
});
