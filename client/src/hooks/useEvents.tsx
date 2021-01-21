import useSWR from 'swr';
import { fetcher } from 'helpers';
import { TEvent } from 'types';
import { BASE_API_URL } from '../constants';

const useEvents = () => {
  const { data = [], error } = useSWR<TEvent[], any>(
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
