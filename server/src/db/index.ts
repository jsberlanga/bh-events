import mongoose from 'mongoose';

const {
  MONGODB_URI = 'MONGODB_URI environment variable not found',
} = process.env;

export async function connectToDatabase(): Promise<{
  client: typeof mongoose;
}> {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  const client = await mongoose.connect(MONGODB_URI, options);

  return {
    client,
  };
}
