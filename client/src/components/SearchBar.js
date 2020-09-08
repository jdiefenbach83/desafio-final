import React from 'react';

export default function SearchBar({
  onInsertOrUpdateTransaction,
  filter,
  onFilter,
}) {
  const handleClickAdd = () => {
    onInsertOrUpdateTransaction();
  };

  const handleFilterChange = (event) => {
    event.preventDefault();

    onFilter(event.target.value);
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
        <div className="input-field">
          <input
            placeholder="Filtro"
            id="inputFiltro"
            type="text"
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
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
