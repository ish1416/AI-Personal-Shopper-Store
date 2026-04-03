# ARIA — AI Personal Shopper Store

> A full-stack AI-powered fashion e-commerce platform where users interact with an intelligent stylist instead of traditional search.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (Mongoose) |
| Frontend | Next.js 14, Tailwind CSS, Framer Motion |
| State | Zustand |
| AI | OpenAI GPT-4o |
| Auth | JWT + bcrypt |

---

## Architecture

```
backend/src/
├── config/        # DB connection (Singleton)
├── models/        # Mongoose schemas
├── repositories/  # Data access layer (BaseRepository + extensions)
├── services/      # Business logic
├── controllers/   # HTTP handlers
├── middleware/    # Auth guard, error handler
├── routes/        # Express router
└── utils/         # Seed script
```

**OOP Patterns used:**
- Singleton — Database connection
- Repository Pattern — BaseRepository with generics
- Service Layer — Business logic separation
- Dependency Injection — Services instantiated in controllers

---

## Getting Started

### Backend
```bash
cd backend
npm install
npm run seed    # seed products + admin user
npm run dev     # starts on :5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev     # starts on :3000
```

### Environment
Copy `.env.example` to `.env` in `/backend` and fill in:
- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`

---

## API Endpoints

| Method | Route | Auth |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/products` | Public |
| GET | `/api/products/search?q=` | Public |
| GET/PUT | `/api/profile/style` | User |
| GET/POST/DELETE | `/api/cart/items` | User |
| POST | `/api/orders/checkout` | User |
| POST | `/api/ai/sessions/:id/chat` | User |
| PUT | `/api/admin/orders/:id/status` | Admin |

---

## Default Admin
```
Email: admin@arishopper.com
Password: admin123
```
