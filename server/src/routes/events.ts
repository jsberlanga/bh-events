import { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from '../db/controllers';

const router = Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.get('/:id', getEvent);
router.put('/:id', updateEvent);
router.delete('/:email', deleteEvent);

export default router;
