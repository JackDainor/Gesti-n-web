# Mis clientes web

App instalable (PWA) para controlar tus páginas vendidas: cliente, web, links, precio, cobro mensual, tiempo restante y quién pagó este mes.
Stack: HTML + JS, funciones de Vercel (`/api`) y base de datos Neon (Postgres).

## Puesta en marcha
1. Crea una base en https://neon.tech y copia la cadena de conexión.
2. Sube esta carpeta a un repo de GitHub.
3. En Vercel: "Add New Project" e importa el repo (sin cambiar nada más, Framework: Other).
4. En Vercel > Settings > Environment Variables agrega:
   - `DATABASE_URL` = cadena de conexión de Neon
   - `APP_PASSWORD` = la clave que usarás para entrar
5. Haz Deploy. La tabla se crea sola en el primer acceso (también está en `schema.sql`).
6. Abre la URL en el celular y elige "Instalar app" o "Añadir a pantalla de inicio".

## Probar en local
`npm i -g vercel && npm install && vercel dev` (con un archivo `.env` basado en `.env.example`).

## Notas
- "Pagó este mes" se reinicia solo cada mes: el estado depende del mes calendario actual.
- Para usar Supabase en lugar de Neon, solo cambia la conexión en `api/clientes.js`.
