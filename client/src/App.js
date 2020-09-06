import React, { useEffect, useState } from 'react';

import PeriodSelector from './components/PeriodSelector';
import Summary from './components/Summary';
import LancamentosService from './services/LancamentosService';

export default function App() {
  const currentPeriod = () => {
    const date = new Date();
    return (
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0')
    );
  };

  const [period, setPeriod] = useState(currentPeriod);
  const [lancamentos, setLancamentos] = useState([]);

  useEffect(() => {
    const retrieveLancamentos = () => {
      LancamentosService.get(period)
        .then((response) => {
          setLancamentos(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    if (!!period) {
      retrieveLancamentos();
    }
  }, [period]);

  const handleChangePeriod = (newValue) => {
    setPeriod(newValue);
  };

  return (
    <div className="container">
      <h4 className="center">Bootcamp Full Stack - Desafio Final</h4>
      <h5 className="center">Controle Financeiro Pessoal</h5>

      <div>
        <PeriodSelector value={period} onChange={handleChangePeriod} />
        <Summary lancamentos={lancamentos} />
      </div>
    </div>
  );
}
