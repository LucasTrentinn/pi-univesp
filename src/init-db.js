import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

async function initDb() {
  const db = await open({
    filename: path.join(process.cwd(), "dados.db"),
    driver: sqlite3.Database,
  });

  // Tabela TB_PESSOAS
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_PESSOAS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      nome_responsavel TEXT,
      cpf TEXT UNIQUE NOT NULL,
      nascimento DATE NOT NULL,
      telefone TEXT,
      email TEXT,
      redes_sociais TEXT,
      endereco TEXT,
      numero TEXT NOT NULL,
      complemento TEXT,
      cep TEXT NOT NULL,
      cidade TEXT NOT NULL,
      uf TEXT NOT NULL,
      dt_inserido DATETIME NOT NULL
    );
  `);

  // Tabela TB_LOGIN
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_LOGIN (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pessoa INTEGER NOT NULL,
      login TEXT NOT NULL,
      senha TEXT NOT NULL,
      fl_ativo INTEGER,
      fl_administrador INTEGER,
      dt_inserido DATETIME NOT NULL,
      FOREIGN KEY (id_pessoa) REFERENCES TB_PESSOAS(id)
    );
  `);

  // Tabela TB_CDD
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_CDD (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cd_assunto INTEGER NOT NULL,
      ds_assunto TEXT NOT NULL,
      cd_categoria INTEGER NOT NULL,
      ds_categoria TEXT NOT NULL,
      cd_genero INTEGER NOT NULL,
      ds_genero TEXT NOT NULL,
      dt_inserido DATETIME NOT NULL
    );
  `);

  // Tabela TB_AUTOR
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_AUTOR (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ds_autor TEXT NOT NULL,
      dt_inserido DATETIME NOT NULL
    );
  `);

  // Tabela TB_EDITORA
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_EDITORA (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ds_editora TEXT NOT NULL,
      dt_inserido DATETIME NOT NULL
    );
  `);

  // Tabela TB_LIVROS
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_LIVROS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      id_autor INTEGER NOT NULL,
      tradutores TEXT,
      id_editora INTEGER NOT NULL,
      edicao INTEGER NOT NULL,
      ano INTEGER NOT NULL,
      codigo_barras TEXT NOT NULL,
      isbn TEXT NOT NULL,
      id_cdd INTEGER NOT NULL,
      idioma TEXT NOT NULL,
      colecao_volume TEXT,
      extra TEXT,
      observacao TEXT,
      fl_ativo INTEGER,
      fl_tombado TEXT,
      dt_inserido DATETIME NOT NULL,
      FOREIGN KEY (id_autor) REFERENCES TB_AUTOR(id),
      FOREIGN KEY (id_editora) REFERENCES TB_EDITORA(id),
      FOREIGN KEY (id_cdd) REFERENCES TB_CDD(id)
    );
  `);

  // Tabela TB_EMPRESTIMO
  await db.exec(`
    CREATE TABLE IF NOT EXISTS TB_EMPRESTIMO (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pessoa INTEGER NOT NULL,
      id_livro INTEGER NOT NULL,
      dt_emprestimo DATETIME NOT NULL,
      dt_devolucao DATETIME,
      status TEXT,
      observacao TEXT,
      FOREIGN KEY (id_pessoa) REFERENCES TB_PESSOAS(id),
      FOREIGN KEY (id_livro) REFERENCES TB_LIVROS(id)
    );
  `);

  console.log("Banco de dados inicializado com sucesso!");
  return db;
}

initDb().catch(console.error);

export default initDb;
