import app from '../app';
import request from 'supertest';
import { Event } from '../db/models';
import { mockEvent } from './__mocks__';

describe('GET /api', () => {
  it('brainhub api request', async () => {
    const result = await request(app).get('/api');

    expect(result.text).toEqual('<h1>welcome to brainhub api</h1>');
    expect(result.status).toEqual(200);
  });
});

// CREATES EVENT
describe('POST /api/events', () => {
  it('creates an event successfully', async () => {
    const result = await request(app).post('/api/events').send(mockEvent);

    expect(result.status).toEqual(201);
  });

  it('does not create an event if email already found', async () => {
    const result = await request(app).post('/api/events').send(mockEvent);

    expect(result.text).toEqual(
      '{"message":"E11000 duplicate key error collection: brainhub.events index: email_1 dup key: { email: \\"supertest@test.com\\" }"}',
    );
    expect(result.status).toEqual(409);
  });
});

// QUERIES EVENT
describe('GET /api/events', () => {
  it('brainhub api request', async () => {
    const result = await request(app).get('/api/events');

    expect(result.body).toEqual(
      expect.arrayContaining([expect.objectContaining(mockEvent)]),
    );
    expect(result.status).toEqual(200);
  });
});

// UPDATES EVENT
describe('PUT /api/events/:id', () => {
  it('updates the mockEvent api request', async () => {
    const { _id, lastname, email, date } = await Event.findOne({
      email: mockEvent.email,
    });

    const updatedEvent = {
      name: 'updated_name',
      lastname,
      email,
      date,
    };

    const result = await Event.findByIdAndUpdate(_id, updatedEvent, {
      new: true,
    });

    expect(result.name).toEqual('updated_name');
  });
});

// DELETES EVENT
describe('DELETE /api/events/:id', () => {
  it('deletes the mock event', async () => {
    const { _id } = await Event.findOne({ email: mockEvent.email });

    const result = await request(app).delete(`/api/events/${_id}`);

    expect(result.body).toEqual({ message: 'Event deleted successfully.' });
    expect(result.status).toEqual(200);
  });

  it('returns 404 if no event found', async () => {
    const _id = 'invalid_id';

    const result = await request(app).delete(`/api/events/${_id}`);

    expect(result.status).toEqual(404);
  });
});
