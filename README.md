# Drive Mid / Movility Fleet

Sitio público para captar socios y panel privado para consultar la flota y la inversión.

## Requisitos

- Node.js 20.9 o superior
- npm

## Puesta en marcha

1. Instalar dependencias:

```bash
npm install
```

2. Configurar las variables de entorno. Copia `.env.example` a `.env` y ajusta los valores:

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="una-cadena-larga-y-aleatoria"
```

3. Crear la base de datos y las tablas:

```bash
npx prisma migrate dev --name init
```

4. Cargar los datos iniciales desde `data/datos.json`:

```bash
npm run db:seed
```

5. Levantar el sitio:

```bash
npm run dev
```

## Accesos de prueba

- Administrador: `admin@gmail.com` / `123456` en `/admin/login`
- Socios: `omar@drivemid.com`, `zulu@drivemid.com`, `dueno3@drivemid.com`, `dueno4@drivemid.com` / `123456` en `/acceso`

## Base de datos

El proyecto usa Prisma. En desarrollo trabaja con SQLite (`prisma/dev.db`); las contraseñas se guardan con hash y la sesión se firma con un JWT en cookie httpOnly.

Para pasar a PostgreSQL:

1. En `prisma/schema.prisma`, cambia el provider:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Apunta `DATABASE_URL` a tu servidor PostgreSQL (por ejemplo Neon o Supabase).
3. Si ya generaste migraciones con SQLite, borra la carpeta `prisma/migrations` para que no se mezclen los motores.
4. Genera la migración de PostgreSQL y carga los datos:

```bash
npx prisma migrate dev --name init
npm run db:seed
```

## Scripts

- `npm run dev`: inicia el entorno de desarrollo.
- `npm run build`: compila para producción.
- `npm run db:generate`: genera el cliente de Prisma.
- `npm run db:migrate`: crea o actualiza la base en desarrollo.
- `npm run db:seed`: carga los datos iniciales.
- `npm run db:studio`: abre Prisma Studio para ver y editar la base.
