import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./Layout/NavBar/Navbar.jsx";
import Clientes from "./Paginas/Clientes/clientes.jsx";
import ListarItens from "./Paginas/Itens/ListarItens/component.jsx";
import CriarItens from "./Paginas/Itens/CriarItens/index.jsx";
import Temas from "./Paginas/Temas/temas.jsx";
import { Container } from "@mui/material";
import Alugueis from "./Paginas/Alugueis/alugueis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Container maxWidth={false} sx={{ minHeight: "65vh" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListarItens />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/itens" element={<CriarItens />} />
          <Route path="/alugueis" element={<Alugueis />} />
          <Route path="/temas" element={<Temas />} />
        </Routes>
      </Router>
    </Container>
  </React.StrictMode>
);
