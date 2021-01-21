import { handleCreate } from 'helpers/actions';
import * as faker from 'faker';
import { useState } from 'react';
import { Event, Maybe } from 'types';
import { format } from 'date-fns';

interface TAction {
  loading: boolean;
  error?: Maybe<string>;
}

// Sets state with some dummy data
const getInitialState = () => ({
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
  email: faker.internet.email(),
  date: format(faker.date.future(), 'yyyy-MM-dd'),
});

const useForm = (events: Event[]) => {
  const [event, setEvent] = useState(getInitialState());

  const [action, setAction] = useState<TAction>({
    loading: false,
    error: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
  ) => {
    setAction({ error: null, loading: false });
    setEvent({ ...event, [key]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEvent(getInitialState());
    setAction({ error: null, loading: true });

    const { status } = await handleCreate(events, event);
    setAction({ ...action, loading: false });

    if (status?.message !== 'ok') {
      setAction({ ...action, error: status?.message });
    }
  };

  return { event, action, handleChange, handleSubmit };
};

export { useForm };
