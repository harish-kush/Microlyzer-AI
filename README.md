# Microlyzer-AI 🤖

> **AI-Powered Interview Preparation Platform** — Prepare smarter, interview better

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://react.dev/)

---

## 📋 Overview

**Microlyzer-AI** is a cutting-edge, full-stack AI-powered interview preparation platform that leverages Google's Generative AI to provide personalized, data-driven interview coaching. The platform analyzes your resume, job description, and professional profile to generate customized technical and behavioral questions, identify skill gaps, and create targeted preparation plans.

### Key Value Propositions

- 🎯 **Smart Resume Analysis** — Extract insights from your resume automatically
- 🤖 **AI-Generated Questions** — Context-aware technical and behavioral questions powered by Google Gemini
- 📊 **Match Score Analysis** — Get a precise job-fit score based on resume vs. job requirements
- 🎓 **Personalized Preparation** — Day-by-day preparation roadmap tailored to your skill gaps
- 🎤 **Mock Interview Sessions** — Real-time interview simulations with feedback
- 🔐 **Secure Authentication** — JWT-based auth with encrypted password storage

---

## 🏗️ Architecture

### Before — Monolithic Architecture

The original monolithic architecture (single Express.js backend):

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React 19)                     │
│              (Vite, TailwindCSS, Framer Motion)             │
└────────────────┬────────────────────────────────────────────┘
        │ CORS-enabled HTTP/REST
┌────────────────▼────────────────────────────────────────────┐
│              Monolithic Backend (Express.js)                │
│  ┌─────────────┬─────────────┬──────────────────────────┐   │
│  │   Auth      │  Interview  │    Mock Interview        │   │
│  │  Routes     │   Routes    │       Routes             │   │
│  └──────┬──────┴──────┬──────┴─────────────┬────────────┘   │
│         │             │                    │                 │
│  ┌──────▼──────┬──────▼──────┬─────────────▼────────────┐   │
│  │   Auth      │ Interview   │  Mock Interview          │   │
│  │  Controller │ Controller  │     Controller           │   │
│  └──────┬──────┴──────┬──────┴─────────────┬────────────┘   │
│         │             │                    │                 │
│  ┌──────▼──────┬──────▼──────┬─────────────▼────────────┐   │
│  │   AI        │ Interview   │  Mock Interview          │   │
│  │  Service    │  Service    │     Service              │   │
│  └──────┬──────┴──────┬──────┴─────────────┬────────────┘   │
└─────────┼──────────────┼────────────────────┼────────────────┘
    │              │                    │
  ┌────▼──────────────▼────────────────────▼────┐
  │    MongoDB (Mongoose ODM)                   │
  │  ┌──────────────────────────────────────┐   │
  │  │ Collections: users, interviews,      │   │
  │  │ reports, mock sessions, tokens       │   │
  │  └──────────────────────────────────────┘   │
  └──────────────────────────────────────────────┘
    │
  ┌────▼──────────────────────────────────────┐
  │  Google Generative AI API (Gemini)       │
  │  • Resume Analysis                       │
  │  • Question Generation                   │
  │  • Report Synthesis                      │
  └──────────────────────────────────────────┘
```

### After — Microservices Architecture (Scalable)

The refactored microservices architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React 19)                   │
│              (Vite, TailwindCSS, Framer Motion)            │
└────────────────┬───────────────────────────────────────────┘
     │
     │ HTTPS / REST API
     ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Service                    │
│                                                           │
│ • Request Routing                                         │
│ • Authentication Middleware                               │
│ • CORS Handling                                           │
│ • Rate Limiting (Future)                                  │
│ • Centralized Entry Point                                 │
└──────────────┬──────────────┬──────────────┬───────────────┘
         │              │              │
         ▼              ▼              ▼

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Auth Service   │ │ Interview Service│ │   Mock Service   │
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ Auth Routes      │ │ Interview Routes │ │ Mock Routes      │
│ Auth Controller  │ │ Interview Ctrl   │ │ Mock Controller  │
│ JWT Handling     │ │ Resume Upload    │ │ Session Mgmt     │
│ Token Validation │ │ Report Storage   │ │ Question Gen     │
│ User Mgmt        │ │ Resume PDF Gen   │ │ Answer Analysis  │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
   │                    │                    │
   └──────────┬─────────┴─────────┬──────────┘
        │                   │
        ▼                   ▼

  ┌─────────────────────┐   ┌─────────────────────┐
  │     MongoDB Atlas   │   │    Gemini AI API    │
  ├─────────────────────┤   ├─────────────────────┤
  │ users               │   │ Resume Analysis     │
  │ interviews          │   │ Question Generation │
  │ reports             │   │ Feedback Generation │
  │ mock_sessions       │   │ Report Synthesis    │
  │ blacklisted_tokens  │   │ Resume Tailoring    │
  └─────────────────────┘   └─────────────────────┘
```

