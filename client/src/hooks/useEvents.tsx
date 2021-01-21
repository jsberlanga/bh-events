import useSWR from 'swr';
import { fetcher } from 'helpers';
import { Event } from 'types';
import { BASE_API_URL } from '../constants';

const useEvents = () => {
  const { data = [], error } = useSWR<Event[], any>(
    `${BASE_API_URL}/events`,
    fetcher,
  );
  return {
    events: data,
    loading: !error && !data,
    error,
  };
};

export { useEvents };
