import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import './RowHeader.css';

const format = 'dddd';

const RowHeader = ({ month }) => {
  const days = [];
  const startDate = dateFns.startOfWeek(month);

  for (let i = 0; i < 7; i += 1) {
    days.push(
      <div className="day ms-font-m ms-bgColor-neutralLighterAlt" key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), format)}
      </div>,
    );
  }

  return <Fragment>{days}</Fragment>;
};

RowHeader.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
};

export default RowHeader;
