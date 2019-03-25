import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export const PeriodStore = ({ children }) => {
  const [period, setPeriod] = useState(new Date());

  const onPeriodChange = newPeriod => setPeriod(newPeriod);

  return <Context.Provider value={{ period, onPeriodChange }}>{children}</Context.Provider>;
};

PeriodStore.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
