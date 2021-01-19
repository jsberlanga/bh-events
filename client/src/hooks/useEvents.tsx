import useSWR from 'swr';
import { fetcher } from 'helpers';
import { Event } from 'types';
import { BASE_API_URL } from '../constants';

export function useEvents() {
  const { data, error } = useSWR<Event[], any>(
    `${BASE_API_URL}/events`,
    fetcher,
  );
  return {
    events: data,
    isLoading: !error && !data,
    error,
  };
}
