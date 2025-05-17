import initDb from "@/init-db";

export async function GET(req, context) {
  const { params } = context;
  const id = params?.id;
  const db = await initDb();

  try {
    const pessoa = await db.get("SELECT * FROM TB_PESSOAS WHERE id = ?", [id]);
    if (!pessoa) {
      return new Response(JSON.stringify({ error: "Pessoa não encontrada" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(pessoa), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao buscar pessoa:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar pessoa" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
