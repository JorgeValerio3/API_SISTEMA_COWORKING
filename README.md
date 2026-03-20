# 🏢 API de Sistema de Coworking

Una API RESTful profesional para un sistema de reserva de espacios de coworking, construida con **Node.js**, **Express**, **TypeScript**, **MySQL** y **Redis**. Este proyecto fue desarrollado como una práctica técnica para un rol de desarrollador Backend.

---

## 🚀 Características Clave

- **🔐 Autenticación de Usuarios**: Registro, inicio de sesión y cierre de sesión seguros utilizando JWT y cookies HTTP-only.
- **📍 Gestión de Espacios**: Filtro de espacios por ubicación, tipo, capacidad y disponibilidad en tiempo real.
- **📅 Flujo de Reservas**: Crear, listar, obtener detalles, cancelar y extender reservas.
- **⚡ Rendimiento**: Redis integrado para almacenamiento en caché y acceso a datos de alta velocidad.
- **🛠️ Panel de Administración**: Acceso exclusivo para administradores para monitorear todas las reservas, estadísticas del sistema y actualizaciones de espacios.
- **📧 Notificaciones**: Notificaciones automáticas por correo electrónico vía Nodemailer.
- **🛡️ Seguridad**: Implementación de Helmet, CORS y Rate Limiting para protección.
- **📖 Documentación de la API**: Documentación autogenerada con Swagger UI.

---

## 🛠️ Stack Tecnológico

- **Núcleo**: [Node.js](https://nodejs.org/) y [Express 5](https://expressjs.com/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos**: [MySQL 8.0](https://www.mysql.com/)
- **Caché**: [Redis](https://redis.io/)
- **Validación**: [Zod](https://zod.dev/)
- **Documentación**: [Swagger](https://swagger.io/)
- **Infraestructura**: [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- **Pruebas**: [Jest](https://jestjs.io/) y [Supertest](https://github.com/ladjs/supertest)

---

## ⚙️ Prerrequisitos

Asegúrate de tener instalado lo siguiente:
- [Docker y Docker Compose](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (se recomienda v18+ para desarrollo local)
- [npm](https://www.npmjs.com/)

---

## 🐳 Primeros Pasos (con Docker)

La forma más fácil de poner en marcha el proyecto es utilizando Docker Compose, que orquesta los servicios de la API, MySQL y Redis.

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/API_Sistema_Coworkink.git
   cd API_Sistema_Coworkink
   ```

2. **Configurar variables de entorno**:
   Crea un archivo `.env` en el directorio `backend/` (puedes usar `.env.example` como plantilla).

3. **Iniciar los servicios**:
   ```bash
   docker-compose up --build
   ```

4. **Acceder a la API**:
   - La API estará disponible en `http://localhost:5000`
   - Documentación Swagger: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 💻 Configuración de Desarrollo Local

Si prefieres ejecutar los servicios individualmente:

1. **Base de Datos y Caché**: Asegúrate de tener MySQL y Redis ejecutándose en tu máquina.
2. **Configurar Backend**:
   ```bash
   cd backend
   npm install
   ```
3. **Configurar Entorno**: Copia `.env.example` a `.env` y completa tus credenciales locales.
4. **Ejecutar en Desarrollo**:
   ```bash
   npm run dev
   ```

---

## 📝 Variables de Entorno

El proyecto requiere las siguientes variables de entorno (definidas en `backend/.env`):

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `PORT` | Puerto de la API | `5000` |
| `DB_HOST` | Host de la base de datos MySQL | `localhost` o `db` |
| `DB_USER` | Usuario de la base de datos MySQL | `root` |
| `DB_PASSWORD` | Contraseña de la base de datos MySQL | `root` |
| `DB_NAME` | Nombre de la base de datos | `srec2` |
| `JWT_SECRET` | Clave secreta para tokens JWT | `tu_secreto_aqui` |
| `MAIL_USER` | Correo para notificaciones | `ejemplo@mail.com` |
| `MAIL_APP_PASSWORD` | Contraseña de aplicación para correo | `xxxx xxxx xxxx xxxx` |

---

## 🛤️ Resumen de Endpoints de la API

A continuación se presentan las categorías principales de endpoints. Para obtener detalles completos y esquemas, visita la ruta `/api-docs`.

### Autenticación (Auth)
- `POST /api/auth/register` - Crear una nueva cuenta.
- `POST /api/auth/login` - Autenticar y obtener una cookie de sesión.
- `POST /api/auth/logout` - Limpiar la sesión.

### Espacios (Spaces)
- `GET /api/spaces` - Listar todos los espacios de coworking.
- `GET /api/spaces/location/:id` - Filtrar por ubicación.
- `GET /api/spaces/availability` - Consultar espacios disponibles por fecha/hora.

### Reservas (Bookings)
- `POST /api/bookings` - Reservar un espacio.
- `GET /api/bookings` - Ver mis reservas.
- `PUT /api/bookings/:id/cancel` - Cancelar una reserva.
- `PATCH /api/bookings/:id/extend` - Extender una reserva en curso.

### Administración (Admin)
- `GET /api/admin/bookings` - Ver todas las reservas del sistema.
- `GET /api/admin/stats` - Obtener estadísticas de uso del sistema.

---

## 🧪 Pruebas (Testing)

Ejecuta el conjunto de pruebas automatizadas usando Jest:
```bash
cd backend
npm test
```

---

## 📂 Estructura del Proyecto

```text
├── backend/            # Código fuente de la aplicación principal
│   ├── config/         # Configuraciones de la app (DB, Swagger, etc.)
│   ├── controllers/    # Lógica de manejo de solicitudes
│   ├── middlewares/    # Middlewares personalizados de Express
│   ├── models/         # Modelos de base de datos y acceso
│   ├── routes/         # Definiciones de rutas de Express
│   ├── schemas/        # Esquemas de validación de Zod
│   └── app.ts          # Punto de entrada principal
├── bbdd/               # Scripts de inicialización de la base de datos
└── docker-compose.yml  # Orquestación de Docker
```

---

## 📜 Licencia

Distribuido bajo la Licencia MIT. Consulta `LICENSE` para más información.

---

**Desarrollado por [JorgeValerio3](https://github.com/JorgeValerio3)**
