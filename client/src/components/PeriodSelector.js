import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';

import periodsHelper from '../helpers/periodsHelper';

export default function PeriodSelector({ onChange }) {
  const [currentPeriod, setCurrentPeriod] = useState(
    periodsHelper.getCurrentPeriod()
  );
  const inputPeriodSelector = useRef(null);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const periodsList = periodsHelper.createPeriodList();

  const handleChangePeriod = (event) => {
    setCurrentPeriod(event.target.value);
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
            value={currentPeriod}
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
