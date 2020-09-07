import React, { useEffect, useState } from 'react';

import LancamentosService from './services/LancamentosService';
import PeriodSelector from './components/PeriodSelector';
import Summary from './components/Summary';
import ListaLancamentos from './components/ListaLancamentos';
import ModalTransaction from './components/ModalTransaction';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

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

    const deleteTransaction = async (id) => {
      try {
        const response = await LancamentosService.remove(id);

        console.log(response);

        const newTransactions = {
          length: lancamentos.length - 1,
          transactions: Object.assign(
            [],
            lancamentos.transactions.filter(
              (transaction) => transaction.id !== id
            )
          ),
        };

        setLancamentos(newTransactions);
      } catch (error) {
        console.log(error);
      }
    };

    deleteTransaction(id);
  };

  const handleInsertOrUpdateTransaction = (id) => {
    if (!!id) {
      setSelectedTransaction(
        lancamentos.transactions.find((transaction) => transaction.id === id)
      );
    }

    setIsModalOpen(true);
  };

  const handlePersistTransaction = (type, transaction) => {
    const updateTransaction = async (newTransaction) => {
      try {
        const response = await LancamentosService.update(
          transaction.id,
          transaction
        );

        console.log(response);

        const newTransactions = {
          length: lancamentos.length,
          transactions: Object.assign(
            [],
            lancamentos.transactions.filter(
              (transaction) => transaction.id !== newTransaction.id
            )
          ),
        };
        newTransactions.transactions.push(newTransaction);

        setLancamentos(newTransactions);
      } catch (error) {
        console.log(error);
      }
    };

    if (type === 'edit') {
      updateTransaction(transaction);
    }

    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
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
          onInsertOrUpdateTransaction={handleInsertOrUpdateTransaction}
        />
        {isModalOpen && (
          <ModalTransaction
            selectedTransaction={selectedTransaction}
            onSaveTransaction={handlePersistTransaction}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
