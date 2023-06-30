import InputTexto from '../../../Componentes/Inputs/InputTexto.jsx'
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../Temas.jsx'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Botao from '../../../Componentes/Botao/Botao.jsx'
import api from '../../../services/api.jsx'
import { useLocation, useNavigate } from 'react-router-dom';

export default function MyApp() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const props = location.state ? location.state : null;

    const handleNome = (event) => {
        setNome(event);
    };

    const handleDescricao= (event) => {
        setDescricao(event);
    };
    const voltar = () => {
        navigate("/itens");
    };
    async function criarItem (){
        if (nome == '' || descricao == ''){
            console.log('não pode')
            return
        }
        try {
            const data = {
                "name": nome,
                "description": descricao
            }
            const response = await api.post('itens/', data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchItens() {
            if(props){
                try {
                    const response = await api.get(`itens/${props.id}`);
                    setNome(response.data.name)
                    setDescricao(response.data.description)
                } catch (error) {
                console.error(error);
                }
            }
        }

    fetchItens();
    }, []);
  return (
    <ThemeProvider theme={theme}>
        <Typography variant="h3">{ props ? "Edição" : "Cadastro"} de Item</Typography>
        <div>
            <InputTexto 
                label='Nome'
                value={nome}
                onChange={handleNome} 
            />
            <InputTexto 
                label='Descrição'
                value={descricao}
                onChange={handleDescricao} 
            />
            <Box display="flex" justifyContent="space-between">
                <Botao variant="outlined" onClick={voltar} label="Voltar" />
                <Botao variant="contained" onClick={criarItem} label={props ? "Editar" : "Criar"} />
            </Box>
            
        </div>
    </ThemeProvider>
  );
}