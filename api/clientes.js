import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
let listo = false;

async function iniciar() {
  if (listo) return;
  await sql`CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY, cliente TEXT NOT NULL, web TEXT, url TEXT, github TEXT, whatsapp TEXT,
    precio NUMERIC DEFAULT 0, mensual NUMERIC DEFAULT 0, inicio DATE DEFAULT CURRENT_DATE,
    meses INT DEFAULT 12, meses_gratis INT DEFAULT 0, pagado_mes TEXT, creado TIMESTAMPTZ DEFAULT now())`;
  // Migración suave por si la tabla ya existía sin las columnas nuevas
  await sql`ALTER TABLE clientes ADD COLUMN IF NOT EXISTS whatsapp TEXT`;
  await sql`ALTER TABLE clientes ADD COLUMN IF NOT EXISTS meses_gratis INT DEFAULT 0`;
  listo = true;
}

export default async function handler(req, res) {
  if (req.headers['x-password'] !== process.env.APP_PASSWORD) {
    return res.status(401).json({ error: 'Clave incorrecta' });
  }
  try {
    await iniciar();
    const b = req.body || {};
    const id = req.query.id;
    if (req.method === 'GET') {
      const rows = await sql`SELECT id, cliente, web, url, github, whatsapp,
        precio::float AS precio, mensual::float AS mensual,
        to_char(inicio,'YYYY-MM-DD') AS inicio, meses, COALESCE(meses_gratis, 0) AS meses_gratis, pagado_mes
        FROM clientes ORDER BY cliente`;
      return res.json(rows);
    }
    if (req.method === 'POST') {
      await sql`INSERT INTO clientes (cliente, web, url, github, whatsapp, precio, mensual, inicio, meses, meses_gratis)
        VALUES (${b.cliente}, ${b.web}, ${b.url}, ${b.github}, ${b.whatsapp || null},
        ${b.precio || 0}, ${b.mensual || 0},
        ${b.inicio || new Date().toISOString().slice(0, 10)}, ${b.meses || 12}, ${b.meses_gratis || 0})`;
      return res.json({ ok: true });
    }
    if (req.method === 'PUT') {
      await sql`UPDATE clientes SET cliente=${b.cliente}, web=${b.web}, url=${b.url}, github=${b.github},
        whatsapp=${b.whatsapp || null},
        precio=${b.precio || 0}, mensual=${b.mensual || 0}, inicio=${b.inicio}, meses=${b.meses || 12},
        meses_gratis=${b.meses_gratis || 0},
        pagado_mes=${b.pagado_mes || null} WHERE id=${id}`;
      return res.json({ ok: true });
    }
    if (req.method === 'DELETE') {
      await sql`DELETE FROM clientes WHERE id=${id}`;
      return res.json({ ok: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
