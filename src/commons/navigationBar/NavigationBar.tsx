import { Alignment, Classes, Icon, Navbar, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Role } from '../application/ApplicationTypes';

type NavigationBarProps = DispatchProps & StateProps;

type DispatchProps = {
  handleLogOut: () => void;
};

type StateProps = {
  role?: Role;
  title: string;
  name?: string;
};

const NavigationBar: React.SFC<NavigationBarProps> = props => (
  <Navbar className={classNames('NavigationBar', 'primary-navbar', Classes.DARK)}>
    <NavbarGroup align={Alignment.LEFT}>
      <NavLink
        className={classNames('NavigationBar__link', Classes.BUTTON, Classes.MINIMAL)}
        to="/achievement"
      >
        <Icon icon={IconNames.SYMBOL_DIAMOND} />
        <NavbarHeading className="hidden-xs hidden-sm">Source Academy</NavbarHeading>
      </NavLink>

      <NavLink
        className={classNames('NavigationBar__link', Classes.BUTTON, Classes.MINIMAL)}
        to="/achievement"
      >
        <Icon icon={IconNames.MUSIC} />
        <div className="navbar-button-text hidden-xs hidden-sm">Sourcecast</div>
      </NavLink>

      <NavLink
        className={classNames('NavigationBar__link', Classes.BUTTON, Classes.MINIMAL)}
        to="/achievement"
      >
        <Icon icon={IconNames.CODE} />
        <div className="navbar-button-text hidden-xs hidden-sm">Playground</div>
      </NavLink>

      <NavLink
        activeClassName={Classes.ACTIVE}
        className={classNames('NavigationBar__link', Classes.BUTTON, Classes.MINIMAL)}
        to="/achievement"
      >
        <Icon icon={IconNames.MOUNTAIN} />
        <div className="navbar-button-text hidden-xs hidden-sm">Achievement</div>
      </NavLink>
    </NavbarGroup>

    <NavbarGroup align={Alignment.RIGHT}>
      <NavLink
        activeClassName={Classes.ACTIVE}
        className={classNames('NavigationBar__link', Classes.BUTTON, Classes.MINIMAL)}
        to="/achievement/control"
      >
        <Icon icon={IconNames.ARROW_RIGHT} />
        <div className="navbar-button-text hidden-xs hidden-sm">Achievement Control</div>
      </NavLink>
    </NavbarGroup>
  </Navbar>
);

export default NavigationBar;
