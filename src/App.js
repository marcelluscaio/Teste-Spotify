import './App.css';
import {useState, useEffect} from 'react';
import { client_id, client_secret } from './keys.js'

function App() {

  const [accessToken, setAccessToken] = useState("");
  const [input, setInput] = useState('');
  const [imagem, setImagem] = useState('http://www.correio24horas.com.br/blogs/correiodefuturo/wp-content/uploads/2013/07/construcao-298x300.jpg');
  useEffect(() => {
    let authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  } , [])

  async function search(input){
    console.log("Searching for " + input);
    console.log("Searching with " + accessToken);

    let busca = await fetch(`https://api.spotify.com/v1/search?q=${input}&type=artist`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    });
    let buscaJSON = await busca.json();
    console.log(buscaJSON.artists.items[0].images[0].url)
    setImagem(buscaJSON.artists.items[0].images[0].url);
    

  }

  return (
    <div className="App">
      <form>
        <input type={'text'} placeholder={'Your text here'} value={input} onChange={(e) => {setInput(e.target.value)}}/>
        <button onClick={(e) => {
          e.preventDefault();
          search(input)}}>Click me!</button>
      </form>
      <img src={imagem} width={'200px'} height={'200px'}/>
      
    </div>
  );
}

export default App;
