import React, { useEffect } from 'react';
import M from 'materialize-css';

import PeriodSelector from './components/PeriodSelector';
import Summary from './components/Summary';

export default function App() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="container">
      <h4 className="center">Bootcamp Full Stack - Desafio Final</h4>
      <h5 className="center">Controle Financeiro Pessoal</h5>

      <div>
        <PeriodSelector />
        <Summary
          lancamentos={1213}
          receitas={2345.67}
          despesas={1234.56}
          saldo={231.08}
        />
      </div>
    </div>
  );
}
