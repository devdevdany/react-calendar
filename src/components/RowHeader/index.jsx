import React, { useContext } from 'react';
import dateFns from 'date-fns';
import './RowHeader.css';
import ViewContext from '../../contexts/ViewContext';
import PeriodContext from '../../contexts/PeriodContext';

const RowHeader = () => {
  const { view } = useContext(ViewContext);
  const { period } = useContext(PeriodContext);

  const renderMonthHeader = days =>
    days.map(day => (
      <div className="month-header ms-font-m ms-bgColor-neutralLighterAlt" key={day}>
        {dateFns.format(day, 'dddd')}
      </div>
    ));

  const renderWeekHeader = days => {
    const weekHourHeader = (
      <div className="week-hour-header ms-font-m ms-bgColor-neutralLighterAlt" key="hour-header" />
    );

    const weekDays = days.map(day => {
      const todayStyles = dateFns.isToday(day) ? ' today-header ms-fontColor-themePrimary' : '';

      return (
        <div
          className={`week-header ms-font-m ms-bgColor-neutralLighterAlt${todayStyles}`}
          key={day}
        >
          {dateFns.format(day, 'D dddd')}
        </div>
      );
    });

    return [weekHourHeader, ...weekDays];
  };

  const renderRowHeader = () => {
    const days = dateFns.eachDay(dateFns.startOfWeek(period), dateFns.endOfWeek(period));

    switch (view) {
      case 'month':
        return renderMonthHeader(days);
      case 'week':
        return renderWeekHeader(days);
      default:
        return <span>Incorrect view set on RowHeader</span>;
    }
  };

  return renderRowHeader();
};

export default RowHeader;
