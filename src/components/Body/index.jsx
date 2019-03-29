import React, { Fragment, useContext } from 'react';
import './Body.css';
import ViewContext from '../../contexts/ViewContext';
import RowHeader from '../RowHeader';
import Cells from '../Cells';

const Body = () => {
  const { view } = useContext(ViewContext);

  const renderMonth = () => (
    <div className="month">
      <RowHeader />
      <Cells />
    </div>
  );

  const renderWeek = () => (
    <Fragment>
      <div className="week-row-header">
        <RowHeader />
      </div>
      <div className="week-cells">
        <Cells />
      </div>
    </Fragment>
  );

  const renderBody = () => {
    switch (view) {
      case 'month':
        return renderMonth();
      case 'week':
        return renderWeek();
      default:
        return <span>Incorrect view set on Body</span>;
    }
  };

  return renderBody();
};

export default Body;
