"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../../components/navbar.js";
import Link from "next/link";

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definição mais clara dos status
  const BOOK_STATUS = {
    0: "Disponível",
    1: "Locado",
    DEFAULT: "Indisponível",
  };

  // Função para obter o status formatado
  const getBookStatus = (statusCode) => {
    return BOOK_STATUS[statusCode] || BOOK_STATUS.DEFAULT;
  };

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await fetch("/api/livros", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }

        const data = await response.json();

        setLivros(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Livros Cadastrados</h2>
          <Link
            href="/livros/adicionar"
            passHref>
            <button
              className="btn btn-primary"
              title="Adicionar"
              style={{ height: "32px", display: "flex", alignItems: "center" }}>
              <i
                className="bi bi-plus-lg"
                style={{ marginRight: "10px" }}></i>
              Adicionar
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center">
            <div
              className="spinner-border"
              role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p>Carregando livros...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th
                    width="8%"
                    className="text-center">
                    Código
                  </th>
                  <th className="text-center">Título</th>
                  <th
                    width="25%"
                    className="text-center">
                    Autor
                  </th>
                  <th
                    width="15%"
                    className="text-center">
                    Categoria
                  </th>
                  <th
                    width="8%"
                    className="text-center">
                    Ano
                  </th>
                  <th
                    width="8%"
                    className="text-center">
                    Situação
                  </th>
                  <th
                    width="50"
                    className="text-center">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {livros.map((livro) => (
                  <tr key={livro.id}>
                    <td className="text-center">{livro.id.toString().padStart(6, "0")}</td>
                    <td>{livro.titulo}</td>
                    <td>{livro.id_autor}</td>
                    <td>{livro.id_cdd}</td>
                    <td className="text-center">{livro.ano}</td>
                    <td className="text-center">
                      <span className={`badge ${livro.locado === "1" ? "bg-warning text-dark" : "bg-success"}`}>
                        {getBookStatus(Number(livro.locado))}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/livros/${livro.id}`}
                        passHref>
                        <button
                          className="btn btn-sm btn-primary"
                          title="Editar"
                          style={{
                            width: "25px",
                            height: "25px",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                          }}>
                          <i className="bi bi-pencil text-white"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {livros.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center">
                      Nenhum livro cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
