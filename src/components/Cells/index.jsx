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
      if (dateFns.isSameDay(dayCopy, selectedDay)) {
        cellStyles += ' selected';
      }
      if (dateFns.isSameDay(dayCopy, new Date())) {
        cellStyles += ' today-cell';
      }

      days.push(
        <div
          className={`cell ms-borderColor-neutralLight${cellStyles}`}
          onClick={() => onDateClick(dateFns.parse(dayCopy))}
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

Cells.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
};

export default Cells;
