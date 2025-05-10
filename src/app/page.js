"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
export default function Home() {
	
  return (
	<div className="text-center">
		<form className="form-signin">
			<img
			  className="mb-4"
			  src="/img/logo.png"
			  alt=""
			  width="72"
			  height="72"
			  style={{ borderRadius: "15px" }}
			/>
		
			<input type="text" id="usuario" className="form-control" placeholder="Usuário" required />
			<input type="password" id="senha" className="form-control" placeholder="Senha" required />
		
			<button className="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
		</form>
	</div>
  );
}
