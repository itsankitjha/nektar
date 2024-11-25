import express from 'express';
import { GmailMessage, PaginatedResponse } from '../types';

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

router.get('/:email', (req, res) => {
  const testData = req.app.locals.testData;
  const email = req.params.email;
  // Filter messages by the given email
  const filteredMessages = testData.gmail.filter((message: GmailMessage) => {
    const fromHeader = message.payload.headers.find((header) => header.name === 'From');
    return fromHeader && fromHeader.value === email;
  });

  if (filteredMessages.length === 0) {
    return res.status(404).json({ error: 'No messages found for this contact.' });
  }

  const response: PaginatedResponse<GmailMessage> = {
    data: filteredMessages,
    total: filteredMessages.length,
    limit: filteredMessages.length,
    offset: 0,
  };
  res.json(response);
});

export default router;
