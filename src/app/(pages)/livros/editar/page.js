"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../../../components/navbar.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarLivro() {
  const router = useRouter();

  const [id, setId] = useState(null);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setId(search.get("id"));
  }, []);

  const [livro, setLivro] = useState({
    titulo: "",
    id_autor: "",
    tradutores: "",
    id_editora: "",
    edicao: "",
    ano: "",
    codigo_barras: "",
    isbn: "",
    id_cdd: "",
    idioma: "",
    colecao_volume: "",
    locado: "0",
    extra: "",
    observacao: "",
    fl_ativo: "1",
    fl_tombado: "",
    id_pessoa: "",
  });

  const [leitores, setLeitores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (!id) throw new Error("ID do livro não fornecido");

        const [livroRes, leitoresRes] = await Promise.all([fetch(`/api/livros/${id}`), fetch("/api/usuarios")]);

        if (!livroRes.ok) throw new Error("Erro ao buscar livro");
        if (!leitoresRes.ok) throw new Error("Erro ao buscar leitores");

        const livroData = await livroRes.json();
        const leitoresData = await leitoresRes.json();

        setLivro({
          ...livroData,
          locado: String(livroData.locado ?? "0"),
          tradutores: livroData.tradutores ?? "",
          colecao_volume: livroData.colecao_volume ?? "",
          extra: livroData.extra ?? "",
          observacao: livroData.observacao ?? "",
          fl_tombado: livroData.fl_tombado ?? "",
          id_pessoa: livroData.id_pessoa ?? "",
          fl_ativo: String(livroData.fl_ativo ?? "1"),
        });

        setLeitores(leitoresData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    carregarDados();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLivro((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLocadoChange = (e) => {
    const locado = e.target.value;
    setLivro((prev) => ({
      ...prev,
      locado,
      id_pessoa: locado === "1" ? prev.id_pessoa : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (livro.locado === "1" && !livro.id_pessoa) {
      alert("Por favor, selecione um leitor para livros locados.");
      return;
    }

    try {
      const response = await fetch(`/api/livros/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...livro,
          edicao: Number(livro.edicao),
          ano: Number(livro.ano),
          fl_ativo: Number(livro.fl_ativo),
          locado: Number(livro.locado),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao atualizar livro");
      }

      alert("Livro atualizado com sucesso!");
      router.push("/livros");
    } catch (err) {
      console.error("Erro:", err);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 d-flex justify-content-center">
          <div
            className="spinner-border"
            role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <div
            className="alert alert-danger"
            role="alert">
            {error}
          </div>
          <Link href="/livros">
            <button className="btn btn-primary">Voltar</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Editar Livro (ID: {id})</h2>
          <div className="d-flex gap-3">
            <Link href="/livros">
              <button className="btn btn-primary">
                <i className="bi bi-arrow-left me-2"></i>Voltar
              </button>
            </Link>
            <button
              className="btn btn-success"
              onClick={handleSubmit}>
              <i className="bi bi-save me-2"></i>Salvar
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={livro.titulo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="id_autor">Autores</label>
              <input
                type="text"
                className="form-control"
                id="id_autor"
                value={livro.id_autor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-3">
              <label htmlFor="id_editora">Editora</label>
              <input
                type="text"
                className="form-control"
                id="id_editora"
                value={livro.id_editora}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="edicao">Edição</label>
              <input
                type="number"
                className="form-control"
                id="edicao"
                value={livro.edicao}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="ano">Ano</label>
              <input
                type="number"
                className="form-control"
                id="ano"
                value={livro.ano}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="codigo_barras">Código Barras</label>
              <input
                type="text"
                className="form-control"
                id="codigo_barras"
                value={livro.codigo_barras}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="isbn">Número ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                value={livro.isbn}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-3">
              <label htmlFor="id_cdd">Classificação (CDD)</label>
              <input
                type="text"
                className="form-control"
                id="id_cdd"
                value={livro.id_cdd}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="idioma">Idioma</label>
              <input
                type="text"
                className="form-control"
                id="idioma"
                value={livro.idioma}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="colecao_volume">Coleção/Volume</label>
              <input
                type="text"
                className="form-control"
                id="colecao_volume"
                value={livro.colecao_volume || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="fl_ativo">Ativo</label>
              <select
                className="form-control"
                id="fl_ativo"
                value={livro.fl_ativo}
                onChange={handleChange}>
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </select>
            </div>
          </div>

          {/* Seção de status de locação */}
          <div className="row mt-3">
            <div className="form-group col-md-2">
              <label htmlFor="locado">Situação</label>
              <select
                className="form-control"
                id="locado"
                value={livro.locado}
                onChange={handleLocadoChange}>
                <option value="0">Disponível</option>
                <option value="1">Locado</option>
              </select>
            </div>

            {livro.locado === "1" && (
              <div className="form-group col-md-4">
                <label htmlFor="id_pessoa">Leitor</label>
                <select
                  className="form-control"
                  id="id_pessoa"
                  value={livro.id_pessoa || ""}
                  onChange={handleChange}
                  required={livro.locado === "1"}>
                  <option value="">Selecione um leitor</option>
                  {leitores.map((leitor) => (
                    <option
                      key={leitor.id}
                      value={leitor.id}>
                      {leitor.nome} (CPF: {leitor.cpf})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="form-group col-md-4">
              <label htmlFor="extra">Extra</label>
              <input
                type="text"
                className="form-control"
                id="extra"
                value={livro.extra || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="observacao">Observação/Resenha</label>
            <textarea
              className="form-control"
              id="observacao"
              rows="3"
              value={livro.observacao || ""}
              onChange={handleChange}></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}
