import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Icon, initializeIcons } from 'office-ui-fabric-react';
import './Header.css';

initializeIcons();

const format = 'MMMM YYYY';

const Header = ({ month, prevMonth, nextMonth, setToday }) => (
  <div className="header">
    <div className="selectors">
      <Icon
        iconName="ChevronLeftSmall"
        className="prev ms-font-s ms-fontColor-neutralSecondary ms-fontColor-neutralDark--hover"
        onClick={prevMonth}
      />
      <Icon
        iconName="ChevronRightSmall"
        className="next ms-font-s ms-fontColor-neutralSecondary ms-fontColor-neutralDark--hover"
        onClick={nextMonth}
      />
      <span className="title ms-fontSize-xl">{dateFns.format(month, format)}</span>
    </div>
    <div className="modes">
      <div className="views">
        <span className="ms-font-l" role="button" tabIndex={0}>
          Week
        </span>
        <span className="ms-font-l" role="button" tabIndex={0}>
          Month
        </span>
      </div>
      <span className="today ms-font-l" role="button" tabIndex={0} onClick={setToday}>
        Today
      </span>
    </div>
  </div>
);

Header.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  setToday: PropTypes.func.isRequired,
};

export default Header;
