import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./global.css";
import "./app.css";
import "./sidebar.css";
import "./main.css";

/* Tres conceitos principais do React*/
//Compomente -> Funcao que retorna algum componente HTML,CSS, JS isoladamente e nao interfere no restante da aplicação
//Propriedade -> Atributo para um componente do react//informações que um componente pai passa pra um componente filho
//Estado -> Informações mantidas pelo componete (conceito de imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_userName, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      { timeout: 30000 }
    );
  }, []);

  const getDev = async e => {
    await api
      .get("/devs")
      .then(res => console.log(res))
      .catch(res => console.log(res));
  };

  getDev();

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data.allDevs);
    }

    loadDevs();
  }, []);

  console.log(devs);
  const addDev = async e => {
    e.preventDefault();

    await api
      .post("/devs", {
        github_userName,
        techs,
        latitude,
        longitude
      })
      .then(res => console.log(res))
      .catch(res => console.log(res));

    setGithubUsername("");
    setTechs("");
  };

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={addDev}>
          <div className="input-block">
            <label htmlFor="username_github">Usuario GitHub</label>
            <input
              name="username_github"
              id="username_github"
              required
              value={github_userName}
              onChange={e => setGithubUsername(e.target.value)}
            ></input>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            ></input>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => {
            return (
              <li key={dev._id} className="dev-item">
                <header>
                  <img src={dev.avatar_url} alt={dev.name} />
                  <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(", ")}</span>
                  </div>
                </header>
                <p>{dev.bio}</p>
                <a href={`https://github.com/${dev.github_userName}`}>
                  Acessar perfil no GitHub
                </a>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
