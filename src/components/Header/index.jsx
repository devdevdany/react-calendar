import React, { useContext } from 'react';
import dateFns from 'date-fns';
import { Icon, initializeIcons } from 'office-ui-fabric-react';
import './Header.css';
import keyHandler from '../utils/keyHandler';
import ViewContext from '../../contexts/ViewContext';
import PeriodContext from '../../contexts/PeriodContext';
import SelectedContext from '../../contexts/SelectedContext';

initializeIcons();

const Header = () => {
  const { view, onViewChange } = useContext(ViewContext);
  const { period, onPeriodChange } = useContext(PeriodContext);
  const { onSelectedChange } = useContext(SelectedContext);

  const renderSelectors = () => {
    let title = '';
    let sub;
    let add;

    switch (view) {
      case 'month':
        title = dateFns.format(period, 'MMMM YYYY');

        sub = dateFns.subMonths;
        add = dateFns.addMonths;
        break;
      case 'week': {
        const start = dateFns.startOfWeek(period);
        const end = dateFns.endOfWeek(period);
        let startFormat = '';
        let endFormat = '';

        if (dateFns.differenceInCalendarYears(end, start) > 0) {
          startFormat = 'MMMM D, YYYY – ';
          endFormat = 'MMMM D, YYYY';
        } else if (dateFns.differenceInCalendarMonths(end, start) > 0) {
          startFormat = 'MMMM D – ';
          endFormat = 'MMMM D, YYYY';
        } else {
          startFormat = 'MMMM D–';
          endFormat = 'D, YYYY';
        }

        title = `${dateFns.format(start, startFormat)}${dateFns.format(end, endFormat)}`;

        sub = dateFns.subWeeks;
        add = dateFns.addWeeks;
        break;
      }
      default:
        break;
    }

    const onPrevClick = () => {
      onPeriodChange(sub(period, 1));
    };

    const onNextClick = () => {
      onPeriodChange(add(period, 1));
    };

    return (
      <div className="selectors">
        <Icon
          iconName="ChevronLeftSmall"
          className="prev ms-font-s ms-fontColor-neutralSecondary ms-fontColor-neutralDark--hover"
          tabIndex={0}
          onClick={onPrevClick}
          onKeyUp={e => keyHandler(e, onPrevClick)}
        />
        <Icon
          iconName="ChevronRightSmall"
          className="next ms-font-s ms-fontColor-neutralSecondary ms-fontColor-neutralDark--hover"
          tabIndex={0}
          onClick={onNextClick}
          onKeyUp={e => keyHandler(e, onNextClick)}
        />
        <span className="title ms-fontSize-xl">{title}</span>
      </div>
    );
  };

  const renderModes = () => {
    const setToday = () => {
      onPeriodChange(new Date());
      onSelectedChange(new Date());
    };

    const setWeek = () => {
      onViewChange('week');
    };

    const setMonth = () => {
      onViewChange('month');
    };

    return (
      <div className="modes">
        <div className="views">
          <span
            className={`ms-font-l ${view === 'week' ? 'ms-fontColor-themePrimary' : ''}`}
            role="button"
            tabIndex={0}
            onClick={setWeek}
            onKeyUp={e => keyHandler(e, setWeek)}
          >
            Week
          </span>
          <span
            className={`ms-font-l ${view === 'month' ? 'ms-fontColor-themePrimary' : ''}`}
            role="button"
            tabIndex={0}
            onClick={setMonth}
            onKeyUp={e => keyHandler(e, setMonth)}
          >
            Month
          </span>
        </div>
        <span
          className="today ms-font-l"
          role="button"
          tabIndex={0}
          onClick={setToday}
          onKeyUp={e => keyHandler(e, setToday)}
        >
          Today
        </span>
      </div>
    );
  };

  return (
    <div className="header">
      {renderSelectors()}
      {renderModes()}
    </div>
  );
};

export default Header;
