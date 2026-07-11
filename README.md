# Backend Budget API

Node.js and Express backend for user authentication and budget tracking. Data is stored in MongoDB through Mongoose models.

## Project Structure

```text
index.js                 # App entry point, middleware, routes, MongoDB connection
routes/                  # Express route definitions
controllers/             # Request handlers and business logic
models/                  # Mongoose schemas and models
middleware/              # Authentication middleware
utils/                   # Shared helpers and constants
```

## Requirements

- Node.js
- npm
- MongoDB connection string

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```bash
PORT=5000
MONGO_URL=mongodb://localhost:27017/budgetController
```

`.env` is ignored by Git and should not be committed.

## Running the App

Start the development server with nodemon:

```bash
npm run start:dev
```

Start the production server:

```bash
npm run start:production
```

The server mounts a basic health check at:

```text
GET /test
```

## API Routes

Authentication routes:

```text
POST /api/auth/register
POST /api/auth/login
```

Budget routes require an `Authorization: Bearer <token>` header:

```text
POST   /api/budget
GET    /api/budget
GET    /api/budget/:id
PUT    /api/budget/:id
DELETE /api/budget/:id
GET    /api/budget-graph
```

Budget list filtering supports `startDate` and `endDate` query parameters. Budget graph requests also use date-range query parameters to generate daily budget data.

## Testing

Automated tests are not configured yet. The current `npm test` script exits with an error placeholder. When adding tests, prefer Jest and Supertest for API coverage.

## Notes

Authentication uses JWT helpers in `utils/commonFunctions.js` and security constants in `utils/constants.js`. Move secret values to environment variables before deploying beyond local development.
