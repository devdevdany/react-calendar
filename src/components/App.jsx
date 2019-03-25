import React from 'react';
import { ViewStore } from '../contexts/ViewContext';
import { PeriodStore } from '../contexts/PeriodContext';
import { SelectedStore } from '../contexts/SelectedContext';
import Header from './Header';
import Body from './Body';

const App = () => (
  <ViewStore>
    <PeriodStore>
      <SelectedStore>
        <Header />
        <Body />
      </SelectedStore>
    </PeriodStore>
  </ViewStore>
);

export default App;
