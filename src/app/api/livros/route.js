import initDb from "@/init-db";

export async function POST(req) {
  const db = await initDb();

  try {
    const body = await req.json();
    const { titulo, id_autor, id_editora, ano, edicao, isbn, codigo_barras, idioma, id_cdd, colecao_volume, extra, observacao } = body;

    await db.run(
      `INSERT INTO TB_LIVROS (
        titulo, id_autor, id_editora, ano, edicao,
        isbn, codigo_barras, idioma, id_cdd, colecao_volume,
        extra, observacao, dt_inserido
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [titulo, id_autor, id_editora, ano, edicao, isbn, codigo_barras, idioma, id_cdd, colecao_volume, extra, observacao]
    );

    return new Response(JSON.stringify({ message: "Livro cadastrado com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
    return new Response(JSON.stringify({ error: "Erro ao cadastrar o livro" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET() {
  const db = await initDb();

  try {
    const livros = await db.all(`
      SELECT l.id, l.titulo, a.ds_autor as autor, e.ds_editora as editora,
             l.ano, l.edicao, l.isbn, l.codigo_barras, l.idioma,
             c.ds_assunto || ' / ' || c.ds_categoria || ' / ' || c.ds_genero AS cdd,
             l.colecao_volume, l.extra, l.observacao
      FROM TB_LIVROS l
      JOIN TB_AUTOR a ON l.id_autor = a.id
      JOIN TB_EDITORA e ON l.id_editora = e.id
      JOIN TB_CDD c ON l.id_cdd = c.id
    `);

    return new Response(JSON.stringify(livros), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar livros" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function DELETE(req) {
  const db = await initDb();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "ID do livro é obrigatório." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const result = await db.run(`DELETE FROM TB_LIVROS WHERE id = ?`, [id]);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Livro não encontrado." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Livro deletado com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return new Response(JSON.stringify({ error: "Erro ao deletar o livro" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function PATCH(req) {
  const db = await initDb();

  try {
    const body = await req.json();
    const { id, ...campos } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID do livro é obrigatório para atualização." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const colunas = Object.keys(campos);
    const valores = Object.values(campos);

    if (colunas.length === 0) {
      return new Response(JSON.stringify({ error: "Nenhum campo para atualizar." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const setClause = colunas.map((col) => `${col} = ?`).join(", ");
    valores.push(id);

    const result = await db.run(`UPDATE TB_LIVROS SET ${setClause} WHERE id = ?`, valores);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Livro não encontrado ou dados iguais." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Livro atualizado com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar o livro" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
