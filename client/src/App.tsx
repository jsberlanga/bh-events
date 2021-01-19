import * as React from 'react';
import { EventList } from './components/EventList';
import styled from 'styled-components';

const AppContainer = styled.div`
  margin: 0 auto;
  width: min(50rem, 100vw);
  padding: 1rem;
`;

function App() {
  return (
    <AppContainer>
      <EventList />
    </AppContainer>
  );
}

export default App;
