import { useState } from "react";
import ListaExercicios from "./ListaExercicios";
import Exercicios from "./Exercicios";

export default function Conteudo() {
  const [tela, setTela] = useState("lista");

  return tela === "lista"
    ? <ListaExercicios aoClicarNovo={() => setTela("novo")} />
    : <Exercicios aoVoltar={() => setTela("lista")} />;
}