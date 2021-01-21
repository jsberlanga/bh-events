export const globalStyles = `
  body {
    font-family: Inter, 'sans-serif';
    background-color: #fafafa;
    color: #222831;
    line-height: 1.5rem;
  }

  input, button {
    font-family: Inter, 'sans-serif';
  }

  .btn {
    padding: 10px;
    width: 100%;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &--submit {
      background: #007965;
    }

    &--delete {
      background: #af2d2d;
    }
  }

  .withBorder {
    border: 1px solid #9ba4b4;
    border-radius: 4px;
  }

  .error {
    background: #af2d2d;
    color: #fff;
    padding: 10px;
  }

  hr {
    border-top: 1px solid #9ba4b4;
  }
`;
