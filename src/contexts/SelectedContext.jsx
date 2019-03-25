import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();

export const SelectedStore = ({ children }) => {
  const [selected, setSelected] = useState(new Date());

  const onSelectedChange = newSelected => setSelected(newSelected);

  return <Context.Provider value={{ selected, onSelectedChange }}>{children}</Context.Provider>;
};

SelectedStore.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Context;
