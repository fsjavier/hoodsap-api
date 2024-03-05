import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  TicketIcon,
  Bars3CenterLeftIcon,
  UserPlusIcon,
  KeyIcon
} from "@heroicons/react/24/outline";
import appStyles from "../App.module.css";
import styles from "../styles/NavBarMobile.module.css";
import Navbar from "react-bootstrap/Navbar";
import { useCurrentUser } from "../context/CurrentUserContext";

function NavBarMobile() {
  const currentUser = useCurrentUser();
  const loggedInIcons = (
    <>
      <NavLink exact to="/" activeClassName={styles.Active}>
        <HomeIcon className={appStyles.Icon} />
      </NavLink>
      <NavLink exact to="/events" activeClassName={styles.Active}>
        <TicketIcon className={appStyles.Icon} />
      </NavLink>
      <NavLink exact to="/feed" activeClassName={styles.Active}>
        <Bars3CenterLeftIcon className={appStyles.Icon} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        to="/signup"
        activeClassName={styles.Active}
      >
        <UserPlusIcon className={appStyles.Icon} />
        Sign up
      </NavLink>
      <NavLink
        to="/signin"
        activeClassName={styles.Active}
      >
        <KeyIcon className={appStyles.Icon} />
        Sign in
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBarMobile} fixed="bottom">
      {currentUser ? loggedInIcons : loggedOutIcons}
    </Navbar>
  );
}

export default NavBarMobile;
