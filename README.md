# GenAI Interview Assistant

A full-stack interview preparation web application with AI-powered report generation and resume PDF creation.

## Project Structure

- `Backend/`
  - Node.js + Express API
  - MongoDB with Mongoose
  - Google GenAI integration for interview reports and resume generation
  - Puppeteer used to render PDF resumes
- `Frontend/`
  - React + Vite application
  - Client-side auth state and protected routes
  - Axios calls to backend API

## Key Features

- User registration, login, logout, and `get-me`
- Generate interview reports from:
  - uploaded resume PDF
  - self description
  - job description
- Store interview reports for the authenticated user
- View saved interview reports
- Generate a tailored resume PDF for a saved report

## Backend

### Tech stack

- Node.js
- Express
- MongoDB / Mongoose
- JWT authentication with cookies
- Multer for resume uploads
- Google GenAI (`@google/genai`)
- Puppeteer for PDF generation
- Zod schema validation

### Important files

- `Backend/server.js` - starts the Express server and connects to MongoDB
- `Backend/src/app.js` - configures middleware and routes
- `Backend/src/routes/auth.routes.js` - auth endpoints
- `Backend/src/routes/interview.routes.js` - interview endpoints
- `Backend/src/controllers/auth.controller.js` - register/login/logout/get-me
- `Backend/src/controllers/interview.controller.js` - report generation and resume PDF
- `Backend/src/services/ai.service.js` - AI prompts and PDF rendering
- `Backend/src/config/database.js` - MongoDB connection


### Run backend

```bash
cd Backend
npm install
npm run dev
```

The backend listens on `http://localhost:3000`.

## Frontend

### Tech stack

- React
- Vite
- Axios
- React Router
- Sass

### Important files

- `Frontend/src/App.jsx` - root app provider wrapping auth and interview contexts
- `Frontend/src/app.routes.jsx` - route definitions
- `Frontend/src/features/auth/...` - auth pages, context, and API service
- `Frontend/src/features/interview/...` - interview pages, context, and API service

### Run frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and communicates with `http://localhost:3000`.

## API Endpoints

### Auth

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login and set auth cookie
- `GET /api/auth/logout` - logout and blacklist token
- `GET /api/auth/get-me` - get current authenticated user

### Interview

- `POST /api/interview/` - generate interview report (`multipart/form-data` with `resume`, `selfDescription`, `jobDescription`)
- `GET /api/interview/` - fetch all interview reports for user
- `GET /api/interview/report/:interviewId` - fetch single report
- `POST /api/interview/resume/pdf/:interviewReportId` - generate resume PDF for a report

## Notes

- Frontend auth uses cookies with `withCredentials: true`
- Resume upload limit is `3MB` in the backend
- AI generation uses Gemini preview model and validates the response schema with Zod

## Author

- Harish Kushwaha
