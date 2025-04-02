import initDb from "@/init-db";

export async function POST(req) {
  const db = await initDb();

  try {
    const body = await req.json();
    const { titulo, autor, editora, ano, edicao, isbn, codigo_barras, idioma, cdd, colecao_volume, extra, observacao } = body;

    await db.run(
      `INSERT INTO TB_LIVROS (titulo, autor, editora, ano, edicao, isbn, codigo_barras, idioma, cdd, colecao_volume, extra, observacao) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, autor, editora, ano, edicao, isbn, codigo_barras, idioma, cdd, colecao_volume, extra, observacao]
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
  const db = await openDb();

  try {
    const livros = await db.all("SELECT * FROM TB_LIVROS");

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
