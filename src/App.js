import { FiSearch } from 'react-icons/fi';
import './App.css';
import { useState } from 'react';
import api from './services/api';


function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Digite o CEP');
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    }catch{
      alert('CEP não encontrado');
    }
  }

  return ( 
    <div className="container">
      <h1 className='title'>Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP: " value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="buscar" onClick={handleSearch}><FiSearch size={15} color='#FFF' /></button>
      </div>

      {Object.keys(cep).length > 0 && ( 
      <main className="containerMain">
        <h2>Resultado da busca</h2>

        <span>CEP: {cep.cep}</span>
        <span>Logradouro: {cep.logradouro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Cidade: {cep.localidade} - UF: {cep.uf}</span>  
      </main>
      )}    
    </div>
  );
}

export default App;
