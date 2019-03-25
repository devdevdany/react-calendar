import React from 'react';
import { ModeStore } from '../contexts/ModeContext';
import { PeriodStore } from '../contexts/PeriodContext';
import { SelectedStore } from '../contexts/SelectedContext';
import Header from './Header';
import Body from './Body';

const App = () => (
  <ModeStore>
    <PeriodStore>
      <SelectedStore>
        <Header />
        <Body />
      </SelectedStore>
    </PeriodStore>
  </ModeStore>
);

export default App;
