import React, { useContext, useRef, useEffect } from 'react';
import dateFns from 'date-fns';
import './Cells.css';
import keyHandler from '../utils/keyHandler';
import ViewContext from '../../contexts/ViewContext';
import PeriodContext from '../../contexts/PeriodContext';
import SelectedContext from '../../contexts/SelectedContext';

const Cells = () => {
  const { view } = useContext(ViewContext);
  const { period } = useContext(PeriodContext);
  const { selected, onSelectedChange } = useContext(SelectedContext);

  const hourIndicator = useRef(null);

  const scrollToHour = () => hourIndicator.current.scrollIntoView();

  useEffect(() => {
    if (hourIndicator.current) {
      scrollToHour();
    }
  }, []);

  const renderWeek = () => {
    const startingHour = dateFns.startOfToday();
    const endingHour = dateFns.endOfToday();

    const hoursBars = [];
    for (let hour = startingHour; hour < endingHour; hour = dateFns.addHours(hour, 1)) {
      let hourBarStyles = '';

      if (dateFns.isThisWeek(period) && dateFns.isThisHour(hour)) {
        hourBarStyles += ' ms-bgColor-themeSecondary this-hour-bar';

        hoursBars.push(
          <div
            className="hour-indicator"
            style={{
              gridColumn: `2 / span ${dateFns.getDay(hour) + 1}`,
              gridRow: dateFns.getHours(hour) * 2 + 1,
              marginTop: (dateFns.getMinutes(new Date()) * 26) / 30 - 2,
            }}
            key="hour-indicator"
            ref={hourIndicator}
          />,
        );
      }

      const bar = (
        <div className={`hour-bar${hourBarStyles}`} key={hour}>
          {dateFns.format(hour, 'ha').slice(0, -1)}
        </div>
      );

      hoursBars.push(bar);
    }

    const weekStart = dateFns.startOfWeek(period);
    const weekEnd = dateFns.endOfWeek(period);
    const days = dateFns.eachDay(weekStart, weekEnd);

    const hours = days.map(day => {
      const start = dateFns.startOfDay(day);
      const end = dateFns.endOfDay(day);

      const dayHours = [];

      for (let hour = start, row = 1; hour < end; hour = dateFns.addHours(hour, 0.5), row += 1) {
        let hourStyles = '';
        if (dateFns.isWeekend(day)) {
          hourStyles += ' weekend-hour';
        }
        if (dateFns.getMinutes(hour) === 0) {
          hourStyles += ' half-hour-separator';
        }

        dayHours.push(
          <div
            className={`hour ${hourStyles}`}
            style={{
              gridColumn: dateFns.getDay(hour) + 2,
              gridRow: row,
            }}
            key={hour}
            role="button"
            tabIndex={0}
            onClick={() => onSelectedChange(hour)}
            onKeyUp={e => keyHandler(e, onSelectedChange.bind(this, hour))}
          />,
        );
      }

      return dayHours;
    });

    return [...hoursBars, ...hours];
  };

  const renderMonth = () => {
    const monthStart = dateFns.startOfMonth(period);
    const monthEnd = dateFns.endOfMonth(period);
    const days = dateFns.eachDay(dateFns.startOfWeek(monthStart), dateFns.endOfWeek(monthEnd));

    return days.map(day => {
      const format = dateFns.isFirstDayOfMonth(day) ? 'MMM D' : 'D';

      let cellStyles = '';
      let numberStyles = '';

      if (dateFns.isToday(day)) {
        cellStyles += ' today-cell';
        numberStyles += ' ms-fontColor-themePrimary';
      } else {
        numberStyles += ' ms-fontColor-neutralPrimaryAlt';
      }
      if (dateFns.isSameDay(day, selected)) {
        cellStyles += ' selected';
      }
      if (!dateFns.isSameMonth(day, monthStart)) {
        numberStyles += ' ms-fontColor-neutralTertiary';
      }

      return (
        <div
          className={`cell ms-borderColor-neutralLight${cellStyles}`}
          key={day}
          role="button"
          tabIndex={0}
          onClick={() => onSelectedChange(day)}
          onKeyUp={e => keyHandler(e, onSelectedChange.bind(this, day))}
        >
          <span className={`number ms-font-xl${numberStyles}`}>{dateFns.format(day, format)}</span>
        </div>
      );
    });
  };

  const renderCells = () => {
    switch (view) {
      case 'month':
        return renderMonth();
      case 'week':
        return renderWeek();
      default:
        return <span>Incorrect view set on Cells</span>;
    }
  };

  return renderCells();
};

export default Cells;
