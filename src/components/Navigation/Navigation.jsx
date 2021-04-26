import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <nav className="nav">
    <NavLink
      className="nav__link"
      activeClassName="nav__link--active"
      to="/"
      exact
    >
      Home
    </NavLink>
    <NavLink
      className="nav__link"
      activeClassName="nav__link--active"
      to="/basket"
      exact
    >
      Basket
    </NavLink>
  </nav>
);
