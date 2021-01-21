import { ErrorMessage } from 'components/ErrorMessage';
import { useCreateForm, useEvents } from 'hooks';
import * as React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 15rem;
  margin-bottom: 1rem;
  padding: 14px;
`;

const Label = styled.label`
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
`;

const InputField = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 6px;
  font-size: 1rem;
`;

const CreateEvent = () => {
  const { events } = useEvents();
  const { event, actionState, handleChange, handleSubmit } = useCreateForm(
    events,
  );

  return (
    <React.Fragment>
      <h2>Create a new event</h2>
      <Form onSubmit={handleSubmit} className="withBorder">
        <Label htmlFor="name">
          Name
          <InputField
            className="withBorder"
            id="name"
            type="text"
            required
            value={event.name}
            onChange={(e) => handleChange(e, 'name')}
          />
        </Label>
        <Label htmlFor="lastname">
          Lastname
          <InputField
            className="withBorder"
            id="lastname"
            type="text"
            required
            value={event.lastname}
            onChange={(e) => handleChange(e, 'lastname')}
          />
        </Label>
        <Label htmlFor="email">
          Email
          <InputField
            className="withBorder"
            id="email"
            type="email"
            required
            value={event.email}
            onChange={(e) => handleChange(e, 'email')}
          />
        </Label>
        <Label htmlFor="date">
          Date
          <InputField
            className="withBorder"
            id="date"
            type="date"
            required
            value={event.date}
            onChange={(e) => handleChange(e, 'date')}
          />
        </Label>
        <InputField
          type="submit"
          value={`creat${actionState.loading ? 'ing' : 'e'}`}
          className="btn btn--submit"
        />
      </Form>
      {actionState.error ? (
        <ErrorMessage>{actionState.error}</ErrorMessage>
      ) : null}
    </React.Fragment>
  );
};

export default CreateEvent;
