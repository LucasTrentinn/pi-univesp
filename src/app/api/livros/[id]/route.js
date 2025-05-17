import initDb from "@/init-db";

export async function GET(req, context) {
  const { params } = context;
  const id = params?.id;
  const db = await initDb();

  try {
    const livro = await db.get(`SELECT * FROM TB_LIVROS WHERE id = ?`, [id]);

    if (!livro) {
      return new Response(JSON.stringify({ error: "Livro não encontrado" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    return new Response(JSON.stringify(livro), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar livro" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  const id = params?.id;

  const db = await initDb();

  try {
    const body = await req.json();

    const {
      titulo,
      id_autor,
      tradutores,
      id_editora,
      ano,
      edicao,
      isbn,
      codigo_barras,
      idioma,
      id_cdd,
      colecao_volume,
      extra,
      observacao,
      fl_ativo,
      fl_tombado,
      locado,
      id_pessoa,
    } = body;

    await db.run(
      `UPDATE TB_LIVROS
       SET titulo = ?, id_autor = ?, tradutores = ?, id_editora = ?, ano = ?, edicao = ?, 
           isbn = ?, codigo_barras = ?, idioma = ?, id_cdd = ?, colecao_volume = ?, 
           extra = ?, observacao = ?, fl_ativo = ?, fl_tombado = ?, 
           locado = ?, id_pessoa = ?
       WHERE id = ?`,
      [
        titulo,
        id_autor,
        tradutores,
        id_editora,
        ano,
        edicao,
        isbn,
        codigo_barras,
        idioma,
        id_cdd,
        colecao_volume,
        extra,
        observacao,
        fl_ativo,
        fl_tombado,
        locado,
        id_pessoa,
        id,
      ]
    );

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
