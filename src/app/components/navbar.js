"use client";
import "../../styles/navbar-custom.css";

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav justify-content-center w-100 fs-4">
					<li className="nav-item custom-navbar-li">
						<a className="nav-link custom-navbar-link" href="/livros">Livros</a>
					</li>
					<li className="nav-item custom-navbar-li">
						<a className="nav-link custom-navbar-link" href="/leitores">Leitores</a>
					</li>
					<li className="nav-item custom-navbar-li">
						<a className="nav-link custom-navbar-link" href="/usuarios">Usuários</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}