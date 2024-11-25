import express from 'express';
import { GmailMessage, PaginatedResponse, SingleItemResponse } from '../types';
const router = express.Router();

router.get('/', (req, res) => {
  const testData = req.app.locals.testData;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  const paginatedData = testData.gmail.slice(offset, offset + limit);
  const response: PaginatedResponse<GmailMessage> = {
    data: paginatedData,
    total: testData.gmail.length,
    limit,
    offset,
  };
  res.json(response);
});

router.get('/:id', (req, res) => {
  const testData = req.app.locals.testData;
  const message = testData.gmail.find((m: GmailMessage) => m.id === req.params.id);

  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  const response: SingleItemResponse<GmailMessage> = {
    data: message,
  };
  res.json(response);
});

export default router;
