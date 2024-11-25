### Available APIs

Below are the available APIs. See `requests.http` for examples.

### Gmail Endpoints

##### `GET /api/gmail`

Returns a paginated list of email messages.

Query parameters:

- `limit` (optional): Number of messages to return (default: 10)
- `offset` (optional): Number of messages to skip (default: 0)

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/gmail?limit=5&offset=0
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
  "offset": 0
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

### Calendar Endpoints

##### `GET /api/calendar`

Returns a paginated list of calendar events.

Query parameters:

- `limit` (optional): Number of events to return (default: 10)
- `offset` (optional): Number of events to skip (default: 0)

Example Request:

```bash
curl -X GET 'http://localhost:3000/api/calendar?limit=5&offset=0'
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

---
