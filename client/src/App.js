import React, { useEffect, useState } from 'react';
import M from 'materialize-css';

import LancamentosService from './services/LancamentosService';
import periodsHelper from './helpers/periodsHelper';

import PeriodSelector from './components/PeriodSelector';
import Summary from './components/Summary';
import ListaLancamentos from './components/ListaLancamentos';
import ModalTransaction from './components/ModalTransaction';
import SearchBar from './components/SearchBar';

export default function App() {
  const [period, setPeriod] = useState(periodsHelper.getCurrentPeriod());
  const [lancamentos, setLancamentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [filter, setFilter] = useState('');
  const [lancamentosFiltrados, setLancamentosFiltrados] = useState([]);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    const retrieveLancamentos = async () => {
      try {
        const response = await LancamentosService.get(period);

        setLancamentos(response.data);
        setLancamentosFiltrados(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (!!period) {
      retrieveLancamentos();
    }

    setFilter('');
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
        setLancamentosFiltrados(newTransactions);
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
    } else {
      setSelectedTransaction({
        id: '',
        category: '',
        description: '',
        type: '',
        value: '',
        yearMonthDay: '',
      });
    }

    setIsModalOpen(true);
  };

  const handlePersistTransaction = (type, transaction) => {
    const updateTransaction = async (newTransaction) => {
      try {
        const response = await LancamentosService.update(
          newTransaction.id,
          newTransaction
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
        setLancamentosFiltrados(newTransactions);
      } catch (error) {
        console.log(error);
      }
    };

    const insertTransaction = async (newTransaction) => {
      try {
        const response = await LancamentosService.create(newTransaction);

        console.log(response);

        if (period === newTransaction.yearMonth) {
          const newTransactions = {
            length: lancamentos.length + 1,
            transactions: Object.assign([], lancamentos.transactions),
          };
          newTransactions.transactions.push({
            ...newTransaction,
            id: response.data.id,
          });

          setLancamentos(newTransactions);
          setLancamentosFiltrados(newTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (type === 'edit') {
      updateTransaction(transaction);
    } else {
      insertTransaction(transaction);
    }

    setSelectedTransaction({});
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (filter) => {
    setFilter(filter);

    const lancamentosFiltrados = lancamentos.transactions.filter(
      (lancamento) => {
        return lancamento.description.includes(filter);
      }
    );

    setLancamentosFiltrados({
      length: lancamentosFiltrados.length,
      transactions: lancamentosFiltrados,
    });
  };

  return (
    <div className="container">
      <h4 className="center">Bootcamp Full Stack - Desafio Final</h4>
      <h5 className="center">Controle Financeiro Pessoal</h5>

      <div>
        <PeriodSelector value={period} onChange={handleChangePeriod} />
        <Summary lancamentos={lancamentosFiltrados} />
        <SearchBar
          onInsertOrUpdateTransaction={handleInsertOrUpdateTransaction}
          filter={filter}
          onFilter={handleFilter}
        />
        <ListaLancamentos
          lancamentos={lancamentosFiltrados}
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
