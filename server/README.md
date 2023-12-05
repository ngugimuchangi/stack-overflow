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

### Authentication

- `POST /auth/login`: Endpoint for user login
  - Request body:
    - `email`: string,
    - `password`: string
- `auth/logout`: Endpoint for user logout.

### Users

- `GET /users`: Get all users. Only available to admins.
- `GET /users/:userId`: Get user by id. Available to admins.
- `GET /users/me`: Get current user.
- `DELETE /users/:userId`: Delete user by id. Only available to admins and user who is deleting
  their own account.

### Questions

- `POST /questions`: Create a new question.
  - Request body: `{ title: string, body: string, tags: string[] }`
- `GET /questions`: Get all questions. Available to all users.
  - Query parameters:
    - `p`: Page number
    - `t`: Filter by tag names - comma separated list of tag names e.g. `t=tag1,tag2,tag3`
    - `q`: Search query.
    - `s`: Active or answered questions, e.g. `s=active` or`s=answered`
- `GET /questions:questionId`: Get question by id. Available to all users.
- `PATCH /questions/:questionId`: Edit question by id. Available to admins and question owner.
- `PATCH /questions/:questionId/views`: Increment question views by id. Available to all users.

  - Request body:
    - `title`: string
    - `summary`: string
    - `text`: string
    - `action`: string (either `update`, `upvote`, `downvote`, `view`, `activate`, or `deactivate` )

- `DELETE /questions/:questionId`: Delete question by id. Available to admins and question owner.

### Answers

- `POST /questions/:questionId/answers`: Create a new answer.
  - Request body: `{ body: string }`
- `GET /:questionId/answers`: Get all answers for a question. Available to all users.
  - Query parameters:
    - `p`: Page number
- `GET/:questionId/answers/:answerId`: Get answer by id. Available to all users.
- `PATCH /questions/:questionId/answers/:answerId`: Edit answer by id. Available to admins and
  answer owner.
  - Request body:
    - `text`: string
    - `action`: string (either `update` or `upvote` or `downvote`)
- `DELETE /questions/:questionId/answers/:answerId`: Delete answer by id. Available to answer owner.

### Comments

- `GET /questions/:questionId/answers/:answerId/comments`: Get all comments for an answer.
  - Query parameters:
    - `p`: Page number
- `POST /questions/:questionId/answers/:answerId/comments`: Create a new comment.
  - Request body:
    - `text1: string
- `/PATCH questions/:questionId/answers/:answerId/comments/:commentId`: Edit comment by id.
  Available to comment owner.
  - Request body:
    - `text`: string
    - `action`: string (either `update` or `upvote` or `downvote`)
- `DELETE /questions/:questionId/answers/:answerId/comments/:commentId`: Delete comment by id.
  Available to admins and comment owner.

### Tags

- `GET /tags`: Get all tags
- `GET /tags/me`: Get all tags for the current user
- `DELETE /tags/:id`: Delete a tag
