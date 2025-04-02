import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

async function initDb() {
  const db = await open({
    filename: path.join(process.cwd(), "dados.db"), // Caminho do banco de dados
    driver: sqlite3.Database,
  });

  // Criar tabela se não existir
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_LIVROS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      autor TEXT NOT NULL,
      editora TEXT NOT NULL,
      ano INTEGER NOT NULL,
      edicao INTEGER NOT NULL,
      isbn TEXT NOT NULL,
      codigo_barras TEXT NOT NULL,
      idioma TEXT NOT NULL,
      cdd TEXT NOT NULL,
      colecao_volume TEXT,
      extra TEXT,
      observacao TEXT
    );
  `);

  console.log("Banco de dados inicializado com sucesso!");

  return db;
}

initDb().catch(console.error);

export default initDb;