---

## 🎨 Features

### 1. **User Authentication**

- Registration & Login with secure password hashing (bcryptjs)
- JWT-based session management
- Cookie-based token storage
- Token blacklisting for logout functionality
- CORS-enabled secure communication

### 2. **Interview Analysis**

- **Resume Upload & Parsing** — Extract text from PDF resumes
- **Job Description Matching** — Analyze role requirements
- **AI-Powered Report Generation** — Comprehensive interview insights including:
  - Match score (0-100)
  - Technical interview questions with sample answers
  - Behavioral interview questions tailored to the role
  - Identified skill gaps with severity levels
  - Multi-day preparation plan with daily focus areas and tasks

### 3. **Mock Interview Simulation**

- Realistic interview scenarios
- Speech recognition for voice practice
- Real-time feedback mechanism
- Interview session recording & playback

### 4. **Dashboard & Analytics**

- User interview history
- Performance tracking
- Progress visualization
- Preparation timeline

---

## 📦 Tech Stack

### Frontend

```
• React 19.2.0         - UI Framework
• Vite 7.3.1           - Build tool & dev server
• TailwindCSS 4.3.0    - Utility-first CSS framework
• Framer Motion 12.40  - Animation library
• React Router 7.13    - Client-side routing
• React Speech        - Voice input for mock interviews
• Axios 1.13.5        - HTTP client
• SASS 1.97.3         - CSS preprocessor
```

### Backend

```
• Node.js 18+          - Runtime
• Express.js 5.2.1    - HTTP framework
• MongoDB/Mongoose    - Database & ODM
• Google GenAI 1.42   - Generative AI integration
• Puppeteer 24.37     - Headless browser (PDF processing)
• pdf-parse 2.4.5     - PDF text extraction
• JWT 9.0.3           - Authentication tokens
• bcryptjs 3.0.3      - Password hashing
• Multer 2.0.2        - File upload handling
• Zod 3.25.76         - Schema validation
• Nodemon             - Development auto-reload
```

### DevOps & Deployment

```
• Docker              - Containerization
• Render             - Cloud deployment platform
• MongoDB Atlas      - Cloud database
```

---

## 📂 Project Structure

