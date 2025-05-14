import initDb from "@/init-db";

export async function POST(req) {
  const db = await initDb();

  try {
    const body = await req.json();
    const { ds_autor } = body;

    await db.run(`INSERT INTO TB_AUTOR (ds_autor, dt_inserido) VALUES (?, datetime('now'))`, [ds_autor]);

    return new Response(JSON.stringify({ message: "Autor cadastrado com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao cadastrar autor:", error);
    return new Response(JSON.stringify({ error: "Erro ao cadastrar autor" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET() {
  const db = await initDb();

  try {
    const autores = await db.all("SELECT * FROM TB_AUTOR");

    return new Response(JSON.stringify(autores), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao buscar autores:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar autores" }), {
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
      return new Response(JSON.stringify({ error: "ID do autor é obrigatório." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const result = await db.run("DELETE FROM TB_AUTOR WHERE id = ?", [id]);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Autor não encontrado." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Autor deletado com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao deletar autor:", error);
    return new Response(JSON.stringify({ error: "Erro ao deletar autor" }), {
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
      return new Response(JSON.stringify({ error: "ID do autor é obrigatório para atualização." }), {
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

    const result = await db.run(`UPDATE TB_AUTOR SET ${setClause} WHERE id = ?`, valores);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Autor não encontrado ou dados iguais." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Autor atualizado com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao atualizar autor:", error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar autor" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
