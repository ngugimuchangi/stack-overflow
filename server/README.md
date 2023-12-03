# Server-Side Application

This is the server-side application for our project. It's built with Node.js and Express, and it
provides the API endpoints for our client-side application.

## Getting Started

To get started with the server-side application, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the server directory: `cd server`
3. Install the dependencies: `npm install`
4. Run setup script: `npm run setup`
5. Start the application: `npm start`

The server will start on `http://localhost:8000`.

## API Endpoints

- `/auth/login`: Endpoint for user login.
- `auth/logout`: Endpoint for user logout.
- `/users`: Endpoints for user registration and authentication.
- `/users/:userId`: Endpoints for user registration and authentication.
- `/questions`: Endpoints for creating and reading questions.
- `/questions:questionId`: Endpoints for creating, reading and deleting questions.
- `questions/:questionId/answers`: Endpoints for creating and reading.
- `questions/:questionId/answers/:answerId`: Endpoints for reading, updating, and deleting answers.
- `/questions/:questionId/answers/:answerId/vote`: Endpoints for upvoting and downvoting answers
- `/questions/:questionId/answers/:answerId/comments`: Endpoints for creating and reading comments.
- `/questions/:questionId/answers/:answerId/comments/:commentId`: Endpoints for editing, reading and
  deleting comments.
- `/questions/:id/answers/:id/comments/vote`: Endpoints for upvoting and downvoting comments.
- `/tags`: Endpoints for creating, reading, updating, and deleting tags.
