import React, { Fragment } from 'react';
import dateFns from 'date-fns';
import PeriodContext from '../../contexts/PeriodContext';
import './RowHeader.css';

const format = 'dddd';

const RowHeader = () => {
  const renderRowHeader = period => {
    const days = [];
    const startDate = dateFns.startOfWeek(period);

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="day ms-font-m ms-bgColor-neutralLighterAlt" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), format)}
        </div>,
      );
    }

    return <Fragment>{days}</Fragment>;
  };

  return <PeriodContext.Consumer>{({ period }) => renderRowHeader(period)}</PeriodContext.Consumer>;
};

export default RowHeader;
