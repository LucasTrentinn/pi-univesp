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
					<h2 className="mb-0">Leitores Cadastrados</h2>
					<Link href="/leitores/adicionar" passHref>
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
							<th className="text-center">Nome</th>
							<th width="15%" className="text-center">Nascismento</th>
							<th width="15%" className="text-center">Telefone</th>
							<th width="20%" className="text-center">Cidade</th>
							<th width="50" className="text-center">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>gabriel</td>
							<td>03/05/2005</td>
							<td>(14) 99149-7629</td>
							<td>Agudos</td>
							<td>
								<Link href="/leitores/editar" passHref>
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
