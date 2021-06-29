import React, { useState, useEffect } from "react";
import axios from "axios";

const Lista = () => {
  const [estados, setEstados] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState([]);

  useEffect(() => {
    const pegaDados = async () => {
      const resposta = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      );
      const dados = await resposta.data;
      setEstados(dados);
    };
    pegaDados();
  }, []);

  useEffect(() => {
    setFiltro(
      estados.filter((item) => {
        return item.nome.toLowerCase().includes(busca.toLowerCase());
      })
    );
  }, [busca, estados]);

  return (
    <>
      <input
        onChange={(e) => {
          setBusca(e.target.value);
        }}
        placeholder="Digite um estado"
      />
      <ol>
        {filtro.map((repo) => (
          <li key={repo.id}>{repo.nome}</li>
        ))}
      </ol>
    </>
  );
};

export default Lista;
