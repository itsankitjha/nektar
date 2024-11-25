import express from 'express';
import { CalendarEvent, PaginatedResponse, SingleItemResponse } from '../types';
const router = express.Router();

router.get('/', (req, res) => {
  const testData = req.app.locals.testData;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  const paginatedData = testData.gcal.slice(offset, offset + limit);
  const response: PaginatedResponse<CalendarEvent> = {
    data: paginatedData,
    total: testData.gcal.length,
    limit,
    offset,
  };
  res.json(response);
});

router.get('/:id', (req, res) => {
  const testData = req.app.locals.testData;
  const event = testData.gcal.find((e: CalendarEvent) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const response: SingleItemResponse<CalendarEvent> = {
    data: event,
  };
  res.json(response);
});

export default router;
