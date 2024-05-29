import React from "react";
import { NavLink as NavLinkComp } from "react-router-dom";
import style from "./NavBarLink.module.css";

function NavBarLink({ to, children, ...props }) {
  return (
    <NavLinkComp
      {...props}
      to={to}
      className={({ isActive }) => (isActive ? style.isActive : style.notActive)}
    >
      {children}{" "}
    </NavLinkComp>
  );
}

export default NavBarLink;
