import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';

import periodsHelper from '../helpers/periodsHelper';

export default function PeriodSelector({ onChange }) {
  const inputPeriodSelector = useRef(null);

  const [currentPeriod, setCurrentPeriod] = useState(
    periodsHelper.getCurrentPeriod()
  );

  const [isLeftDisabled, setIsLeftDisable] = useState(false);
  const [isRightDisabled, setIsRightDisable] = useState(false);

  useEffect(() => {
    M.AutoInit();
  }, []);

  const periodsList = periodsHelper.createPeriodList();

  const handleChangePeriod = (event) => {
    setPeriod(event.target.value);
  };

  const handleClickMinus = () => {
    const newPeriod = getNewPeriod(-1);
    setPeriod(newPeriod);
  };

  const handleClickPlus = () => {
    const newPeriod = getNewPeriod(1);
    setPeriod(newPeriod);
  };

  const getNewPeriod = (direction) => {
    const currentIndex = periodsList.findIndex((item) => {
      return item.id === currentPeriod;
    });

    const newPeriod = periodsList.find((item) => {
      return item.index === currentIndex + direction * -1;
    });

    return newPeriod.id;
  };

  const setPeriod = (newPeriod) => {
    const period = periodsList.find((item) => {
      return item.id === newPeriod;
    });

    setIsLeftDisable(periodsList.length === period.index + 1);
    setIsRightDisable(period.index === 0);

    setCurrentPeriod(period.id);
    onChange(period.id);

    const selectInput = document.querySelector('#periodSelector');
    const instance = M.FormSelect.getInstance(selectInput);

    instance.input.value = period.value;
    inputPeriodSelector.current.focus();
  };

  return (
    <div style={styles.flexRow}>
      <button
        onClick={handleClickMinus}
        className="waves-effect waves-light btn"
        disabled={isLeftDisabled}
        style={styles.inputBtn}
      >
        {'<'}
      </button>

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

      <button
        onClick={handleClickPlus}
        className="waves-effect waves-light btn"
        disabled={isRightDisabled}
        style={styles.inputBtn}
      >
        {'>'}
      </button>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputPeriod: {
    height: '36px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputBtn: {
    height: '36px',
    width: '36px',
  },
};
