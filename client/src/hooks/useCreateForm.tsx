import { handleCreate } from 'helpers/actions';
import { useCallback, useReducer, useState } from 'react';
import { TEvent, Maybe } from 'types';
import { format } from 'date-fns';

const initialEventState = () => ({
  name: '',
  lastname: '',
  email: '',
  date: format(Date.now(), 'yyyy-MM-dd'),
});

type ActionState = {
  loading: boolean;
  error?: Maybe<string>;
};

type ActionDispatch =
  | { type: 'INITIAL' }
  | { type: 'IN_PROGRESS' }
  | { type: 'ERROR'; payload: { error?: Maybe<string> } };

const actionReducer = (state: ActionState, action: ActionDispatch) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        loading: false,
        error: null,
      };
    case 'IN_PROGRESS':
      return {
        ...state,
        loading: true,
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
};

const initialActionState = {
  loading: false,
  error: null,
};

const useCreateForm = (events: TEvent[]) => {
  const [event, setEvent] = useState(initialEventState());
  const [actionState, dispatchAction] = useReducer(
    actionReducer,
    initialActionState,
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
      dispatchAction({ type: 'INITIAL' });
      setEvent({ ...event, [key]: e.target.value });
    },
    [event],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setEvent(initialEventState());
      dispatchAction({ type: 'IN_PROGRESS' });

      const { status } = await handleCreate(events, event);

      if (status?.message !== 'ok') {
        dispatchAction({ type: 'ERROR', payload: { error: status?.message } });
      } else {
        dispatchAction({ type: 'INITIAL' });
      }
    },
    [event, events],
  );

  return { event, actionState, handleChange, handleSubmit };
};

export { useCreateForm };
