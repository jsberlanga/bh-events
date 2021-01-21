import { render, screen } from '@testing-library/react';
import EventList from './EventList';

jest.mock('hooks', () => ({
  useEvents: () => ({
    events: [
      {
        name: 'test_name',
        lastname: 'test_lastname',
        email: 'test@example.com',
        date: '2020/01/01',
      },
    ],
  }),
}));

describe('EventList', () => {
  it('should render with styles', () => {
    const { container } = render(<EventList />);

    expect(container).toMatchSnapshot();
  });

  it('should render events correctly', () => {
    render(<EventList />);

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('test_name')).toBeInTheDocument();
    expect(screen.getByText('Lastname:')).toBeInTheDocument();
    expect(screen.getByText('test_lastname')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Date:')).toBeInTheDocument();
    expect(screen.getByText('01/01/2020')).toBeInTheDocument();
  });
});
