
# Portfolio Backend (Assignment 2)

Node.js + Express + MongoDB (Mongoose) backend implementing CRUD for **contacts**, **projects**, **services**, and **users**.

## Quickstart

1. **Install deps**
   ```bash
   npm install
   ```

2. **Configure env**
   ```bash
   cp .env.example .env
   # edit .env to set MONGODB_URI
   ```

3. **Run**
   ```bash
   npm run dev
   # -> http://localhost:4000
   ```

## Endpoints

- `/api/contacts` and `/api/contacts/:id`
- `/api/projects` and `/api/projects/:id`
- `/api/services` and `/api/services/:id`
- `/api/users` and `/api/users/:id`

## Sample payloads

**POST /api/contacts**
```json
{"firstname":"Ada","lastname":"Lovelace","email":"ada@example.com"}
```

**POST /api/projects**
```json
{"title":"My Portfolio","completion":"2024-10-01","description":"Personal site"}
```

**POST /api/services**
```json
{"title":"Web Development","description":"Full-stack apps"}
```

**POST /api/users**
```json
{"firstname":"Grace","lastname":"Hopper","email":"grace@navy.mil","password":"secret123"}
```

## Deploy (Render)

1. Push to GitHub
2. Create a new Web Service on Render
3. Set env var `MONGODB_URI`
4. Build: `npm install` — Start: `npm start`
