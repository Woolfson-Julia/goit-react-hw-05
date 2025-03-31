import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css"

export default function Navigation() {

  const getLinkStyles = ({ isActive }) => {
    return clsx(css.link, isActive && css.active)
  }
  
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li>
          <NavLink to="/" className={getLinkStyles}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={getLinkStyles}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
