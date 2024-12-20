### Available APIs

Below are the available APIs. See `requests.http` for examples.

### Gmail Endpoints

##### `GET /api/gmail`

Returns a paginated list of email messages.

Query parameters:

- `limit` (optional): Number of messages to return (default: 10)
- `offset` (optional): Number of messages to skip (default: 0)
- `sort` (optional): Field to sort by (default: `internalDate`)

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/gmail?limit=5&offset=0&sort=internalDate'
```

Example Response:

```json
{
  "data": [
    {
      "id": "msg123",
      "payload": {
        "body": {
          "data": "Email content",
          "size": 1024
        },
        "partId": "0",
        "headers": [
          {
            "name": "From",
            "value": "sender@example.com"
          }
        ]
      },
      "internalDate": "2023-12-01T10:00:00Z"
    }
    // More messages
  ],
  "total": 100,
  "limit": 5,
  "offset": 0,
  "sort": "internalDate"
}
```

##### `GET /api/gmail/:id`

Returns a specific email message by ID.

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/gmail/msg123'
```

Example Response:

```json
{
  "data": {
    "id": "msg123",
    "payload": {
      "body": {
        "data": "Email content",
        "size": 1024
      },
      "partId": "0",
      "headers": [
        {
          "name": "From",
          "value": "sender@example.com"
        }
      ]
    },
    "internalDate": "2023-12-01T10:00:00Z"
  }
}
```

##### `GET /api/gmail/:contact-email`

Returns the email messages for the given contact email.

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/gmail/razan@vinaora.com'
```

Example Response:

```json
{
  "data": [
    {
      "id": "msg123",
      "payload": {
        "body": {
          "data": "Email content",
          "size": 1024
        },
        "partId": "0",
        "headers": [
          {
            "name": "From",
            "value": "razan@vinaora.com"
          }
        ]
      },
      "internalDate": "2023-12-01T10:00:00Z"
    }
    // More messages
  ],
  "total": 1,
  "limit": 1,
  "offset": 0
}
```

### Calendar Endpoints

##### `GET /api/calendar`

Returns a paginated list of calendar events.

Query parameters:

- `limit` (optional): Number of events to return (default: 10)
- `offset` (optional): Number of events to skip (default: 0)
- `sort` (optional): Field to sort by (default: `start.dateTime`)

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/calendar?limit=5&offset=0&sort=start.dateTime'
```

Example Response:

```json
{
  "data": [
    {
      "id": "evt123",
      "start": {
        "dateTime": "2023-12-01T10:00:00Z",
        "timeZone": "UTC"
      },
      "end": {
        "dateTime": "2023-12-01T11:00:00Z",
        "timeZone": "UTC"
      },
      "summary": "Team Meeting",
      "attendees": [
        {
          "email": "attendee@example.com",
          "responseStatus": "accepted"
        }
      ]
    }
    // More events
  ],
  "total": 50,
  "limit": 5,
  "offset": 0
}
```

##### `GET /api/calendar/:id`

Returns a specific calendar event by ID.

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/calendar/evt123'
```

Example Response:

```json
{
  "data": {
    "id": "evt123",
    "start": {
      "dateTime": "2023-12-01T10:00:00Z",
      "timeZone": "UTC"
    },
    "end": {
      "dateTime": "2023-12-01T11:00:00Z",
      "timeZone": "UTC"
    },
    "summary": "Team Meeting",
    "attendees": [
      {
        "email": "attendee@example.com",
        "responseStatus": "accepted"
      }
    ]
  }
}
```

##### `GET /api/calendar/:contact-email`

Returns the calendar events for the given contact email.

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/calendar/aryan-kapoor@cake.com'
```

Example Response:

```json
{
  "data": [
    {
      "id": "1rdpq8agqf2p3e3c5ack71bn0v",
      "start": {
        "dateTime": "2022-06-11T05:00:00Z",
        "timeZone": "Asia/Kolkata"
      },
      "end": {
        "dateTime": "2022-06-11T06:00:00Z",
        "timeZone": "Asia/Kolkata"
      },
      "creator": {
        "email": "minato@nektar.ai"
      },
      "attendees": [
        {
          "email": "aryan-kapoor@cake.com"
        }
      ]
    }
    // More events
  ],
  "total": 1,
  "limit": 1,
  "offset": 0
}
```

### Contact Endpoints

##### `GET /api/contact`

Extracts all contacts from the given email messages and calendar events. De-duplicates them.

Query parameters:

- `limit` (optional): Number of contacts to return (default: 10)
- `offset` (optional): Number of contacts to skip (default: 0)
- `ignoreDomains` (optional): Comma-separated list of domains to ignore.
- `blockDomains` (optional): Comma-separated list of domains to block.

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/contact?limit=5&offset=0
```

Example Response:

```json
{
  "data": [
    {
      "email": "razan@vinaora.com",
      "firstName": "razan",
      "lastName": "",
      "domain": "vinaora.com"
    },
    {
      "email": "nam@metro.com",
      "firstName": "nam",
      "lastName": "",
      "domain": "metro.com"
    }
    // More contacts
  ],
  "total": 5,
  "limit": 5,
  "offset": 0
}
```

##### `GET /api/contact/:contact-email`

Returns the contact with the given email address.

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/contact/razan@vinaora.com'
```

Example Response:

```json
{
  "data": {
    "email": "razan@vinaora.com",
    "firstName": "razan",
    "lastName": "",
    "domain": "vinaora.com"
  }
}
```

---
