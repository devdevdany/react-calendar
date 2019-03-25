import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export const ModeStore = ({ children }) => {
  const [mode, setMode] = useState('month');

  const onModeChange = newMode => setMode(newMode);

  return <Context.Provider value={{ mode, onModeChange }}>{children}</Context.Provider>;
};

ModeStore.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
