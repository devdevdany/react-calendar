import React, { Fragment } from 'react';
import dateFns from 'date-fns';
import './Cells.css';
import PeriodContext from '../../contexts/PeriodContext';
import SelectedContext from '../../contexts/SelectedContext';

const format = 'D';
const firstFormat = 'MMM D';

const Cells = () => {
  const renderCells = (selected, onSelectedChange, period) => {
    const monthStart = dateFns.startOfMonth(period);
    const nextMonthStart = dateFns.addMonths(monthStart, 1);
    const monthEnd = dateFns.endOfMonth(monthStart);

    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        const dayCopy = day;

        if (dateFns.isSameDay(dayCopy, monthStart) || dateFns.isSameDay(dayCopy, nextMonthStart)) {
          formattedDate = dateFns.format(dayCopy, firstFormat);
        } else {
          formattedDate = dateFns.format(dayCopy, format);
        }

        let numberStyles = '';
        if (!dateFns.isSameMonth(dayCopy, monthStart)) {
          numberStyles += ' ms-fontColor-neutralTertiary';
        }

        let cellStyles = '';
        if (dateFns.isSameDay(dayCopy, selected)) {
          cellStyles += ' selected';
        }
        if (dateFns.isSameDay(dayCopy, new Date())) {
          cellStyles += ' today-cell';
        }

        days.push(
          <div
            className={`cell ms-borderColor-neutralLight${cellStyles}`}
            onClick={() => onSelectedChange(dayCopy)}
            role="button"
            tabIndex={0}
            onKeyUp={() => {}}
            key={dayCopy}
          >
            <span className={`number ms-font-xl ms-fontColor-neutralPrimaryAlt${numberStyles}`}>
              {formattedDate}
            </span>
          </div>,
        );

        day = dateFns.addDays(day, 1);
      }

      rows.push(<Fragment key={day}>{days}</Fragment>);
      days = [];
    }

    return <Fragment>{rows}</Fragment>;
  };

  return (
    <PeriodContext.Consumer>
      {({ period }) => (
        <SelectedContext.Consumer>
          {({ selected, onSelectedChange }) => renderCells(selected, onSelectedChange, period)}
        </SelectedContext.Consumer>
      )}
    </PeriodContext.Consumer>
  );
};

export default Cells;
