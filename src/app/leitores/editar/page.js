"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../../components/navbar.js";
import Link from "next/link";

export default function Home() {

	return (
		<div>
			<Navbar />
			<div className="container mt-5">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2 className="mb-0">Editar Leitor</h2>
					
					<div className="d-flex gap-3">
						<Link href="/leitores" passHref>
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
						<div className="form-group col-md-6">
							<label htmlFor="nome">Nome</label>
							<input type="text" className="form-control" id="nome" />
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="responsavel">Responsável</label>
							<input type="text" className="form-control" id="responsavel" />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-3">
							<label htmlFor="dataNascimento">Data de Nascimento</label>
							<input type="date" className="form-control" id="dataNascimento" />
						</div>
						<div className="form-group col-md-3">
							<label htmlFor="dataFicha">Data da Ficha</label>
							<input type="date" className="form-control" id="dataFicha" />
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="telefone">Número de Telefone</label>
							<input
								type="text"
								className="form-control"
								id="telefone"
								maxLength={15}
								onInput={e => {
									let v = e.target.value.replace(/\D/g, "");
									if (v.length > 11) v = v.slice(0, 11);
									if (v.length > 0) v = "(" + v;
									if (v.length > 3) v = v.slice(0, 3) + ") " + v.slice(3);
									if (v.length > 10) v = v.slice(0, 10) + "-" + v.slice(10);
									e.target.value = v;
								}}
							/>
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="cep">CEP</label>
							<input
								type="text"
								className="form-control"
								id="cep"
								maxLength={9}
								onInput={e => {
									let v = e.target.value.replace(/\D/g, "");
									if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5, 8);
									e.target.value = v;
								}}
							/>
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-6">
							<label htmlFor="cidade">Cidade</label>
							<input type="text" className="form-control" id="cidade" />
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="endereco">Endereço</label>
							<input type="text" className="form-control" id="endereco" />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}