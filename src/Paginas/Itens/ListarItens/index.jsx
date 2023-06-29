import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../Temas.jsx";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Botao from "../../../Componentes/Botao/Botao.jsx";
import api from "../../../services/api.jsx";
import { DataGrid } from "@mui/x-data-grid";

export default function Index() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    async function fetchItens() {
      try {
        const response = await api.get("itens/");
        setItens(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchItens();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", width: 150 },
    { field: "description", headerName: "Descrição", width: 250 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h3">Listagem de Itens</Typography>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={itens} columns={columns} checkboxSelection />
        </div>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Botao
            variant="outlined"
            label="Voltar"
            onClick={() => console.log("Voltar")}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
