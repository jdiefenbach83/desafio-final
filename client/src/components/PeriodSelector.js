import React from 'react';

export default function PeriodSelector() {
  const periodList = [
    { id: '2020-06', value: 'Jun/2020' },
    { id: '2020-07', value: 'Jul/2020' },
    { id: '2020-08', value: 'Ago/2020' },
    { id: '2020-09', value: 'Set/2020' },
  ];

  return (
    <div className="row">
      <div className="col">
        <a className="waves-effect waves-light btn">{'<'}</a>
      </div>
      <div className="col">
        <select>
          {periodList.map((period) => {
            return (
              <option key={period.id} value={period.value}>
                {period.value}
              </option>
            );
          })}
        </select>
      </div>
      <div className="col">
        <a className="waves-effect waves-light btn">{'>'}</a>
      </div>
    </div>
  );
}
