import { BASE_API_URL } from '../constants';
import { mutate } from 'swr';
import { TEvent } from 'types';

type Status = { message: string };

type TActionResponse = Promise<{ status?: Status }>;

interface TDeleteAction<Response = TActionResponse> {
  (events: TEvent[], id: string): Response;
}

interface TCreateAction<Response = TActionResponse> {
  (events: TEvent[], event: TEvent): Response;
}

export const handleDelete: TDeleteAction = async (events, id) => {
  let status: Status | undefined;

  const filteredEvents = events?.filter(({ email }) => email !== id);

  const makeRequest = async () => {
    const response = await fetch(`${BASE_API_URL}/events/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      status = { message: 'ok' };
      return filteredEvents;
    } else {
      status = { message: `An error ocurred: ${response.statusText}` };
      return null;
    }
  };

  mutate(`${BASE_API_URL}/events`, filteredEvents, false);
  mutate(`${BASE_API_URL}/events`, await makeRequest());

  return { status };
};

export const handleCreate: TCreateAction = async (events, event) => {
  let status: Status | undefined;

  if (!events) {
    status = { message: 'An error ocurred' };

    return { status };
  }

  const newEvents = [...events, event];

  const makeRequest = async () => {
    const response = await fetch(`${BASE_API_URL}/events`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (response.ok) {
      status = { message: 'ok' };
      return newEvents;
    } else {
      status = { message: `An error ocurred: ${response.statusText}` };
      return null;
    }
  };

  mutate(`${BASE_API_URL}/events`, newEvents, false);
  mutate(`${BASE_API_URL}/events`, await makeRequest());

  return { status };
};
