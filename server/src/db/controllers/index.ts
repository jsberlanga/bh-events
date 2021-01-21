import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Event } from '../models';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

export const getEvents = async (_req: RequestWithBody, res: Response) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEvent = async (req: RequestWithBody, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req: RequestWithBody, res: Response) => {
  console.log(req.body);
  const { name, lastname, email, date } = req.body;

  const newEvent = new Event({
    name,
    lastname,
    email,
    date,
  });

  try {
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEvent = async (req: RequestWithBody, res: Response) => {
  const { id } = req.params;
  const { name, lastname, email, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Event with id: ${id}`);
  }

  const updatedEvent = { name, lastname, email, date, _id: id };

  await Event.findByIdAndUpdate(id, updatedEvent, { new: true });

  res.json(updatedEvent);
};

export const deleteEvent = async (req: RequestWithBody, res: Response) => {
  const { email } = req.params;

  await Event.findOneAndRemove({ email });

  res.json({ message: 'Event deleted successfully.' });
};
