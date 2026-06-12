# 🚀 Microlyzer AI

Microlyzer AI is a scalable AI-powered microservices platform designed to provide secure authentication, user management, and AI-driven analysis through a distributed architecture.

Built using modern web technologies and industry-standard backend practices, the system follows a microservices architecture with an API Gateway acting as the single entry point for all client requests.

---

## 🌟 Features

### Authentication & Authorization
- Secure JWT-based authentication
- Access Token & Refresh Token mechanism
- Protected routes
- Role-based access support
- Persistent login sessions

### User Management
- User profile management
- Account information retrieval
- Secure user data handling

### AI Processing
- AI-powered analysis services
- Dedicated AI microservice
- Scalable architecture for future AI integrations

### API Gateway
- Centralized request routing
- Service abstraction
- Unified API access
- Improved maintainability

### Security
- Password hashing using bcrypt
- HTTP-only cookies
- CORS protection
- Input validation
- Secure token management

---

# 🏗️ Architecture

```text
                    ┌─────────────┐
                    │   Frontend  │
                    │  (Next.js)  │
                    └──────┬──────┘
                           │
                           ▼
                 ┌──────────────────┐
                 │   API Gateway    │
                 └────────┬─────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼

 ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
 │ Auth Service│   │ User Service│   │ AI Service  │
 └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
        │                 │                 │
        └─────────────────┴─────────────────┘
                          │
                          ▼
                   MongoDB Atlas
```

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend
- Node.js
- Express.js
- TypeScript

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- JWT
- bcrypt

## Deployment
- Vercel (Frontend)
- Render (Backend Services)
- MongoDB Atlas

---

# 📂 Microservices

## 1. API Gateway

Responsibilities:

- Route incoming requests
- Forward requests to appropriate services
- Centralized API access
- Service communication

---

## 2. Auth Service

Responsibilities:

- User Registration
- User Login
- JWT Generation
- Token Validation
- Refresh Token Handling

---

## 3. User Service

Responsibilities:

- User Profile Management
- User Information Retrieval
- User Data Operations

---

## 4. AI Service

Responsibilities:

- AI Processing
- Analysis Generation
- Future AI Feature Expansion

---

# 🔐 Authentication Flow

1. User logs in.
2. Auth Service validates credentials.
3. JWT Access Token is generated.
4. Refresh Token is issued.
5. Protected APIs verify tokens.
6. Gateway forwards authenticated requests to services.

---

# ⚡ Local Setup

## Clone Repository

```bash
git clone <repository-url>
cd microlyzer-ai
```

## Install Dependencies

For each service:

```bash
npm install
```

## Environment Variables

Create a `.env` file for each service.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret
```

---

## Run Services

### Auth Service

```bash
npm run dev
```

### User Service

```bash
npm run dev
```

### AI Service

```bash
npm run dev
```

### API Gateway

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

```http
POST /api/auth/register
```

```http
POST /api/auth/login
```

```http
POST /api/auth/logout
```

```http
GET /api/auth/get-me
```

---

## Users

```http
GET /api/users/profile
```

```http
PUT /api/users/profile
```

---

## AI

```http
POST /api/ai/analyze
```

---

# 🚀 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| API Gateway | Render |
| Auth Service | Render |
| User Service | Render |
| AI Service | Render |
| Database | MongoDB Atlas |

---

# ⚠️ Important Note Regarding Deployment

This project is deployed using Render's free tier for backend services.

As Render free-tier instances automatically spin down after periods of inactivity, the first request after inactivity may experience:

- Increased response time
- Cold start delays
- Temporary service unavailability

In some cases, a service may take a few seconds to wake up before responding.

This behavior is expected in the free-tier environment and does not reflect the actual performance of the application in a production-grade deployment.

For production environments, dedicated always-on instances, load balancing, health checks, caching, and container orchestration solutions such as Docker, Kubernetes, AWS ECS, or Google Cloud Run are recommended.

---

# 🔮 Future Improvements

- Redis Caching
- Service Discovery
- Circuit Breakers
- Rate Limiting
- Centralized Logging
- Monitoring & Observability
- Kubernetes Deployment
- CI/CD Pipelines
- Load Balancing
- Event-Driven Communication

---

# 👨‍💻 Author

Harish Kushwaha

Electronics & Communication Engineering
MANIT Bhopal

---