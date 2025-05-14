import initDb from "@/init-db";

export async function POST(req) {
  const db = await initDb();

  try {
    const body = await req.json();
    const { ds_editora } = body;

    await db.run(`INSERT INTO TB_EDITORA (ds_editora, dt_inserido) VALUES (?, datetime('now'))`, [ds_editora]);

    return new Response(JSON.stringify({ message: "Editora cadastrada com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao cadastrar editora:", error);
    return new Response(JSON.stringify({ error: "Erro ao cadastrar a editora" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET() {
  const db = await initDb();

  try {
    const editoras = await db.all("SELECT * FROM TB_EDITORA");

    return new Response(JSON.stringify(editoras), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao buscar editoras:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar editoras" }), {
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
      return new Response(JSON.stringify({ error: "ID da editora é obrigatório." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const result = await db.run(`DELETE FROM TB_EDITORA WHERE id = ?`, [id]);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Editora não encontrada." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Editora deletada com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao deletar editora:", error);
    return new Response(JSON.stringify({ error: "Erro ao deletar a editora" }), {
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
      return new Response(JSON.stringify({ error: "ID da editora é obrigatório para atualização." }), {
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

    const result = await db.run(`UPDATE TB_EDITORA SET ${setClause} WHERE id = ?`, valores);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Editora não encontrada ou dados iguais." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Editora atualizada com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao atualizar editora:", error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar a editora" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
