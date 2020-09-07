import React from 'react';
import Lancamento from './Lancamento';

export default function ListaLancamentos({ lancamentos, onDeleteTransaction }) {
  const listaLancamento = [];

  const handleOnDelete = (id) => {
    onDeleteTransaction(id);
  };

  if (!!lancamentos.transactions) {
    lancamentos.transactions.sort((a, b) => a.day - b.day);

    lancamentos.transactions.forEach((lancamento) => {
      const { id, day, category, description, value, type } = lancamento;
      listaLancamento.push(
        <Lancamento
          key={id}
          id={id}
          day={day}
          category={category}
          description={description}
          value={value}
          type={type}
          onDelete={handleOnDelete}
        />
      );
    });
  }

  return <div>{listaLancamento}</div>;
}
