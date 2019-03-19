import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import './Cells.css';

const format = 'D';
const firstFormat = 'MMM D';

const Cells = ({ month, selectedDay, onDateClick }) => {
  const monthStart = dateFns.startOfMonth(month);
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
      if (dateFns.isSameDay(day, monthStart) || dateFns.isSameDay(day, nextMonthStart)) {
        formattedDate = dateFns.format(day, firstFormat);
      } else {
        formattedDate = dateFns.format(day, format);
      }

      const cloneDay = day;

      let classNames = '';
      if (!dateFns.isSameMonth(day, monthStart)) {
        classNames += ' ms-fontColor-neutralTertiary';
      } else if (dateFns.isSameDay(day, selectedDay)) {
        classNames += ' selected';
      }

      days.push(
        <div
          className="cell ms-borderColor-neutralLight"
          onClick={() => onDateClick(dateFns.parse(cloneDay))}
          role="button"
          tabIndex={0}
          onKeyUp={() => {}}
        >
          <span className={`number ms-font-xl ms-fontColor-neutralPrimaryAlt${classNames}`}>
            {formattedDate}
          </span>
        </div>,
      );

      day = dateFns.addDays(day, 1);
    }

    rows.push(<Fragment>{days}</Fragment>);

    days = [];
  }

  return <Fragment>{rows}</Fragment>;
};

Cells.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
};

export default Cells;
