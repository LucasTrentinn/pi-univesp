import initDb from "@/init-db";

export async function POST(req) {
  const db = await initDb();

  try {
    const body = await req.json();
    const { nome, nome_responsavel, cpf, nascimento, telefone, email, redes_sociais, endereco, numero, complemento, cep, cidade, uf } = body;

    await db.run(
      `INSERT INTO TB_PESSOAS (
        ds_nome, ds_nome_responsavel, ds_cpf, dt_nascimento, ds_telefone,
        ds_email, ds_redes_sociais, ds_endereco, ds_numero, ds_complemento,
        ds_cep, ds_cidade, ds_uf, dt_inserido
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [nome, nome_responsavel, cpf, nascimento, telefone, email, redes_sociais, endereco, numero, complemento, cep, cidade, uf]
    );

    return new Response(JSON.stringify({ message: "Pessoa cadastrada com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao cadastrar pessoa:", error);
    return new Response(JSON.stringify({ error: "Erro ao cadastrar a pessoa" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET() {
  const db = await initDb();

  try {
    const pessoas = await db.all("SELECT * FROM TB_PESSOAS");
    return new Response(JSON.stringify(pessoas), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao buscar pessoas:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar pessoas" }), {
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
      return new Response(JSON.stringify({ error: "ID da pessoa é obrigatório." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const result = await db.run(`DELETE FROM TB_PESSOAS WHERE id = ?`, [id]);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Pessoa não encontrada." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Pessoa deletada com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao deletar pessoa:", error);
    return new Response(JSON.stringify({ error: "Erro ao deletar a pessoa" }), {
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
      return new Response(JSON.stringify({ error: "ID da pessoa é obrigatório para atualização." }), {
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

    const result = await db.run(`UPDATE TB_PESSOAS SET ${setClause} WHERE id = ?`, valores);

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Pessoa não encontrada ou dados iguais." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Pessoa atualizada com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar a pessoa" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
