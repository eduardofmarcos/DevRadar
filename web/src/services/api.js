import axios from "axios";

const api = axios.create({
  //criando um instancia da classe axios
  baseURL: "http://localhost:4000"
});

//console.log(api);
export default api;
