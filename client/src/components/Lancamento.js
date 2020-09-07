import React from 'react';

import formatHelper from '../helpers/formatHelper';
import Action from './Action';

export default function Lancamento({ id, day, category, description, value }) {
  const handleActionClick = (id, type) => {
    //const grade = grades.find((grade) => grade.id === id);

    //if (type === 'delete') {
    //  onDelete(grade);
    //  return;
    // }

    //onPersist(grade);
    console.log('ActionClick: ' + id + ' tipo: ' + type);
  };

  return (
    <div className="row" style={styles.lancamento}>
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
  lancamento: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    margin: '5px 0',
  },
  value: {
    fontSize: '1.5rem',
  },
};
