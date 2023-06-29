import { Button } from "@mui/material";
import "./botao.css";

export default function Botao({ label, variant, onClick }) {
  return (
    <Button variant={variant} onClick={onClick}>
      {label}
    </Button>
  );
}
