import React, { useEffect, useState } from 'react';

import PeriodSelector from './components/PeriodSelector';
import Summary from './components/Summary';

export default function App() {
  const [period, setPeriod] = useState('');

  useEffect(() => {
    //M.AutoInit();
  }, []);

  const handleChangePeriod = (newValue) => {
    setPeriod(newValue);

    console.log('app: ' + newValue);
  };

  /*const currentPeriod = () => {
    const date = new Date();
    return (
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0')
    );
  };*/

  return (
    <div className="container">
      <h4 className="center">Bootcamp Full Stack - Desafio Final</h4>
      <h5 className="center">Controle Financeiro Pessoal</h5>

      <div>
        <PeriodSelector value={period} onChange={handleChangePeriod} />
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
