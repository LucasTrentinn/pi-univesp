import initDb from "@/init-db";

export async function POST(req) {
  const db = await initDb();

  try {
    const { login, senha } = await req.json();

    if (!login || !senha) {
      return new Response(JSON.stringify({ error: "Login e senha são obrigatórios" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const user = await db.get(
      `SELECT TL.*, TP.nome FROM TB_LOGIN TL
       INNER JOIN TB_PESSOAS TP ON TL.id_pessoa = TP.id
       WHERE TL.login = ? AND TL.senha = ? AND TL.fl_ativo = 1`,
      [login, senha]
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "Credenciais inválidas" }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Login bem-sucedido",
        user: {
          id: user.id_pessoa,
          nome: user.nome, // Alterado de 'ds_nome' para 'nome'
          administrador: user.fl_administrador === 1,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return new Response(JSON.stringify({ error: "Erro interno no login" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