```
Microlyzer-AI/
├── backend/                          # Monolithic backend (Express.js)
│   ├── server.js                     # Entry point
│   ├── package.json
│   ├── src/
│   │   ├── app.js                    # Express app configuration
│   │   ├── config/
│   │   │   └── database.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js    # Auth logic
│   │   │   ├── interview.controller.js
│   │   │   └── mockInterview.controller.js
│   │   ├── models/
│   │   │   ├── user.model.js         # User schema
│   │   │   ├── interviewReport.model.js
│   │   │   ├── mockInterview.model.js
│   │   │   └── blacklist.model.js    # Token blacklist for logout
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── interview.routes.js
│   │   │   └── mockInterview.routes.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js    # JWT verification
│   │   │   └── file.middleware.js    # Multer file handling
│   │   └── services/
│   │       ├── ai.service.js         # Google Gemini integration
│   │       └── mockInterview.service.js
│   └── login.json                    # Demo credentials
│
├── frontend/                         # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── vercel.json                   # Vercel deployment config
│   ├── public/
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── App.jsx
│       ├── app.routes.jsx            # Route definitions
│       ├── config/
│       │   └── api.js                # API base URL config
│       ├── features/
│       │   ├── auth/                 # Auth module (Context API)
│       │   ├── interview/            # Interview module
│       │   └── mockInterview/        # Mock interview module
│       └── style/
│           ├── button.scss
│           └── global styles
│
├── microlyzer/                       # Microservices architecture (scalable)
│   ├── package.json
│   ├── api-gateway/
│   │   ├── server.js                 # API Gateway (port 5000)
│   │   └── src/
│   ├── auth-service/
│   │   ├── server.js                 # Auth Service (port 3001)
│   │   ├── src/
│   │   │   ├── config/
│   │   │   │   ├── database.js
│   │   │   │   └── logger.js         # Winston logging
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── middlewares/
│   │   └── Dockerfile
│   ├── interview-service/
│   │   ├── server.js                 # Interview Service (port 3002)
│   │   ├── src/
│   │   └── Dockerfile
│   ├── mock-service/
│   │   ├── server.js                 # Mock Service (port 3003)
│   │   ├── src/
│   │   └── Dockerfile
│   ├── scripts/
│   │   └── check-health.js           # Health check script
│   └── docker-compose.yml            # Multi-container orchestration
│
├── README.md                         # This file
├── testing_servies.txt              # Testing documentation
└── .env                             # Environment variables (not committed)
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}

Response: 201 Created
{
  "success": true,
  "user": { "id": "...", "email": "...", "name": "..." },
  "token": "jwt_token_here"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "token": "jwt_token_here"
}
```

### Interview Endpoints

#### Generate Interview Report

```http
POST /interview/generate-report
Content-Type: multipart/form-data
Authorization: Bearer {jwt_token}

Form Data:
- resume: [PDF File]
- jobDescription: "Senior Full-Stack Developer - 5+ years..."
- selfDescription: "I have 3 years of experience in..."

Response: 201 Created
{
  "matchScore": 78,
  "technicalQuestions": [...],
  "behavioralQuestions": [...],
  "skillGaps": [...],
  "preparationPlan": [...]
}
```

#### Get Interview History

```http
GET /interview/history
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "interviews": [...]
}
```

### Mock Interview Endpoints

#### Start Mock Interview Session

```http
POST /mock/session/start
Authorization: Bearer {jwt_token}

Response: 201 Created
{
  "sessionId": "...",
  "question": "Tell me about your experience...",
  "duration": 60
}
```

#### Submit Answer

```http
POST /mock/session/:sessionId/answer
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "answer": "User's spoken/typed answer",
  "duration": 45
}

Response: 200 OK
{
  "feedback": "Good answer...",
  "score": 8.5
}
```

---

## 🐳 Docker & Containerization

### Build Docker Images

```bash
cd microlyzer

# Build individual services
docker build -t microlyzer-auth-service ./auth-service
docker build -t microlyzer-interview-service ./interview-service
docker build -t microlyzer-mock-service ./mock-service
docker build -t microlyzer-api-gateway ./api-gateway

# Or use docker-compose (if available)
docker-compose up -d
```

---

## 🌐 Deployment

### ⚠️ Important: Render Free Tier Limitations

**Microlyzer-AI services are currently deployed on Render's free tier, which may experience:**

| Issue                         | Impact                                              | Workaround                                 |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------ |
| **Cold Starts** (>30 seconds) | Initial request delays                              | Use paid tier for production               |
| **Auto-Shutdown**             | Services go inactive after 15 mins without requests | Health check endpoints available           |
| **Memory Limits**             | Limited to 512MB RAM                                | Optimize code and database queries         |
| **Execution Timeout**         | Long-running operations may fail                    | Implement async processing, job queues     |
| **Bandwidth Restrictions**    | Limited monthly bandwidth                           | Monitor usage and upgrade if needed        |
| **Concurrent Requests**       | Limited connection handling                         | Implement rate limiting and load balancing |

**These limitations may cause:**

- Slow API responses during cold starts
- Brief service unavailability after inactivity
- PDF processing timeouts for large files
- AI API call delays
- Database connection pool exhaustion

**Recommendation:** For production use, upgrade to a paid hosting plan or use alternatives like Heroku, AWS, DigitalOcean, or Railway.

---

### Frontend Deployment (Vercel)

