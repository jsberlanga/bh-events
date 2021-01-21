import * as React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.div`
  display: block;
  background: #af2d2d;
  color: #fff;
  padding: 10px;
`;

const ErrorMessage: React.FC = ({ children }) => (
  <StyledMessage role="alert">{children}</StyledMessage>
);

export default ErrorMessage;
