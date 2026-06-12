# Microlyzer API Gateway

The gateway exposes one public API surface for the frontend:

- `GET /health`
- `/api/auth/*`
- `/api/interview/*`
- `/api/mock/*`

## Local Run

```bash
cd microlyzer
npm install
npm run dev
```

Then verify all services through the gateway:

```bash
npm run health
```

## Render Deploy

Create a new Render Web Service for `microlyzer/api-gateway`.

- Root Directory: `microlyzer/api-gateway`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

Set these environment variables in Render:

```bash
NODE_ENV=production
AUTH_SERVICE_URL=https://your-auth-service.onrender.com
INTERVIEW_SERVICE_URL=https://your-interview-service.onrender.com
MOCK_SERVICE_URL=https://your-mock-service.onrender.com
FRONTEND_URL=https://your-frontend.onrender.com
```

Render provides `PORT` automatically, so you do not need to set it there.
