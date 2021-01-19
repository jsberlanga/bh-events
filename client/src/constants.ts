export const BASE_API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8888/api'
    : 'https://bh-events.herokuapp.com/api';
