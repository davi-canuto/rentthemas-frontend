import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import InputTexto from '../../../Componentes/Inputs/InputTexto.jsx';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../Temas.jsx';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Botao from '../../../Componentes/Botao/Botao.jsx';
import api from '../../../services/api.jsx';
import { useLocation, useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MyApp() {
  const [nome, setName] = useState('');
  const [cor, setCor] = useState('');
  const [price, setPrice] = useState('');
  const [selectedItens, setSelectedItens] = useState([]);
  const [itens, setItens] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state ? location.state : null;

  const routeChangeBack = () => {
    let path = `/temas`;
    navigate(path);
  }

  const handleNome = (event) => {
    setName(event);
  };

  const handleCor = (event) => {
    setCor(event);
  };

  const handlePrice = (event) => {
    setPrice(event);
  };


  const handleSelectedItens = (event) => {
    setSelectedItens(event.target.value);
  };

  async function submit() {
    if (nome === '') {
      console.log('não pode');
      return;
    }
    try {
      const data = {
        "name": nome,
        "color": cor,
        "price": price,
        "itens": selectedItens.map(item => item.id)
      };
      props ? await api.put(`themes/${props.id}/`, data) : await api.post('themes/', data);
      routeChangeBack();
    } catch (error) {
      console.error(error);
    }
  }

  function cor_option(item) {
    let bg = "white"
    let text = "black"
    if (selectedItens.includes(item)){
      bg = "#6750A4"
      text = "white"
    }

    return {
      backgroundColor: bg,
      color: text
    }
  }

  function get_border(item) {
    let border_color = '#6750A4'
    if (selectedItens.includes(item)){
      border_color = "white"
    }
    return { 
      border:1, 
      borderBlockColor: border_color
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const first = await api.get('itens/');
        setItens(first.data);
        if (props.id){
          const response = await api.get(`themes/${props.id}/`);
          handleNome(response.data.name)
          handleCor(response.data.color)
          handlePrice(response.data.price)
          let arr = []

          first.data.forEach(function(item){
            let id = item.id;
            if(response.data.itens.includes(id)){
              arr.push(item)
            }
          })

          setSelectedItens(arr)
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [props]);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h3">{props ? "Edição" : "Cadastro"} de Tema</Typography>
      <div>
        <InputTexto
          label='Nome'
          value={nome}
          onChange={handleNome}
        />
        <InputTexto
          label='Cor'
          value={cor}
          onChange={handleCor}
        />
        <InputTexto
          label='Preço'
          adornment='R$'
          type="number"
          value={price}
          onChange={handlePrice}
        />
        <Box justifyContent="space-between" sx={{ marginY: 2 }}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel style={{ color:'#6750A4' }} id="select-itens">Itens</InputLabel>
              <Select
                  labelId="select-itens"
                  id="id-select-itens"
                  multiple
                  value={selectedItens}
                  color="inputs"
                  onChange={handleSelectedItens}
                  input={<OutlinedInput label="Itens" />}
                  renderValue={(selected) => selected.map(item => item.name).join(', ')}
                  MenuProps={MenuProps}
                  sx={{ color: 'black' }}
              >
                  {itens.map((item) => (
                    <MenuItem sx={ get_border(item) } key={item.id} value={item} style={ cor_option(item) } >
                        <ListItemText primary={item.name} sx={{ padding: 0.5 }} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Botao variant="outlined" onClick={routeChangeBack} label="Voltar" />
          <Botao variant="contained" onClick={submit} label={props ? "Editar" : "Criar"} />
        </Box>
      </div>
    </ThemeProvider>
  );
}
