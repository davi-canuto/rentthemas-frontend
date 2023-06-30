import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./Layout/NavBar/Navbar.jsx";
import ListarItens from "./Paginas/Itens/ListarItens/component.jsx";
import CriarItens from "./Paginas/Itens/CriarItens/component.jsx";
import ListarClientes from "./Paginas/Clientes/ListarClientes/index.jsx";
// import CriarClientes from "./Paginas/Clientes/CriarClientes/component.jsx";

import ListarTemas from "./Paginas/Temas/ListarTemas/index.jsx";
// import CriarTemas from "./Paginas/Temas/CriarTemas/index.jsx";

import ListarAlugueis from "./Paginas/Alugueis/ListarAlugueis/index.jsx";
// import CriarAlugueis from "./Paginas/Alugueis/CriarAlugueis/index.jsx";

import Dashboard from "./Paginas/Dashboard/index.jsx";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Container maxWidth={false} sx={{ minHeight: "65vh" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/itens" element={<ListarItens />} />
          <Route path="/itens/criar" element={<CriarItens />} />
          <Route path="/itens/editar" element={<CriarItens />} />
          <Route path="/clientes" element={<ListarClientes />} />
          {/* <Route path="/clientes/criar" element={<CriarClientes />} /> */}
          <Route path="/alugueis" element={<ListarAlugueis />} />
          {/* <Route path="/alugueis/criar" element={<CriarAlugueis />} /> */}
          <Route path="/temas" element={<ListarTemas />} />
          {/* <Route path="/temas/criar" element={<CriarTemas />} /> */}
        </Routes>
      </Router>
    </Container>
  </React.StrictMode>
);
