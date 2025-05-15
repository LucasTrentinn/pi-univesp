"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/login.css";

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: usuario, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        document.cookie = `login=true; path=/; max-age=${60 * 60 * 24}`;

        window.location.href = "/livros";
      } else {
        alert(data.error || "Erro ao fazer login");
      }
    } catch (err) {
      console.error("Erro ao enviar login:", err);
      alert("Erro inesperado.");
    }
  };

  return (
    <div className="text-center">
      <form
        className="form-signin"
        onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src="/img/logo.png"
          alt=""
          width="72"
          height="72"
          style={{ borderRadius: "15px" }}
        />

        <input
          type="text"
          id="usuario"
          className="form-control"
          placeholder="Usuário"
          required
        />
        <input
          type="password"
          id="senha"
          className="form-control"
          placeholder="Senha"
          required
        />

        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
