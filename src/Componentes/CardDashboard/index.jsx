import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Temas.jsx";
import Typography from "@mui/material/Typography";
import Botao from "../../Componentes/Botao/Botao.jsx";
import {
  Grid,
  Container,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";

export default function index({ tema, type = "text" }) {
  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={4} width={{ width: "200px" }}>
        <Card>
          <CardContent>
            <div>
              <Typography sx={{ fontSize: 22, color: "#3B1D70" }} gutterBottom>
                {tema.name}
              </Typography>
            </div>
            <div>
              <img
                style={{ height: 200, width: "100%" }}
                src={`https://t.ctcdn.com.br/Q8Q4Mqd43inTbnvKajPDYwgkHqY=/512x288/smart/filters:format(webp)/i632776.jpeg`}
                loading="lazy"
              />
            </div>

            <Typography
              sx={{ mb: 1.5 }}
              style={{ color: "#3B1D70" }}
              color="text.secondary"
            >
              R$ {tema.price}
            </Typography>
            <Typography variant="subtitle2" style={{ color: "#6750A4"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{ width: "50px", height: "45px", fontSize: "11px" }}
            >
              <Typography variant="subtitle3" style={{ color: "white", marginTop: 4}}>Alugar</Typography>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
