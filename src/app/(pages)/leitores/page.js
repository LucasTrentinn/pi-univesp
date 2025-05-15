"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../../components/navbar.js";
import Link from "next/link";

export default function Leitores() {
  const [leitores, setLeitores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeitores() {
      try {
        const response = await fetch("/api/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log("Leitores:", data);
        setLeitores(data);
      } catch (err) {
        console.error("Erro ao buscar leitores:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeitores();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Leitores Cadastrados</h2>
          <Link
            href="/leitores/adicionar"
            passHref>
            <button
              className="btn btn-primary"
              title="Adicionar"
              style={{ height: "32px", display: "flex", alignItems: "center" }}>
              <i
                className="bi bi-plus-lg"
                style={{ marginRight: "10px" }}></i>{" "}
              Adicionar
            </button>
          </Link>
        </div>

        {loading ? (
          <p>Carregando leitores...</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-center">Nome</th>
                <th
                  width="15%"
                  className="text-center">
                  Nascimento
                </th>
                <th
                  width="15%"
                  className="text-center">
                  Telefone
                </th>
                <th
                  width="20%"
                  className="text-center">
                  Cidade
                </th>
                <th
                  width="50"
                  className="text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {leitores.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center">
                    Nenhum leitor cadastrado
                  </td>
                </tr>
              ) : (
                leitores.map((leitor) => (
                  <tr key={leitor.id}>
                    <td>{leitor.nome}</td>
                    <td>
                      {new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(leitor.nascimento))}
                    </td>
                    <td>{leitor.telefone}</td>
                    <td>{leitor.cidade}</td>
                    <td className="text-center">
                      <Link
                        href={`/leitores/editar?id=${leitor.id}`}
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
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
