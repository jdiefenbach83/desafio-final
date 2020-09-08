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
    <div style={styles.flexRow}>
      <div>
        <button
          className="waves-effect waves-light btn"
          onClick={handleClickAdd}
          style={styles.inputAdd}
        >
          + NOVO LAN&Ccedil;AMENTO
        </button>
      </div>
      <div style={styles.divFilter}>
        <div>
          <input
            style={styles.inputFilter}
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  divFilter: {
    width: '100%',
    marginLeft: '5px',
    marginBottom: '0',
  },
  inputAdd: {
    width: '200px',
  },
  inputFilter: {
    height: '36px',
    margin: '0',
  },
};
