import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./global.css";
import "./app.css";
import "./sidebar.css";
import "./main.css";
import "./components/DevItem";
import "./components/DevForm";
import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

/* Tres conceitos principais do React*/
//Compomente -> Funcao que retorna algum componente HTML,CSS, JS isoladamente e nao interfere no restante da aplicação
//Propriedade -> Atributo para um componente do react//informações que um componente pai passa pra um componente filho
//Estado -> Informações mantidas pelo componete (conceito de imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data.allDevs);
    }
    loadDevs();
  }, []);

  const addDev = async data => {
    const response = await api.post("/devs", data);
    setDevs([...devs, response.data]);
  };

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={addDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
