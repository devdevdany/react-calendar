import React, { Fragment } from 'react';
import './Body.css';
import ViewContext from '../../contexts/ViewContext';
import RowHeader from '../RowHeader';
import Cells from '../Cells';

const Body = () => {
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

  const renderBody = view => {
    switch (view) {
      case 'month':
        return renderMonth();
      case 'week':
        return renderWeek();
      default:
        return <span>Incorrect view set on Body</span>;
    }
  };

  return <ViewContext.Consumer>{({ view }) => renderBody(view)}</ViewContext.Consumer>;
};

export default Body;
