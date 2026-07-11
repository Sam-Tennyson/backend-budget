# Repository Guidelines

## Project Structure & Module Organization

This is a Node.js Express backend for budget tracking. The entry point is `index.js`, which configures CORS, JSON parsing, MongoDB connection, and route mounting. Route definitions live in `routes/`, request handlers in `controllers/`, Mongoose schemas in `models/`, authentication middleware in `middleware/`, and shared helpers/constants in `utils/`. There is no separate `src/` directory, asset folder, or committed test suite at present.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run start:dev`: run the API with `nodemon index.js` for local development.
- `npm run start:production`: run the API with `node index.js`.
- `npm test`: currently exits with “no test specified”; add a real test script before relying on it in CI.

The app expects environment variables from `.env`, especially `PORT`, `MONGO_URL`, and any JWT-related values used by `utils/commonFunctions.js`.

## Coding Style & Naming Conventions

Use CommonJS modules (`require`, `module.exports`) to match the existing code. Keep route files named by feature, for example `BudgetRoutes.js`, controller files as `FeatureController.js`, and model files as feature nouns. Existing handler names use snake_case for some actions (`add_budget`, `update_budget`) and camelCase for reads (`getBudgetData`); prefer matching nearby exports when extending a controller. Use 2-space or tab indentation consistently within a file, semicolons are optional but avoid mixing styles in touched blocks.

## Testing Guidelines

No testing framework is configured yet. When adding tests, prefer Jest with Supertest for Express endpoints and place tests under `tests/` or beside modules as `*.test.js`. Cover authentication behavior, validation failures, MongoDB query filters, and successful CRUD flows. Until automated tests exist, manually verify key endpoints such as `/api/auth`, `/api/budget`, and `/api/budget-graph` against a local MongoDB database.

## Commit & Pull Request Guidelines

Git history uses short, imperative, hyphenated summaries such as `add-auth-middleware` and `change-in-add-budget-api`. Follow that style or use a concise imperative sentence. Pull requests should describe the behavior change, list manual or automated verification, call out environment variable changes, and link related issues when available. Include request/response examples for API changes.

## Security & Configuration Tips

Keep `.env` out of version control; `.gitignore` already excludes it. Do not log tokens, passwords, or full user records in new code. Protect budget routes with `auth_middleware` unless a route is intentionally public.
