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
					<h2 className="mb-0">Livros Cadastrados</h2>
					
					<div className="d-flex gap-3">
						<Link href="/livros" passHref>
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
							<label htmlFor="codigo">Código</label>
							<input type="text" className="form-control" id="codigo" />
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="titulo">Título</label>
							<input type="text" className="form-control" id="titulo" />
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="autores">Autores</label>
							<input type="text" className="form-control" id="autores" />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-3">
							<label htmlFor="editora">Editora</label>
							<input type="text" className="form-control" id="editora" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="edicao">Edição</label>
							<input type="number" className="form-control" id="edicao" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="ano">Ano</label>
							<input type="number" className="form-control" id="ano" />
						</div>
						<div className="form-group col-md-3">
							<label htmlFor="codigoBarras">Código Barras</label>
							<input type="text" className="form-control" id="codigoBarras" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="isbn">Número ISBN</label>
							<input type="text" className="form-control" id="isbn" />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-3">
							<label htmlFor="localizacao">Localização</label>
							<input type="text" className="form-control" id="localizacao" />
						</div>
						<div className="form-group col-md-3">
							<label htmlFor="prazoEmprestimo">Prazo Empréstimo</label>
							<input type="number" className="form-control" id="prazoEmprestimo" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="situacao">Situação</label>
							<select className="form-control" id="situacao" defaultValue="">
								<option value="1">Livre</option>
								<option value="2">Locado</option>
							</select>
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="idioma">Idioma</label>
							<input type="text" className="form-control" id="idioma" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="aquisicao">Aquisição</label>
							<input type="date" className="form-control" id="aquisicao" />
						</div>
					</div>
					<div className="row">
						<div className="form-group col-md-3">
							<label htmlFor="categoria">Categoria</label>
							<input type="text" className="form-control" id="categoria" />
						</div>
						<div className="form-group col-md-3">
							<label htmlFor="assunto">Assunto</label>
							<input type="text" className="form-control" id="assunto" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="classificacao">Classificação</label>
							<input type="text" className="form-control" id="classificacao" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="colecaoVolume">Coleção/Volume</label>
							<input type="text" className="form-control" id="colecaoVolume" />
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="extra">Extra</label>
							<input type="text" className="form-control" id="extra" />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="resenha">Resenha</label>
						<textarea className="form-control" id="resenha" rows="3"></textarea>
					</div>
				</form>
			</div>
		</div>
	);
}