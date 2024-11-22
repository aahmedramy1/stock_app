import React, {useEffect} from 'react';
import api from "./api";

function App() {

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/reference/tickers");
            console.log(response)
            console.log(response.data)
        }
        fetchData().catch(console.error)
    })
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </header>
    </div>
  );
}

export default App;
