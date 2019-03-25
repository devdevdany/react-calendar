import React, { Fragment } from 'react';
import dateFns from 'date-fns';
import { Icon, initializeIcons } from 'office-ui-fabric-react';
import PeriodContext from '../../contexts/PeriodContext';
import SelectedContext from '../../contexts/SelectedContext';
import './Header.css';

initializeIcons();

const Header = () => {
  const renderSelectors = (period, onPeriodChange) => {
    const format = 'MMMM YYYY';

    const onPrevClick = () => {
      onPeriodChange(dateFns.subMonths(period, 1));
    };

    const onNextClick = () => {
      onPeriodChange(dateFns.addMonths(period, 1));
    };

    return (
      <div className="selectors">
        <Icon
          iconName="ChevronLeftSmall"
          className="prev ms-font-s ms-fontColor-neutralSecondary ms-fontColor-neutralDark--hover"
          onClick={onPrevClick}
        />
        <Icon
          iconName="ChevronRightSmall"
          className="next ms-font-s ms-fontColor-neutralSecondary ms-fontColor-neutralDark--hover"
          onClick={onNextClick}
        />
        <span className="title ms-fontSize-xl">{dateFns.format(period, format)}</span>
      </div>
    );
  };

  const renderModes = (onSelectedChange, onPeriodChange) => {
    const today = () => {
      onPeriodChange(new Date());
      onSelectedChange(new Date());
    };

    return (
      <div className="modes">
        <div className="views">
          <span className="ms-font-l" role="button" tabIndex={0}>
            Week
          </span>
          <span className="ms-font-l" role="button" tabIndex={0}>
            Month
          </span>
        </div>
        <span className="today ms-font-l" role="button" tabIndex={0} onClick={today}>
          Today
        </span>
      </div>
    );
  };

  return (
    <div className="header">
      <PeriodContext.Consumer>
        {({ period, onPeriodChange }) => (
          <Fragment>
            {renderSelectors(period, onPeriodChange)}
            <SelectedContext.Consumer>
              {({ onSelectedChange }) => renderModes(onSelectedChange, onPeriodChange)}
            </SelectedContext.Consumer>
          </Fragment>
        )}
      </PeriodContext.Consumer>
    </div>
  );
};

export default Header;
