import React from 'react';
import dateFns from 'date-fns';
import './RowHeader.css';
import ViewContext from '../../contexts/ViewContext';
import PeriodContext from '../../contexts/PeriodContext';

const RowHeader = () => {
  const renderMonthHeader = days =>
    days.map(day => (
      <div className="month ms-font-m ms-bgColor-neutralLighterAlt" key={day}>
        {dateFns.format(day, 'dddd')}
      </div>
    ));

  const renderWeekHeader = days =>
    days.map(day => {
      const todayStyles = dateFns.isToday(day) ? ' today-header ms-fontColor-themePrimary' : '';

      return (
        <div className={`week ms-font-m ms-bgColor-neutralLighterAlt${todayStyles}`} key={day}>
          {dateFns.format(day, 'D dddd')}
        </div>
      );
    });

  const renderRowHeader = (period, view) => {
    const days = dateFns.eachDay(dateFns.startOfWeek(period), dateFns.endOfWeek(period));

    switch (view) {
      case 'month':
        return renderMonthHeader(days);
      case 'week':
        return renderWeekHeader(days);
      default:
        break;
    }
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
