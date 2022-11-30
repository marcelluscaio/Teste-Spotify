import './App.css';
import {useState, useEffect} from 'react';

const client_id = 'a01ac38bd9514c2eb5cf5e9acb2c9fa1';
const client_secret = 'ab22cec87e72492e9a2b5e5fdc0071d4';



function App() {
  const [accessToken, setAccessToken] = useState("");
  const [input, setInput] = useState('');
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

  async function search(){
    console.log("Searching for " + input)
  }

  return (
    <div className="App">
      <form>
        <input type={'text'} placeholder={'Your text here'} value={input} onChange={(e) => {setInput(e.target.value)}}/>
        <button onClick={(e) => {
          e.preventDefault();
          search()}}>Click me!</button>
      </form>
      
    </div>
  );
}

export default App;
