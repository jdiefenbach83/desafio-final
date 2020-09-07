import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';

export default function PeriodSelector({ value, onChange }) {
  const inputPeriodSelector = useRef(null);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const createPeriodList = () => {
    const monthShorName = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];

    const periodsList = [];

    for (let year = 2021; year >= 2019; year--) {
      for (let month = 12; month >= 1; month--) {
        periodsList.push({
          id: year.toString() + '-' + month.toString().padStart(2, '0'),
          value: monthShorName[month - 1] + '/' + year.toString(),
        });
      }
    }

    return periodsList;
  };

  const periodsList = createPeriodList();

  const handleChangePeriod = (event) => {
    onChange(event.target.value);
  };

  const handleClickMinus = () => {
    setPeriod(-1);
  };

  const handleClickPlus = () => {
    setPeriod(1);
  };

  const setPeriod = (direction) => {
    const selectInput = document.querySelector('#periodSelector');
    const instance = M.FormSelect.getInstance(selectInput);

    const index = periodsList.findIndex(
      (item) => item.value === instance.input.value
    );
    const newPeriod = periodsList[index + direction * -1];

    if (!!newPeriod) {
      onChange(newPeriod.id);
      instance.input.value = newPeriod.value;
      inputPeriodSelector.current.focus();
    }
  };

  return (
    <div style={styles.divCentered}>
      <div className="row">
        <div className="col">
          <button
            onClick={handleClickMinus}
            className="waves-effect waves-light btn"
          >
            {'<'}
          </button>
        </div>
        <div className="col">
          <select
            id="periodSelector"
            ref={inputPeriodSelector}
            value={value}
            onChange={handleChangePeriod}
          >
            {periodsList.map((period) => {
              return (
                <option key={period.id} value={period.id}>
                  {period.value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col">
          <button
            onClick={handleClickPlus}
            className="waves-effect waves-light btn"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  divCentered: { width: '50%', margin: 'auto' },
};
