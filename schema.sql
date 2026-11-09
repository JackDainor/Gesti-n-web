CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  cliente TEXT NOT NULL,
  web TEXT,
  url TEXT,
  github TEXT,
  whatsapp TEXT,
  precio NUMERIC DEFAULT 0,
  mensual NUMERIC DEFAULT 0,
  inicio DATE DEFAULT CURRENT_DATE,
  meses INT DEFAULT 12,
  meses_gratis INT DEFAULT 0,
  pagado_mes TEXT,
  creado TIMESTAMPTZ DEFAULT now()
);

-- Si la tabla ya existe, agrega las columnas nuevas (seguro de ejecutar varias veces)
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE clientes ADD COLUMN IF NOT EXISTS meses_gratis INT DEFAULT 0;
