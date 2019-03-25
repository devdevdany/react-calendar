import React, { Fragment } from 'react';
import dateFns from 'date-fns';
import ViewContext from '../../contexts/ViewContext';
import PeriodContext from '../../contexts/PeriodContext';
import './RowHeader.css';

const RowHeader = () => {
  const renderRowHeader = (period, view) => {
    const days = [];
    const startDate = dateFns.startOfWeek(period);

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

    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="day ms-font-m ms-bgColor-neutralLighterAlt" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), format)}
        </div>,
      );
    }

    return <Fragment>{days}</Fragment>;
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
