"use client";

import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/livros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message || "Erro ao cadastrar");
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      alert("Erro ao cadastrar livro");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow p-4 w-100"
        style={{ maxWidth: "600px" }}>
        <h2 className="mb-4 text-center">Cadastro de Livro</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="row g-3">
          <div className="col-md-6">
            <input
              {...register("titulo")}
              className="form-control"
              placeholder="Título"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("autor")}
              className="form-control"
              placeholder="Autor"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("editora")}
              className="form-control"
              placeholder="Editora"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("ano")}
              type="number"
              className="form-control"
              placeholder="Ano"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("edicao")}
              type="number"
              className="form-control"
              placeholder="Edição"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("isbn")}
              className="form-control"
              placeholder="ISBN"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("codigo_barras")}
              className="form-control"
              placeholder="Código de Barras"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("idioma")}
              className="form-control"
              placeholder="Idioma"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("cdd")}
              className="form-control"
              placeholder="CDD"
              required
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("colecao_volume")}
              className="form-control"
              placeholder="Coleção/Volume"
            />
          </div>
          <div className="col-md-6">
            <input
              {...register("extra")}
              className="form-control"
              placeholder="Extra"
            />
          </div>
          <div className="col-12">
            <textarea
              {...register("observacao")}
              className="form-control"
              placeholder="Observação"></textarea>
          </div>
          <div className="col-12 text-end">
            <button
              type="submit"
              className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
