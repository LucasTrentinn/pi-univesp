"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../../../components/navbar.js";
import Link from "next/link";
import { useRouter } from "next/navigation.js";

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    titulo: "",
    id_autor: "",
    id_editora: "",
    ano: "",
    edicao: "",
    isbn: "",
    codigo_barras: "",
    idioma: "",
    id_cdd: "",
    colecao_volume: "",
    extra: "",
    observacao: "",
    locado: "0",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/livros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/livros");
      } else {
        console.log("Erro:", result.error);
        alert(result.error || "Erro ao cadastrar livro");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Adicionar Livro</h2>

          <div className="d-flex gap-3">
            <Link
              href="/livros"
              passHref>
              <button
                className="btn btn-primary"
                title="Voltar"
                style={{ height: "32px", display: "flex", alignItems: "center" }}>
                <i
                  className="bi bi-arrow-left"
                  style={{ marginRight: "10px" }}></i>
                Voltar
              </button>
            </Link>

            <button
              className="btn btn-success"
              title="Salvar"
              onClick={handleSubmit}
              style={{ height: "32px", display: "flex", alignItems: "center" }}>
              <i
                className="bi bi-save"
                style={{ marginRight: "10px" }}></i>
              Salvar
            </button>
          </div>
        </div>

        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={formData.titulo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="id_autor">ID Autor</label>
              <input
                type="text"
                className="form-control"
                id="id_autor"
                value={formData.id_autor}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="id_editora">ID Editora</label>
              <input
                type="text"
                className="form-control"
                id="id_editora"
                value={formData.id_editora}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-2">
              <label htmlFor="edicao">Edição</label>
              <input
                type="text"
                className="form-control"
                id="edicao"
                value={formData.edicao}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="ano">Ano</label>
              <input
                type="number"
                className="form-control"
                id="ano"
                value={formData.ano}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="codigo_barras">Código de Barras</label>
              <input
                type="text"
                className="form-control"
                id="codigo_barras"
                value={formData.codigo_barras}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3">
              <label htmlFor="idioma">Idioma</label>
              <input
                type="text"
                className="form-control"
                id="idioma"
                value={formData.idioma}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="id_cdd">ID CDD</label>
              <input
                type="text"
                className="form-control"
                id="id_cdd"
                value={formData.id_cdd}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="colecao_volume">Coleção/Volume</label>
              <input
                type="text"
                className="form-control"
                id="colecao_volume"
                value={formData.colecao_volume}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="extra">Extra</label>
              <input
                type="text"
                className="form-control"
                id="extra"
                value={formData.extra}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="observacao">Resenha</label>
            <textarea
              className="form-control"
              id="observacao"
              rows="3"
              value={formData.observacao}
              onChange={handleChange}></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
