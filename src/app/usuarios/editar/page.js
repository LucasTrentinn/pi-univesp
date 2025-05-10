"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../components/navbar.js";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div>
			<Navbar />
			<div className="container mt-5">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2 className="mb-0">Editar Usuário</h2>
					
					<div className="d-flex gap-3">
						<Link href="/usuarios" passHref>
							<button
								className="btn btn-primary"
								title="Voltar"
								style={{ height: "32px", display: "flex", alignItems: "center" }}
							>
								<i className="bi bi-arrow-left" style={{ marginRight: "10px" }}></i>
								Voltar
							</button>
						</Link>

						<button
							className="btn btn-success"
							title="Salvar"
							style={{ height: "32px", display: "flex", alignItems: "center" }}
						>
							<i className="bi bi-save" style={{ marginRight: "10px" }}></i>
							Salvar
						</button>
					</div>
				</div>
				<form>
					<div className="row">
						<div className="form-group col-md-2">
							<label htmlFor="userid">UserID</label>
							<input type="text" className="form-control" id="userid" />
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="nome">Nome</label>
							<input type="text" className="form-control" id="nome" />
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="extra">Extra</label>
							<input type="text" className="form-control" id="extra" />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-3">
							<label htmlFor="senha">Senha</label>
							<div className="input-group">
								<input
									type={showPassword ? "text" : "password"}
									className="form-control"
									id="senha"
								/>
								<span
									className="input-group-text"
									style={{ cursor: "pointer" }}
									onClick={() => setShowPassword((prev) => !prev)}
								>
									<i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
								</span>
							</div>
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="status">Status</label>
							<select className="form-control" id="status" defaultValue="">
								<option value="1">Ativo</option>
								<option value="2">Inativo</option>
							</select>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}