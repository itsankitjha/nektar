// Gmail Types
// Inspired from https://developers.google.com/gmail/api/reference/rest/v1/users.messages#Message
export interface GmailHeader {
  name: string;
  value: string;
}

export interface GmailBody {
  data: string;
  size: number;
}

export interface GmailPayload {
  body: GmailBody;
  partId: string;
  headers: GmailHeader[];
}

export interface GmailMessage {
  id: string;
  payload: GmailPayload;
  internalDate?: string;
}

// Calendar Types
// Inspired from https://developers.google.com/calendar/api/v3/reference/calendarList#resource
export interface CalendarDateTime {
  dateTime: string;
  timeZone?: string;
}

export interface CalendarEvent {
  id: string;
  end: CalendarDateTime;
  start: CalendarDateTime;
  status?: string;
  summary?: string;
  description?: string;
  location?: string;
  creator?: {
    email?: string;
    displayName?: string;
  };
  organizer?: {
    email?: string;
    displayName?: string;
  };
  attendees?: Array<{
    email: string;
    responseStatus?: string;
    displayName?: string;
  }>;
}

// Contact Types
export interface Contact {
  email: string;
  firstName: string;
  lastName: string;
  domain: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface SingleItemResponse<T> {
  data: T;
}

export interface ErrorResponse {
  error: string;
}
