import React from 'react';

import formatHelper from '../helpers/formatHelper';
import Action from './Action';

export default function Lancamento({
  id,
  day,
  category,
  description,
  value,
  type,
}) {
  const handleActionClick = (id, type) => {
    //const grade = grades.find((grade) => grade.id === id);

    //if (type === 'delete') {
    //  onDelete(grade);
    //  return;
    // }

    //onPersist(grade);
    console.log('ActionClick: ' + id + ' tipo: ' + type);
  };

  const lancamentoStyles = {
    border: '1px solid lightgray',
    borderRadius: '5px',
    margin: '5px 0',
    backgroundColor: type === '+' ? '#a1f0dc' : '#f0a1a8',
  };

  return (
    <div className="row" style={lancamentoStyles}>
      <div className="col s12" style={styles.flexRow}>
        <div className="col s1" style={styles.day}>
          {day.toString().padStart(2, '0')}
        </div>
        <div className="col s8">
          <div>{category}</div>
          <div>{description}</div>
        </div>
        <div className="col s2 right-align" style={styles.value}>
          {formatHelper.formatCurrency(value)}
        </div>
        <div className="col s1 right-align">
          <Action onActionClick={handleActionClick} id={id} type="edit" />
          <Action onActionClick={handleActionClick} id={id} type="delete" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  day: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  value: {
    fontSize: '1.5rem',
  },
};
