CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  cliente TEXT NOT NULL,
  web TEXT,
  url TEXT,
  github TEXT,
  precio NUMERIC DEFAULT 0,
  mensual NUMERIC DEFAULT 0,
  inicio DATE DEFAULT CURRENT_DATE,
  meses INT DEFAULT 12,
  pagado_mes TEXT,
  creado TIMESTAMPTZ DEFAULT now()
);
