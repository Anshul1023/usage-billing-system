# 🚀 Usage & Billing System

A full-stack resource usage and billing management system that allows organizations to manage limited-capacity resources (such as meeting rooms, gym equipment, or workstations), track user sessions, and automatically generate billing based on usage duration.

The system prevents over-capacity usage, calculates accurate costs, and provides real-time session tracking through a clean UI.

---

# 📌 Features

## Resource Management

* Create, update, delete resources
* Define capacity limits
* Configure pricing per minute
* Track resource availability

## Usage Sessions

* Start and stop resource usage
* Prevent sessions when capacity is full
* Automatic duration calculation
* Real-time active session tracking

## Billing System

* Auto billing when session stops
* Duration-based pricing
* Billing history records
* Revenue and usage analytics

## UI & Integration

* Responsive React UI
* REST API integration with FastAPI
* Auto refresh sessions every 5 seconds
* Clean and professional design

---

# 🏗️ Tech Stack

## Backend

* **FastAPI** — High performance Python web framework
* **SQLAlchemy** — ORM for database operations
* **Pydantic** — Data validation and serialization
* **SQLite / PostgreSQL** — Database (configurable)
* **Uvicorn** — ASGI server

## Frontend

* **React 18**
* **TypeScript**
* **Vite**
* **Axios**
* **CSS3 (Custom styling)**

---

# 📂 Project Structure

```
usage-billing-system/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI entry point
│   │   ├── database.py      # DB connection & session
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── services.py      # Business logic layer
│   │   └── routers.py       # API routes
│   │
│   ├── venv/
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   └── usage_billing.db
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BillingList.tsx
    │   │   ├── Header.tsx
    │   │   ├── ResourceForm.tsx
    │   │   ├── ResourceList.tsx
    │   │   ├── SessionForm.tsx
    │   │   └── SessionList.tsx
    │   │
    │   ├── pages/
    │   │   ├── BillingPage.tsx
    │   │   ├── ResourcesPage.tsx
    │   │   └── SessionsPage.tsx
    │   │
    │   ├── services/
    │   │   └── api.ts
    │   │
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    │
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

---

# ⚙️ Backend Setup

## 1️⃣ Navigate to backend

```bash
cd backend
```

## 2️⃣ Create virtual environment

```bash
python -m venv venv
```

## 3️⃣ Activate environment

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

## 4️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

## 5️⃣ Run server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

Swagger Docs:

```
http://localhost:8000/docs
```

---

# 💻 Frontend Setup

## 1️⃣ Navigate to frontend

```bash
cd frontend
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Start development server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🔌 API Endpoints

## Resources

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | /resources      | Get all resources |
| POST   | /resources      | Create resource   |
| PUT    | /resources/{id} | Update resource   |
| DELETE | /resources/{id} | Delete resource   |

## Usage Sessions

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | /usage-sessions       | Get all sessions |
| POST   | /usage-sessions/start | Start session    |
| POST   | /usage-sessions/stop  | Stop session     |

## Billing

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | /billing               | Get all billing     |
| GET    | /billing/user/{id}     | Billing by user     |
| GET    | /billing/resource/{id} | Billing by resource |

---

# 🧠 System Design Overview

### Architecture Flow

Frontend → Axios → FastAPI → Services → Database

Layered Architecture:

1. Routers → API layer
2. Services → Business logic
3. Models → Database schema
4. Schemas → Validation
5. Database → Persistence

---

# 🧮 Billing Logic

Duration calculation:

```python
duration_minutes =
(end_time - start_time).total_seconds() / 60
```

Cost calculation:

```python
total_cost =
duration_minutes * price_per_minute
```

Capacity validation:

```python
if active_sessions >= resource.capacity:
    reject request
```

---

# ✅ Assignment Requirements Covered

✔ Limited capacity resources
✔ Prevent over usage
✔ Start / Stop session
✔ Usage tracking
✔ Duration calculation
✔ Automatic billing
✔ REST APIs
✔ Frontend UI
✔ Real-time updates

---

# 📊 Performance Considerations

* Indexed DB queries
* Lightweight API responses
* Auto refresh polling
* ORM optimization
* Stateless backend

---

# 🔮 Future Improvements

* Authentication & roles
* WebSocket real-time updates
* Payment gateway integration
* Admin analytics dashboard
* Reservation scheduling
* Docker deployment

---

# 👨‍💻 Author

**Anshul Rawat**
Full Stack Developer

---

# 📜 License

MIT License
