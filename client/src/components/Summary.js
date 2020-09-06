import React from 'react';
import formatHelper from '../helpers/formatHelper';

export default function Summary({ lancamentos }) {
  const { length, transactions } = lancamentos;

  const calcularLancamentos = (tipo) => {
    return transactions.reduce((accumulator, current) => {
      return (accumulator += current.type === tipo ? current.value : 0);
    }, 0);
  };

  const receitas = !lancamentos.length ? 0 : calcularLancamentos('+');
  const despesas = !lancamentos.length ? 0 : calcularLancamentos('-');
  const saldo = receitas - despesas;

  return (
    <div className="row s12" style={styles.border}>
      <div className="col s3">
        <strong>Lan&ccedil;amentos: </strong>
        <span>{formatHelper.formatNumber(length)}</span>
      </div>
      <div className="col s3">
        <strong>Receitas: </strong>
        <span style={styles.green}>
          {formatHelper.formatCurrency(receitas)}
        </span>
      </div>
      <div className="col s3 right-align">
        <strong>Despesas: </strong>
        <span style={styles.red}>{formatHelper.formatCurrency(despesas)}</span>
      </div>
      <div className="col s3 right-align">
        <strong>Saldo: </strong>
        <span style={saldo > -1 ? styles.green : styles.red}>
          {formatHelper.formatCurrency(saldo)}
        </span>
      </div>
    </div>
  );
}

const styles = {
  border: {
    border: '1px solid lightgray',
    borderRadius: '5px',
  },
  green: {
    color: '#26a69a',
  },
  red: {
    color: '#ef5350',
  },
};
