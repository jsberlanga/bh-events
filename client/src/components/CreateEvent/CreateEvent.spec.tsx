import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateEvent from './CreateEvent';

const mockEvent = {
  name: 'test_name',
  lastname: 'test_lastname',
  email: 'test@example.com',
  date: '2020/01/01',
};

describe('CreateEvent', () => {
  it('should render with styles', () => {
    const { container } = render(<CreateEvent />);

    expect(container).toMatchSnapshot();
  });

  it('should render form correctly', () => {
    render(<CreateEvent />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Lastname')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });

  it('should display an error message if form data is incomplete', async () => {
    render(<CreateEvent />);

    const createButton = screen.getByRole('button');

    userEvent.click(createButton);

    await waitFor(() => {
      expect(
        screen.getByText('An error ocurred: Conflict'),
      ).toBeInTheDocument();
    });
  });

  it('should handle change event', async () => {
    render(<CreateEvent />);

    userEvent.type(screen.getByLabelText('Name'), mockEvent.name);
    userEvent.type(screen.getByLabelText('Lastname'), mockEvent.lastname);
    userEvent.type(screen.getByLabelText('Email'), mockEvent.email);

    expect(screen.getByLabelText('Name').getAttribute('value')).toBe(
      mockEvent.name,
    );
    expect(screen.getByLabelText('Lastname').getAttribute('value')).toBe(
      mockEvent.lastname,
    );
    expect(screen.getByLabelText('Email').getAttribute('value')).toBe(
      mockEvent.email,
    );
  });

  it('should display an in progress indication when submitting the form', async () => {
    render(<CreateEvent />);

    userEvent.type(screen.getByLabelText('Name'), mockEvent.name);
    userEvent.type(screen.getByLabelText('Lastname'), mockEvent.lastname);
    userEvent.type(screen.getByLabelText('Email'), mockEvent.email);

    expect(screen.getByLabelText('Name').getAttribute('value')).toBe(
      mockEvent.name,
    );
    expect(screen.getByLabelText('Lastname').getAttribute('value')).toBe(
      mockEvent.lastname,
    );
    expect(screen.getByLabelText('Email').getAttribute('value')).toBe(
      mockEvent.email,
    );
    const createButton = screen.getByRole('button');

    userEvent.click(createButton);

    expect(screen.getByRole('button').getAttribute('value')).toBe('creating');

    await waitFor(() => {
      expect(screen.getByRole('button').getAttribute('value')).toBe('create');
    });

    expect(screen.getByLabelText('Name').getAttribute('value')).toBe('');
    expect(screen.getByLabelText('Lastname').getAttribute('value')).toBe('');
    expect(screen.getByLabelText('Email').getAttribute('value')).toBe('');
  });
});
