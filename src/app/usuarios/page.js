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
					<h2 className="mb-0">Usuários Cadastrados</h2>
					<Link href="/usuarios/adicionar" passHref>
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
							<th width="80" className="text-center">Id</th>
							<th className="text-center">Nome</th>
							<th width="35%" className="text-center">Extra</th>
							<th width="80" className="text-center">Status</th>
							<th width="50" className="text-center">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td>Teste</td>
							<td></td>
							<td><div className="px-1 rounded text-white bg-success d-flex justify-content-center">
									Ativo
								</div>
							</td>
							<td>
								<Link href="/usuarios/editar" passHref>
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
						<tr>
							<td></td>
							<td>Teste</td>
							<td></td>
							<td><div className="px-1 rounded text-white bg-danger d-flex justify-content-center">
									Inativo
								</div>
							</td>
							<td>
								<Link href="/usuarios/editar" passHref>
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