```bash
cd frontend

# Build production
npm run build

# Deploy to Vercel
vercel --prod

# Or connect your GitHub repo to Vercel for auto-deployment
```

**Vercel Config** — See [vercel.json](frontend/vercel.json)

### Backend Deployment (Render)

1. **Create Render Account** — https://render.com
2. **Create New Web Service**
   - Connect GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`
3. **Set Environment Variables**
   - `MONGODB_URI` — MongoDB Atlas connection string
   - `GOOGLE_GENAI_API_KEY` — Your Google API key
   - `JWT_SECRET` — Strong secret key
   - `FRONTEND_URL` — Deployed frontend URL
4. **Deploy**
   ```bash
   git push  # Triggers auto-deployment
   ```

### Environment Variables Checklist

```bash
# Backend
MONGODB_URI=mongodb+srv://...
GOOGLE_GENAI_API_KEY=sk-...
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=production
FRONTEND_URL=https://microlyzer.vercel.app

# Frontend (.env or hardcode in config/api.js)
VITE_API_URL=https://microlyzer-backend.onrender.com
```

---

## 📊 Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  phone: String,
  skills: [String],
  experience: Number,  // years
  createdAt: Date,
  updatedAt: Date
}
```

### Interview Report Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  jobTitle: String,
  resume: String,
  jobDescription: String,
  selfDescription: String,
  matchScore: Number,
  technicalQuestions: [{question, intention, answer}],
  behavioralQuestions: [{question, intention, answer}],
  skillGaps: [{skill, severity}],
  preparationPlan: [{day, focus, tasks}],
  createdAt: Date
}
```

### Mock Interview Session Model

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  questions: [String],
  answers: [String],
  feedback: [String],
  scores: [Number],
  duration: Number,
  status: String (in-progress|completed),
  createdAt: Date
}
```

---

## 🔐 Security Best Practices

✅ **Implemented:**

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS protection (configurable origin)
- Environment variable management
- Token blacklisting for logout

📋 **Recommendations for Production:**

- Implement HTTPS/SSL certificates
- Add rate limiting and DDoS protection
- Use API key rotation
- Implement request validation with Zod schemas
- Add comprehensive audit logging
- Regular security audits and dependency updates
- Implement Content Security Policy (CSP)
- Use OWASP security headers

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

```
Error: connect ECONNREFUSED
→ Ensure MongoDB is running or MongoDB Atlas URI is correct
→ Check whitelist IP in MongoDB Atlas
→ Verify MONGODB_URI in .env file
```

### Google AI API Errors

```
Error: Invalid API key
→ Generate new API key from https://aistudio.google.com/app/apikeys
→ Ensure API key has proper permissions
→ Check quota limits on Google Cloud console
```

### CORS Errors

```
Error: Access-Control-Allow-Origin
→ Update CORS origin in backend/src/app.js
→ Ensure frontend URL matches FRONTEND_URL env variable
```

### Cold Start Issues (Render)

```
Solution: Use health check endpoint to keep service warm
curl https://your-service.onrender.com/health
```

### PDF Upload Failures

```
Issue: Large PDFs timing out
Solution:
→ Compress PDF files
→ Implement chunked file upload
→ Increase timeout settings
→ Upgrade Render plan
```

---

## 📈 Performance Optimization

### Backend

- Implement caching for frequently accessed data
- Use database indexing on frequently queried fields
- Implement pagination for large datasets
- Use compression middleware (gzip)
- Implement request throttling

### Frontend

- Code splitting with Vite dynamic imports
- Lazy loading for routes and components
- Image optimization
- Minify and compress assets
- Service worker for offline support

### Database

- Create indexes on `user`, `email`, `createdAt` fields
- Implement data archival for old sessions
- Use connection pooling in production

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Style

- Use consistent formatting (ESLint configured)
- Write meaningful commit messages
- Add JSDoc comments for functions
- Test code before submitting PR

---

## 📄 License

This project is licensed under the **ISC License** — see [LICENSE](LICENSE) file for details.

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB University](https://university.mongodb.com/)
- [Google Generative AI](https://ai.google.dev/)
- [Vite Guide](https://vitejs.dev/guide/)

---

<div align="center">

**Made by Harish Kushwaha**

</div>
