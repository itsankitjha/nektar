# 🐝 Nektar Home Assignment

Nektar syncs data from various sources, including Gmail and Google Calendar. We process them to extract out information.

This is a starter template that uses Express and Mocks google APIs. You will need to extend this template to implement the APIs as described.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- TypeScript knowledge

### Installation

1. Download the starter template and extract it to a new directory:

   ```bash
   cd [starter-template-directory]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### 🏃 Running the Application

1. Development mode:

   ```bash
   npm run dev [test-case-number]
   ```

2. Production mode:

   ```bash
   npm run build
   npm start [test-case-number]
   ```

This will start the server on port `3000`. Optionally, you can specify a test case number as a parameter.

Test case number, defaults to `1`, uses the test case defined in the `/tests` folder. You can add more test cases and run them. For example, `npm run dev 2` will use `2.json` in `/tests` as test data.

> Your code will be evaluated against some hidden test cases post submission.

---

### 💼 Assignment:

To give you a head start, we have already implemented a few APIs as documented in `api-docs.md`. Your task is to extend the starter template to implement the following APIs:

### Primary APIs:

1. `/api/contact`: Extracts all contacts from the given email messages and calendar events. De-duplicate them.

   - Add an optional parameter `limit` to limit the number of contacts to be returned.
   - Add an optional parameter `offset` to skip the first `offset` contacts.
   - Add an optional paramter `ignoreDomains` to ignore contacts with email addresses from the given domains.
   - Add an optional parameter `blockDomains` to ignore contacts all the contacts from the given email/event if they have any user with blocked domains.

   `Response`: `PaginatedResponse<Contact>` where Contact is:

   ```typescript
   interface Contact {
     email: string; // Primary key
     firstName: string;
     lastName: string;
     domain: string;
   }
   ```

### Bonus APIs:

2. `api/contact/:contact-email`: Returns the contact with the given email address.

   `Response`: `SingleItemResponse<Contact>`

3. `/api/gmail/:contact-email`: Returns the email messages for the given contact email.

   `Response`: `PaginatedResponse<GmailMessage>`

4. `/api/calendar/:contact-email`: Returns the calendar events for the given contact email.

   `Response`: `PaginatedResponse<CalendarEvent>`

5. `api/gmail`: Add an optional parameter `sort` to sort the email messages by the given field. The default sort field is `internalDate`.

   `Response`: `PaginatedResponse<GmailMessage>`

6. `api/calendar`: Add an optional parameter `sort` to sort the calendar events by the given field. The default sort field is `start.dateTime`.

   `Response`: `PaginatedResponse<CalendarEvent>`

> Since time is limited, we recommened that you start with an API and deliver it completely along with the documentation and additional tests (if required) before moving on to the next one.

> If there is any ambiguity in the requirements, you should make reasonable assumptions and to complete the assignment.

---

### 🧐 Evaluation

You can use this starter template to complete the assignment. You can modify the code to implement the requirements. You will be given a total of 1.5 hours to this. You will be evaluated on the following criteria:

- Completeness of the assignment (Primary API + Number of Bonus APIs Completed)
- Correctness of the implementation
- Efficiency of the implementation (Time and space complexities whereever applicable)
- Readability of the code
- Testing (You can add more tests in the `/tests` folder)
- Documentation of the code (Extend [api-docs.md](api-docs.md) file)

---
