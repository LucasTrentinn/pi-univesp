"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/navbar.js";
import Link from "next/link";

export default function Home() {

	return (
		<div>
			<Navbar />
			<div className="container mt-5">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h2 className="mb-0">Livros Cadastrados</h2>
					<Link href="/livros/adicionar" passHref>
						<button
							className="btn btn-primary"
							title="Adicionar"
							style={{ height: "32px", display: "flex", alignItems: "center" }}
						>
							<i className="bi bi-plus-lg" style={{ marginRight: "10px"}}></i> Adicionar
						</button>
					</Link>
				</div>
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th width="8%" className="text-center">Código</th>
							<th className="text-center">Título</th>
							<th width="25%" className="text-center">Autor</th>
							<th width="15%" className="text-center">Categoria</th>
							<th width="8%" className="text-center">Ano</th>
							<th width="8%" className="text-center">Situação</th>
							<th width="50" className="text-center">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>000001</td>
							<td></td>
							<td></td>
							<td>Terror</td>
							<td>2025</td>
							<td>Locado</td>
							<td>
								<Link href="/livros/editar" passHref>
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
											margin: "0 auto"
										}}
									>
										<i className="bi bi-pencil text-white"></i>
									</button>
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
