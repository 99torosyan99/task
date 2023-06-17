import React from "react";
import { NavLink } from "react-router-dom";


import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navigate">
          <li>
            <NavLink to='/employees'>Employees</NavLink>
          </li>
          <li>
            <NavLink to='/tasks'>Tasks</NavLink>
          </li>
        </nav>
      </div>
    </header>
  );
}
