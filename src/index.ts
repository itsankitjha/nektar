import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import gmailRoutes from './routes/gmailRoutes';
import calendarRoutes from './routes/calendarRoutes';
import contactRoutes from './routes/contactRoutes';
import { GmailMessage, CalendarEvent } from './types';

const app = express();
const PORT = process.env.PORT || 3000;

// Get test case number from command line args
const testCaseNumber = parseInt(process.argv[2], 10) || 1;

// Load test case data
const testCasePath = path.join(__dirname, `tests/${testCaseNumber}.json`);

try {
  if (!fs.existsSync(testCasePath)) {
    console.error(`Test case file ${testCasePath} not found`);
    process.exit(1);
  }

  // Read and parse test data
  const testData: { gmail: GmailMessage[]; gcal: CalendarEvent[] } = JSON.parse(
    fs.readFileSync(testCasePath, 'utf-8')
  );

  // Make test data available to routes
  app.locals.testData = testData;
} catch (err) {
  console.error(`Error loading test case file: ${err}`);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Nektar Home Assignment',
    availableEndpoints: {
      '/api/gmail': 'Access Gmail-related data with pagination (limit & offset)',
      '/api/gmail/:id': 'Get a specific Gmail message by ID',
      '/api/calendar': 'Access Calendar-related data with pagination (limit & offset)',
      '/api/calendar/:id': 'Get a specific Calendar event by ID',
      '/api/contact': 'Extracts all contacts from the given email messages and calendar events.',
    },
    note: 'Use these endpoints to retrieve specific information. Refer to the documentation for more details.',
  });
});

// Routes
app.use('/api/gmail', gmailRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/contact', contactRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using test case file: ${testCasePath}`);
});
