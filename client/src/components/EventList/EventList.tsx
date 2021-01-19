import * as React from 'react';
import styled from 'styled-components';
import { useEvents } from 'hooks';
import { formatDate } from 'helpers';

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

const ListItem = styled.li`
  margin-right: 1rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid;

  div:last-of-type {
    margin-bottom: 1rem;
  }

  button {
    margin-right: 1rem;
  }
`;

const EventList = () => {
  const { events, isLoading, error } = useEvents();

  if (isLoading) return <div>loading...</div>;
  if (error || !events) return <div>An error ocurred</div>;

  return (
    <React.Fragment>
      <h2>List of all the events</h2>
      <List>
        {events.map((event) => {
          return (
            <ListItem key={event._id}>
              <div>
                <strong>Name:</strong> {event.name}
              </div>
              <div>
                <strong>Lastname:</strong> {event.lastname}
              </div>
              <div>
                <strong>Email:</strong> {event.email}
              </div>
              <div>
                <strong>Date:</strong> {formatDate(event.date)}
              </div>
              <button>edit</button>
              <button>delete</button>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default EventList;
