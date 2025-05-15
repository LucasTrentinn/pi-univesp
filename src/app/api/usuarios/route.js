import initDb from "@/init-db";

export async function POST(req) {
  const db = await initDb();

  try {
    const body = await req.json();
    const {
      nome,
      nome_responsavel,
      cpf,
      nascimento,
      telefone,
      email,
      redes_sociais,
      endereco,
      numero,
      complemento,
      cep,
      cidade,
      uf,
      login,
      senha,
      fl_administrador = 0,
    } = body;

    await db.run("BEGIN");

    const result = await db.run(
      `INSERT INTO TB_PESSOAS (
        nome, nome_responsavel, cpf, nascimento, telefone,
        email, redes_sociais, endereco, numero, complemento,
        cep, cidade, uf, dt_inserido
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [nome, nome_responsavel, cpf, nascimento, telefone, email, redes_sociais, endereco, numero, complemento, cep, cidade, uf]
    );

    const idPessoa = result.lastID;

    await db.run(
      `INSERT INTO TB_LOGIN (
        id_pessoa, login, senha, fl_ativo, fl_administrador, dt_inserido
      ) VALUES (?, ?, ?, 1, ?, datetime('now'))`,
      [idPessoa, login, senha, fl_administrador]
    );

    await db.run("COMMIT");

    return new Response(JSON.stringify({ message: "Pessoa e login cadastrados com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    await db.run("ROLLBACK");
    console.error("Erro ao cadastrar pessoa e login:", error);
    return new Response(JSON.stringify({ error: "Erro ao cadastrar pessoa e login" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET() {
  const db = await initDb();

  try {
    const pessoas = await db.all(`
      SELECT
        TP.*, TL.login, TL.fl_administrador, TL.fl_ativo
      FROM TB_PESSOAS TP
      LEFT JOIN TB_LOGIN TL ON TP.id = TL.id_pessoa
    `);

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

    await db.run("BEGIN");

    await db.run(`DELETE FROM TB_LOGIN WHERE id_pessoa = ?`, [id]);
    const result = await db.run(`DELETE FROM TB_PESSOAS WHERE id = ?`, [id]);

    await db.run("COMMIT");

    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Pessoa não encontrada." }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: "Pessoa e login deletados com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    await db.run("ROLLBACK");
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
    const { id, login, senha, fl_administrador, fl_ativo, ...dadosPessoais } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "ID da pessoa é obrigatório para atualização." }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    await db.run("BEGIN");

    // Atualiza dados da TB_PESSOAS
    const colunas = Object.keys(dadosPessoais);
    const valores = Object.values(dadosPessoais);

    if (colunas.length > 0) {
      const setClause = colunas.map((col) => `${col} = ?`).join(", ");
      valores.push(id);

      await db.run(`UPDATE TB_PESSOAS SET ${setClause} WHERE id = ?`, valores);
    }

    // Atualiza dados da TB_LOGIN
    if (login || senha || fl_administrador != null || fl_ativo != null) {
      const camposLogin = [];
      const valoresLogin = [];

      if (login) {
        camposLogin.push("login = ?");
        valoresLogin.push(login);
      }

      if (senha) {
        camposLogin.push("senha = ?");
        valoresLogin.push(senha);
      }

      if (fl_administrador != null) {
        camposLogin.push("fl_administrador = ?");
        valoresLogin.push(fl_administrador);
      }

      if (fl_ativo != null) {
        camposLogin.push("fl_ativo = ?");
        valoresLogin.push(fl_ativo);
      }

      if (camposLogin.length > 0) {
        valoresLogin.push(id);
        await db.run(`UPDATE TB_LOGIN SET ${camposLogin.join(", ")} WHERE id_pessoa = ?`, valoresLogin);
      }
    }

    await db.run("COMMIT");

    return new Response(JSON.stringify({ message: "Pessoa e login atualizados com sucesso!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    await db.run("ROLLBACK");
    console.error("Erro ao atualizar pessoa:", error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar a pessoa" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
