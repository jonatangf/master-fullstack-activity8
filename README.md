# Blog API

API REST para gestionar posts y autores de un blog, desarrollada con Express.js y MySQL.

## Requisitos

- Node.js
- MySQL

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

Editar `.env` con las credenciales de MySQL:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_PORT=3306
DB_NAME=blog_db
```

## Base de datos

Ejecutar el script SQL para crear la base de datos y tablas:

```bash
mysql -u root -p < database.sql
```

### Estructura de tablas

**authors**
- id, name, email, image, created_at, updated_at

**posts**
- id, title, description, category, author_id (FK), created_at, updated_at

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

### Authors `/api/authors`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/authors` | Listar autores |
| GET | `/api/authors/:id` | Obtener autor |
| POST | `/api/authors` | Crear autor |
| PUT | `/api/authors/:id` | Actualizar autor |
| DELETE | `/api/authors/:id` | Eliminar autor |

### Posts `/api/posts`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/posts` | Listar posts |
| GET | `/api/posts/:id` | Obtener post |
| GET | `/api/posts/author/:authorId` | Posts de un autor |
| POST | `/api/posts` | Crear post |
| PUT | `/api/posts/:id` | Actualizar post |
| DELETE | `/api/posts/:id` | Eliminar post |

Cada post incluye los datos completos del autor, no solo el ID.
