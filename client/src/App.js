import React, { useEffect, useState } from 'react';

import LancamentosService from './services/LancamentosService';
import PeriodSelector from './components/PeriodSelector';
import Summary from './components/Summary';
import ListaLancamentos from './components/ListaLancamentos';

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
    const retrieveLancamentos = async () => {
      try {
        const response = await LancamentosService.get(period);

        setLancamentos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!!period) {
      retrieveLancamentos();
    }
  }, [period]);

  const handleChangePeriod = (newValue) => {
    setPeriod(newValue);
  };

  const handleDeleteTransaction = (id) => {
    console.log('App deleting: ' + id);

    const deleteEntry = async (id) => {
      try {
        const response = await LancamentosService.remove(id);

        console.log(response);

        const newTransactions = {
          length: lancamentos.length - 1,
          transactions: lancamentos.transactions.filter(
            (transaction) => transaction.id !== id
          ),
        };

        setLancamentos(newTransactions);
      } catch (error) {
        console.log(error);
      }
    };

    deleteEntry(id);
  };

  return (
    <div className="container">
      <h4 className="center">Bootcamp Full Stack - Desafio Final</h4>
      <h5 className="center">Controle Financeiro Pessoal</h5>

      <div>
        <PeriodSelector value={period} onChange={handleChangePeriod} />
        <Summary lancamentos={lancamentos} />
        <ListaLancamentos
          lancamentos={lancamentos}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    </div>
  );
}
