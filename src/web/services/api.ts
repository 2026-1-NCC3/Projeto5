import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
}); //usado para fazer as requisições para o backend, a porta deve ser a mesma do backend, no caso 3000