import app from './app';

const { PORT = 4000 } = process.env;

app
  .listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`);
  })
  .on('error', (err) => console.error(err));
