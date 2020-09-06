import React, { useEffect } from 'react';
import M from 'materialize-css';

import PeriodSelector from './components/PeriodSelector';

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
      </div>
    </div>
  );
}
