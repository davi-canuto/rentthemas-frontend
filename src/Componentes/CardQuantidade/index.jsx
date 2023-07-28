import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Temas.jsx";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import Botao from "../../Componentes/Botao/Botao.jsx";
import { Grid, Card, CardContent } from "@mui/material";

export default function index({ quantidade, label, icon, type = "int" }) {
  function getIcon() {
    if (icon == "clientes") {
      return (
        <div>
          <GroupIcon
            color="titulos"
            sx={{ width: 100, height: 65, mt: "5%" }}
          />
        </div>
      );
    }
    if (icon == "temas") {
      return (
        <div>
          <AddReactionIcon
            color="titulos"
            sx={{ width: 100, height: 65, mt: "5%" }}
          />
        </div>
      );
    }
    if (icon == "algueis") {
      return (
        <div>
          <FormatListBulletedIcon
            color="titulos"
            sx={{ width: 100, height: 65, mt: "5%" }}
          />
        </div>
      );
    }
    if (icon == "items") {
      return (
        <div>
          <TurnedInIcon
            color="titulos"
            sx={{ width: 100, height: 65, mt: "5%" }}
          />
        </div>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={3}>
        <Card
          style={{
            display: "block",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent align="center" style={{ height:60 }}>
            {getIcon()}
          </CardContent>
          <CardContent align="center" sx={{ height: 15 }}>
            <Typography
              sx={{ fontSize: 25 }}
              style={{ color: "#3B1D70" }}
              color="text.secondary"
              variant="subtitle3"
              align="center"
            >
              {quantidade}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              sx={{ mb: 1.5, fontSize: 30 }}
              style={{ color: "#3B1D70" }}
              align="center"
              color="text.secondary"
            >
              {label}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
