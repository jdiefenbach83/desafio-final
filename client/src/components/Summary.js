import React from 'react';
import formatHelper from '../helpers/formatHelper';

export default function Summary({ lancamentos, receitas, despesas, saldo }) {
  return (
    <div className="row s12" style={styles.border}>
      <div className="col s3">
        <strong>Lan&ccedil;amentos: </strong>
        <span>{formatHelper.formatNumber(lancamentos)}</span>
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
