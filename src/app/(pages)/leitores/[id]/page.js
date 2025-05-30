"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../../../components/navbar.js";
import Link from "next/link";
import { useParams } from "next/navigation.js";

export default function EditarLeitor() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nome: "",
    nome_responsavel: "",
    nascimento: "",
    telefone: "",
    endereco: "",
    cidade: "",
    cep: "",
    login: "",
    senha: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        if (!id) throw new Error("ID do leitor não fornecido");

        const res = await fetch(`/api/usuarios/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar dados do leitor");

        const data = await res.json();

        setFormData({
          nome: data.nome ?? "",
          nome_responsavel: data.nome_responsavel ?? "",
          nascimento: data.nascimento?.slice(0, 10) ?? "",
          telefone: data.telefone ?? "",
          endereco: data.endereco ?? "",
          cidade: data.cidade ?? "",
          cep: data.cep ?? "",
          login: data.login ?? "",
          senha: "", // senha não vem do back
        });

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
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/usuarios`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...formData }),
      });

      const result = await response.json();
      if (response.ok) {
        window.location.href = "/leitores";
      } else {
        alert("Erro: " + result.error);
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao atualizar.");
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
          <h2 className="mb-0">Editar Leitor</h2>

          <div className="d-flex gap-3">
            <Link
              href="/leitores"
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
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="nome_responsavel">Responsável</label>
              <input
                type="text"
                className="form-control"
                id="nome_responsavel"
                value={formData.nome_responsavel}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3">
              <label htmlFor="nascimento">Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                id="nascimento"
                value={formData.nascimento}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                value={formData.telefone}
                onChange={handleChange}
                maxLength={15}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                className="form-control"
                id="cep"
                value={formData.cep}
                onChange={handleChange}
                maxLength={9}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                className="form-control"
                id="cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="endereco"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                value={formData.login}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                value={formData.senha}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
