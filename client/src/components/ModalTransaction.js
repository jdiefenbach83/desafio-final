import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransaction({
  selectedTransaction,
  onSaveTransaction,
  onClose,
}) {
  const [transaction, setTransaction] = useState(selectedTransaction);

  const isEditing = !!transaction.id;

  const handleModalClose = () => {
    onClose(null);
  };

  const handleTypeChange = (event) => {
    setTransaction({ ...transaction, type: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setTransaction({ ...transaction, description: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setTransaction({ ...transaction, category: event.target.value });
  };

  const handleValueChange = (event) => {
    setTransaction({ ...transaction, value: +event.target.value });
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;

    setTransaction({
      ...transaction,
      year: newDate.substring(0, 4),
      month: newDate.substring(5, 7),
      day: newDate.substring(8, 10),
      yearMonth: newDate.substring(0, 4) + '-' + newDate.substring(5, 7),
      yearMonthDay: newDate,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const type = isEditing ? 'edit' : 'insert';
    onSaveTransaction(type, transaction);
  };

  return (
    <Modal style={customStyles} isOpen={true}>
      <div>
        <div style={styles.flexRow}>
          <span style={styles.title}>
            {(isEditing ? 'Edição' : 'Inclusão') + ' de lançamento'}
          </span>
          <button
            className="waves-effect waves-light btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              <input
                name="group1"
                type="radio"
                value="-"
                checked={transaction.type === '-'}
                disabled={isEditing}
                onChange={handleTypeChange}
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                name="group1"
                type="radio"
                value="+"
                checked={transaction.type === '+'}
                disabled={isEditing}
                onChange={handleTypeChange}
              />
              <span>Receita</span>
            </label>
          </div>
          <div className="input-field">
            <input
              placeholder="Descrição"
              id="inputDescricao"
              type="text"
              value={transaction.description}
              onChange={handleDescriptionChange}
            />
            <label className="active" htmlFor="inputDescricao">
              Descrição
            </label>
          </div>
          <div className="input-field">
            <input
              placeholder="Categoria"
              id="inputCategoria"
              type="text"
              value={transaction.category}
              onChange={handleCategoryChange}
            />
            <label className="active" htmlFor="inputCategoria">
              Categoria
            </label>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Valor"
                id="inputValue"
                type="number"
                min="0"
                step="any"
                value={transaction.value}
                onChange={handleValueChange}
              />
              <label className="active" htmlFor="inputValue">
                Valor
              </label>
            </div>
            <div className="input-field col s6">
              <input
                placeholder="Data"
                id="inputDate"
                type="date"
                value={transaction.yearMonthDay}
                onChange={handleDateChange}
              />
              <label className="active" htmlFor="inputDate">
                Valor
              </label>
            </div>
          </div>
          <div>
            <button className="waves-effect waves-light btn">Salvar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const customStyles = {
  overlay: {
    zIndex: 10,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  },
};

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
  },
};
