import React from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import './Body.css';
import RowHeader from '../RowHeader';
import Cells from '../Cells';

export const DURATION = 125;

const visible = {
  opacity: 1,
  x: 0,
  transition: {
    opacity: { duration: 175, ease: 'easeIn' },
  },
};

const prev = {
  opacity: 0,
  x: 15,
  transition: {
    opacity: { duration: DURATION, ease: 'easeOut' },
    x: { duration: 75 },
  },
};

const next = { ...prev, x: -15 };

const Div = posed.div({
  visible,
  prev,
  next,
});

const Body = ({ month, selectedDay, onDateClick, pose }) => (
  <Div className="body" pose={pose}>
    <RowHeader month={month} />
    <Cells month={month} selectedDay={selectedDay} onDateClick={onDateClick} />
  </Div>
);

Body.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  onDateClick: PropTypes.func.isRequired,
  pose: PropTypes.string.isRequired,
};

export default Body;
