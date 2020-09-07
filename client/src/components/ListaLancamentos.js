import React from 'react';
import Lancamento from './Lancamento';

export default function ListaLancamentos({ lancamentos }) {
  const listaLancamento = [];

  if (!!lancamentos.transactions) {
    lancamentos.transactions.sort((a, b) => a.day - b.day);

    lancamentos.transactions.forEach((lancamento) => {
      const { id, day, category, description, value } = lancamento;
      listaLancamento.push(
        <Lancamento
          key={id}
          id={id}
          day={day}
          category={category}
          description={description}
          value={value}
        />
      );
    });
  }

  return <div>{listaLancamento}</div>;
}
