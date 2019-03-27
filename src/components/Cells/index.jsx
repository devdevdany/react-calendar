import React from 'react';
import dateFns from 'date-fns';
import './Cells.css';
import keyHandler from '../utils/keyHandler';
import ViewContext from '../../contexts/ViewContext';
import PeriodContext from '../../contexts/PeriodContext';
import SelectedContext from '../../contexts/SelectedContext';

const Cells = () => {
  const renderMonth = (selected, onSelectedChange, period) => {
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

  const renderCells = (selected, onSelectedChange, period, view) => {
    switch (view) {
      case 'month':
        return renderMonth(selected, onSelectedChange, period);
      case 'week':
        break;
      default:
        return <span>Incorrect view set on Cells</span>;
    }
  };

  return (
    <ViewContext.Consumer>
      {({ view }) => (
        <PeriodContext.Consumer>
          {({ period }) => (
            <SelectedContext.Consumer>
              {({ selected, onSelectedChange }) =>
                renderCells(selected, onSelectedChange, period, view)
              }
            </SelectedContext.Consumer>
          )}
        </PeriodContext.Consumer>
      )}
    </ViewContext.Consumer>
  );
};

export default Cells;
