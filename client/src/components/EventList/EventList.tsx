import * as React from 'react';
import styled from 'styled-components';
import { formatDate } from 'helpers';
import { handleDelete } from 'helpers/actions';
import { useEvents } from 'hooks';
import { ErrorMessage } from 'components/ErrorMessage';
import { Loading } from 'components/Loading';

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 33%);
  }
`;

const ListItem = styled.li`
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div:last-of-type {
    margin-bottom: 1rem;
  }

  button {
    margin-right: 1rem;
  }
`;

const EventList = () => {
  const { events, loading, error } = useEvents();

  if (error) {
    return (
      <ErrorMessage>An error ocurred. Please reload the page.</ErrorMessage>
    );
  }

  return (
    <React.Fragment>
      <h2>List with all recorded events</h2>
      {loading ? (
        <Loading />
      ) : (
        <List>
          {events.length === 0
            ? 'There are no events yet.'
            : events.map(({ email, name, lastname, date }) => {
                return (
                  <ListItem key={email} className="withBorder">
                    <div>
                      <div>
                        <strong>Name:</strong> {name}
                      </div>
                      <div>
                        <strong>Lastname:</strong> {lastname}
                      </div>
                      <div>
                        <strong>Email:</strong> {email}
                      </div>
                      <div>
                        <strong>Date:</strong> {formatDate(date)}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDelete(events, email)}
                        className="btn btn--delete"
                      >
                        delete event
                      </button>
                    </div>
                  </ListItem>
                );
              })}
        </List>
      )}
    </React.Fragment>
  );
};

export default EventList;
