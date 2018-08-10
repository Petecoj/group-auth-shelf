import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/add">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/shelf">
            Info Page
          </Link>
        </li>
        <li>
          <Link to="/user">
            User Page
          </Link>
        </li>
        <li>
          <Link to="/shelfTwo">
            Specific Info Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
