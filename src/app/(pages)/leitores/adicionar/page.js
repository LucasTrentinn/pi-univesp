"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../../../components/navbar.js";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    nome_responsavel: "",
    cpf: "",
    nascimento: "",
    telefone: "",
    email: "",
    redes_sociais: "",
    endereco: "",
    numero: "",
    complemento: "",
    cep: "",
    cidade: "",
    uf: "",
    login: "",
    senha: "",
    fl_administrador: 0,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Leitor cadastrado com sucesso!");
        router.push("/leitores");
      } else {
        const error = await res.json();
        alert("Erro: " + error.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar cadastrar leitor.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Adicionar Leitor</h2>
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
              style={{ height: "32px", display: "flex", alignItems: "center" }}
              onClick={handleSubmit}>
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
                value={form.nome}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="nome_responsavel">Responsável</label>
              <input
                type="text"
                className="form-control"
                id="nome_responsavel"
                value={form.nome_responsavel}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-3">
              <label htmlFor="nascimento">Nascimento</label>
              <input
                type="date"
                className="form-control"
                id="nascimento"
                value={form.nascimento}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                value={form.cpf}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="form-control"
                id="telefone"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-4">
              <label htmlFor="redes_sociais">Redes Sociais</label>
              <input
                type="text"
                className="form-control"
                id="redes_sociais"
                value={form.redes_sociais}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                className="form-control"
                id="cep"
                value={form.cep}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                className="form-control"
                id="cidade"
                value={form.cidade}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                className="form-control"
                id="endereco"
                value={form.endereco}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="numero">Número</label>
              <input
                type="text"
                className="form-control"
                id="numero"
                value={form.numero}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                className="form-control"
                id="complemento"
                value={form.complemento}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="uf">UF</label>
              <input
                type="text"
                className="form-control"
                id="uf"
                value={form.uf}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                value={form.login}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                className="form-control"
                id="senha"
                value={form.senha}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
