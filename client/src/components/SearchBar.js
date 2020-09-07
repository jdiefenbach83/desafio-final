import React from 'react';

export default function SearchBar({ onInsertOrUpdateTransaction }) {
  const handleClickAdd = () => {
    onInsertOrUpdateTransaction();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // const type = isEditing ? 'edit' : 'insert';
    // onSaveTransaction(type, transaction);
  };

  return (
    <div className="row" style={styles.border}>
      <div className="col s3">
        <button
          className="waves-effect waves-light btn"
          onClick={handleClickAdd}
        >
          + NOVO LAN&Ccedil;AMENTO
        </button>
      </div>
      <div className="col s9">
        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input
              placeholder="Filtro"
              id="inputFiltro"
              type="text"
              //value={transaction.category}
              //onChange={handleFilterChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  border: {
    border: '1px solid lightgray',
    borderRadius: '5px',
  },
};
