import React, { Fragment, useState } from 'react';
import dateFns from 'date-fns';
import Header from '../Header';
import Body, { DURATION } from '../Body';

const Calendar = () => {
  const [month, setMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [pose, setPose] = useState('visible');

  const prevMonth = () => {
    setMonth(dateFns.subMonths(month, 1));
    setPose('prev');
    setTimeout(() => setPose('visible'), DURATION);
  };
  const nextMonth = () => {
    setMonth(dateFns.addMonths(month, 1));
    setPose('next');
    setTimeout(() => setPose('visible'), DURATION);
  };

  const setToday = () => {
    setMonth(new Date());
  };

  const onDateClick = day => {
    setSelectedDay(day);
  };

  return (
    <Fragment>
      <Header month={month} prevMonth={prevMonth} nextMonth={nextMonth} setToday={setToday} />
      <Body month={month} selectedDay={selectedDay} onDateClick={onDateClick} pose={pose} />
    </Fragment>
  );
};

export default Calendar;
