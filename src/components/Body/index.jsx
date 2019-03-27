import React from 'react';
import './Body.css';
import ViewContext from '../../contexts/ViewContext';
import RowHeader from '../RowHeader';
import Cells from '../Cells';

const Body = () => (
  <ViewContext.Consumer>
    {({ view }) => (
      <div className={view}>
        <RowHeader />
        <Cells />
      </div>
    )}
  </ViewContext.Consumer>
);

export default Body;
