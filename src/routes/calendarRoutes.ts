import express from 'express';
import { CalendarEvent, PaginatedResponse } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  const testData = req.app.locals.testData;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;
  const sort = (req.query.sort as string) || 'start.dateTime';

  const sortedData = [...testData.gcal].sort((a, b) => {
    if (sort === 'start.dateTime') {
      return new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime();
    }
    return 0; // Default case if sort field is not recognized
  });

  const paginatedData = sortedData.slice(offset, offset + limit);
  const response: PaginatedResponse<CalendarEvent> = {
    data: paginatedData,
    total: sortedData.length,
    limit,
    offset,
  };
  res.json(response);
});

router.get('/:email', (req, res) => {
  const testData = req.app.locals.testData;
  const email = req.params.email;

  // Filter events by the given email
  const filteredEvents = testData.gcal.filter((event: CalendarEvent) => {
    return (
      event.creator?.email === email ||
      event.attendees?.some((attendee) => attendee.email === email)
    );
  });

  if (filteredEvents.length === 0) {
    return res.status(404).json({ error: 'No events found for this contact.' });
  }

  const response: PaginatedResponse<CalendarEvent> = {
    data: filteredEvents,
    total: filteredEvents.length,
    limit: filteredEvents.length,
    offset: 0,
  };
  res.json(response);
});

export default router;
