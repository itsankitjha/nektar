import express, { Request, Response } from 'express';
import { Contact, PaginatedResponse } from '../types';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const testData = req.app.locals.testData;
  const { limit = 10, offset = 0, ignoreDomains, blockDomains } = req.query;

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  // Extract contacts from Gmail messages
  const contacts: Contact[] = [];

  testData.gmail.forEach((message: { payload: { headers: { name: string; value: string }[] } }) => {
    const fromHeader = message.payload.headers.find(
      (header: { name: string; value: string }) => header.name === 'From'
    );
    if (fromHeader) {
      const emailParts = fromHeader.value.split('@');
      if (emailParts.length === 2) {
        const [firstName, lastName] = emailParts[0].split('.');
        const domain = emailParts[1];
        contacts.push({
          email: fromHeader.value,
          firstName: firstName || '',
          lastName: lastName || '',
          domain,
        });
      }
    }
  });

  // Remove duplicates based on email
  let uniqueContacts = Array.from(
    new Map(contacts.map((contact) => [contact.email, contact])).values()
  );

  // Apply ignoreDomains and blockDomains filters
  if (ignoreDomains) {
    const domainsToIgnore = (ignoreDomains as string).split(',');
    uniqueContacts = uniqueContacts.filter((contact) => !domainsToIgnore.includes(contact.domain));
  }

  if (blockDomains) {
    const domainsToBlock = (blockDomains as string).split(',');
    uniqueContacts = uniqueContacts.filter((contact) => !domainsToBlock.includes(contact.domain));
  }

  // Paginate the results
  const paginatedContacts = uniqueContacts.slice(offsetNumber, offsetNumber + limitNumber);
  const response: PaginatedResponse<Contact> = {
    data: paginatedContacts,
    total: uniqueContacts.length,
    limit: limitNumber,
    offset: offsetNumber,
  };

  res.json(response);
});

export default router;
