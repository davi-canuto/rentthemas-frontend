import InputTexto from '../../../Componentes/Inputs/InputTexto.jsx'
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../Temas.jsx'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Botao from '../../../Componentes/Botao/Botao.jsx'
import api from '../../../services/api.jsx'

export default function MyApp() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleNome = (event) => {
        setNome(event);
    };

    const handleDescricao= (event) => {
        setDescricao(event);
    };
    const print = () => {
        console.log('to do')
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
  return (
    <ThemeProvider theme={theme}>
        <Typography variant="h3">Cadastro de Item</Typography>
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
                <Botao variant="outlined" onClick={print} label="Voltar" />
                <Botao variant="contained" onClick={criarItem} label="Criar" />
            </Box>
            
        </div>
    </ThemeProvider>
  );
}