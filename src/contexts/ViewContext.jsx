import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export const ViewStore = ({ children }) => {
  const [view, setView] = useState('month');

  const onViewChange = newMode => setView(newMode);

  return <Context.Provider value={{ view, onViewChange }}>{children}</Context.Provider>;
};

ViewStore.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
