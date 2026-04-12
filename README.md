# ARIA — AI Personal Shopper Store

> A full-stack AI-powered fashion e-commerce platform where users interact with an intelligent stylist instead of traditional search.

## 🌐 Live Demo

**→ [http://34.93.151.212:3001](http://34.93.151.212:3001)**

| Service | URL |
|---|---|
| Frontend | http://34.93.151.212:3001 |
| Backend API | http://34.93.151.212:5005/api |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (Mongoose) |
| Frontend | Next.js 14, Tailwind CSS, Framer Motion |
| State | Zustand |
| AI | Groq (LLaMA 3.3 70B) |
| Auth | JWT + bcrypt |

---

## Architecture

```
backend/src/
├── config/        # DB connection (Singleton pattern)
├── models/        # Mongoose schemas
├── repositories/  # Data access layer (BaseRepository + extensions)
├── services/      # Business logic
├── controllers/   # HTTP handlers
├── middleware/    # Auth guard, rate limiter, error handler
├── routes/        # Express router
└── utils/         # Seed script
```

**OOP Patterns used:**
- **Singleton** — Database connection
- **Repository Pattern** — Generic BaseRepository with typed extensions
- **Service Layer** — Business logic separation from controllers
- **Dependency Injection** — Services instantiated inside controllers

---

## Key Features

- 🤖 **AI Stylist Chat** — Describe any occasion, get curated outfit recommendations powered by LLaMA 3.3 70B via Groq
- 🛍️ **Smart Shop** — Full product catalog with search, category filters, price range and pagination
- 🛒 **Cart & Checkout** — Add/remove items, quantity control, order placement with shipping address
- 👤 **Style Profile** — Set your aesthetic, preferences, colors and budget so ARIA personalizes for you
- 📦 **Order Tracking** — View all past orders with status badges
- 🌿 **Sustainability Score** — Every product rated for eco-friendliness
- 🔐 **Auth** — JWT-based register/login with bcrypt password hashing
- 🛡️ **Admin Panel** — Order status management via protected admin routes

---

## Getting Started

### Backend
```bash
cd backend
npm install
npm run seed    # seed 12 products + admin user
npm run dev     # starts on :5005
```

### Frontend
```bash
cd frontend
npm install
npm run dev     # starts on :3000
```

### Environment (`backend/.env`)
```env
PORT=5005
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GROQ_API_KEY=your_groq_api_key
NODE_ENV=development
```

---

## API Endpoints

| Method | Route | Auth |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/products` | Public |
| GET | `/api/products/search?q=` | Public |
| GET | `/api/products/:id` | Public |
| GET/PUT | `/api/profile/style` | User |
| GET/POST | `/api/cart/items` | User |
| PUT/DELETE | `/api/cart/items/:productId` | User |
| POST | `/api/orders/checkout` | User |
| GET | `/api/orders` | User |
| POST | `/api/ai/sessions` | User |
| POST | `/api/ai/sessions/:id/chat` | User |
| PUT | `/api/admin/orders/:id/status` | Admin |

---

## Default Admin
```
Email:    admin@arishopper.com
Password: admin123
```

---

## Diagrams

- [Idea & Scope](idea.md)
- [Use Case Diagram](useCaseDiagram.md)
- [Class Diagram](classDiagram.md)
- [ER Diagram](ErDiagram.md)
