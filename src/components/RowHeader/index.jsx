import React from 'react';
import dateFns from 'date-fns';
import './RowHeader.css';
import ViewContext from '../../contexts/ViewContext';
import PeriodContext from '../../contexts/PeriodContext';

const RowHeader = () => {
  const renderRowHeader = (period, view) => {
    let format = '';
    switch (view) {
      case 'month':
        format = 'dddd';
        break;
      case 'week':
        format = 'D dddd';
        break;
      default:
        break;
    }

    const startOfWeek = dateFns.startOfWeek(period);
    const days = [];

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="day ms-font-m ms-bgColor-neutralLighterAlt" key={i}>
          {dateFns.format(dateFns.addDays(startOfWeek, i), format)}
        </div>,
      );
    }

    return days;
  };

  return (
    <ViewContext.Consumer>
      {({ view }) => (
        <PeriodContext.Consumer>
          {({ period }) => renderRowHeader(period, view)}
        </PeriodContext.Consumer>
      )}
    </ViewContext.Consumer>
  );
};

export default RowHeader;
