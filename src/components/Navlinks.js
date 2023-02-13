import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const Navlinks = ({ togglesidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            onClick={togglesidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navlinks;
