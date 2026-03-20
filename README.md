# 🏢 Coworking System API

A professional RESTful API for a coworking space reservation system, built with **Node.js**, **Express**, **TypeScript**, **MySQL**, and **Redis**. This project was developed as a technical practice for a Backend developer role.

---

## 🚀 Key Features

- **🔐 User Authentication**: Secure registration, login, and logout using JWT and HTTP-only cookies.
- **📍 Space Management**: Filter spaces by location, type, capacity, and real-time availability.
- **📅 Booking Flow**: Create, list, get details, cancel, and extend bookings.
- **⚡ Performance**: Integrated Redis for caching and high-speed data access.
- **🛠️ Admin Panel**: Exclusive access for administrators to monitor all bookings, system stats, and space updates.
- **📧 Notifications**: Automated email notifications via Nodemailer.
- **🛡️ Security**: Helmet, CORS, and Rate Limiting implemented for protection.
- **📖 API Documentation**: Auto-generated documentation with Swagger UI.

---

## 🛠️ Tech Stack

- **Core**: [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MySQL 8.0](https://www.mysql.com/)
- **Cache**: [Redis](https://redis.io/)
- **Validation**: [Zod](https://zod.dev/)
- **Documentation**: [Swagger](https://swagger.io/)
- **Infrastructure**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Testing**: [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)

---

## ⚙️ Prerequisites

Ensure you have the following installed:
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (v18+ recommended, for local development)
- [npm](https://www.npmjs.com/)

---

## 🐳 Getting Started (with Docker)

The easiest way to get the project running is using Docker Compose, which orchestrates the API, MySQL, and Redis services.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/API_Sistema_Coworkink.git
   cd API_Sistema_Coworkink
   ```

2. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory (you can use `.env.example` as a template).

3. **Start the services**:
   ```bash
   docker-compose up --build
   ```

4. **Access the API**:
   - The API will be available at `http://localhost:5000`
   - Swagger documentation: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 💻 Local Development Setup

If you prefer to run the services individually:

1. **Database & Cache**: Ensure you have MySQL and Redis running on your machine.
2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   ```
3. **Configure Environment**: Copy `.env.example` to `.env` and fill in your local credentials.
4. **Run in Development**:
   ```bash
   npm run dev
   ```

---

## 📝 Environment Variables

The project requires the following environment variables (defined in `backend/.env`):

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | API Port | `5000` |
| `DB_HOST` | MySQL database host | `localhost` or `db` |
| `DB_USER` | MySQL database user | `root` |
| `DB_PASSWORD` | MySQL database password | `root` |
| `DB_NAME` | Database name | `srec2` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_here` |
| `MAIL_USER` | Email for notifications | `example@mail.com` |
| `MAIL_APP_PASSWORD` | App-specific password for email | `xxxx xxxx xxxx xxxx` |

---

## 🛤️ API Endpoints Summary

Below are the main categories of endpoints. For full details and schemas, visit the `/api-docs` route.

### Auth
- `POST /api/auth/register` - Create a new account.
- `POST /api/auth/login` - Authenticate and get a session cookie.
- `POST /api/auth/logout` - Clear the session.

### Spaces
- `GET /api/spaces` - List all coworking spaces.
- `GET /api/spaces/location/:id` - Filter by location.
- `GET /api/spaces/availability` - Check available spaces for a date/time.

### Bookings
- `POST /api/bookings` - Reserve a space.
- `GET /api/bookings` - View my bookings.
- `PUT /api/bookings/:id/cancel` - Cancel a reservation.
- `PATCH /api/bookings/:id/extend` - Extend an ongoing booking.

### Admin
- `GET /api/admin/bookings` - View all bookings across the system.
- `GET /api/admin/stats` - Get system usage statistics.

---

## 🧪 Testing

Run the automated test suite using Jest:
```bash
cd backend
npm test
```

---

## 📂 Project Structure

```text
├── backend/            # Main application source code
│   ├── config/         # App configurations (DB, Swagger, etc.)
│   ├── controllers/    # Request handling logic
│   ├── middlewares/    # Custom Express middlewares
│   ├── models/         # Database models & access
│   ├── routes/         # Express route definitions
│   ├── schemas/        # Zod validation schemas
│   └── app.ts          # Main entry point
├── bbdd/               # Database initialization scripts
└── docker-compose.yml  # Docker orchestration
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by [JorgeValerio3](https://github.com/JorgeValerio3)**
