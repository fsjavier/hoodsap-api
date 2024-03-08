import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import logo from "../assets/hoodsap_logo.webp";
import Avatar from "../components/Avatar";
import {
  HomeIcon,
  UserPlusIcon,
  KeyIcon,
  ArrowRightStartOnRectangleIcon,
  TicketIcon,
  Bars3CenterLeftIcon,
  UserCircleIcon,
  PlusIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import appStyles from "../App.module.css";
import styles from "../styles/NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import axios from "axios";
import { useSetCurrentSearch } from "../context/SearchContext";
import { removeTokenTimestamp } from "../utils/utils";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const setSearchQuery = useSetCurrentSearch();
  const { pathname } = useLocation();
  const showSearchBar =
    pathname === "/" || pathname === "/events" || pathname === "/feed";

  const handleSignout = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        exact
        to="/"
        className={`${styles.NavLink} ${styles.HideLinkMobile}`}
        activeClassName={styles.Active}
      >
        <HomeIcon className={appStyles.Icon} />
        <span className={styles.HideTextMobile}>Home</span>
      </NavLink>
      <NavLink
        exact
        to="/events"
        className={`${styles.NavLink} ${styles.HideLinkMobile}`}
        activeClassName={styles.Active}
      >
        <TicketIcon className={appStyles.Icon} />
        <span className={styles.HideTextMobile}>Events</span>
      </NavLink>
      <NavLink
        exact
        to="/feed"
        className={`${styles.NavLink} ${styles.HideLinkMobile}`}
        activeClassName={styles.Active}
      >
        <Bars3CenterLeftIcon className={appStyles.Icon} />
        <span className={styles.HideTextMobile}>Feed</span>
      </NavLink>

      <NavDropdown
        title={<Avatar src={currentUser?.profile_image} height={40} />}
        alignRight
        id="dropdown-menu-align-right"
      >
        <NavDropdown.Item
          as={NavLink}
          to="/posts/create"
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <PlusIcon className={appStyles.Icon} /> Add post
        </NavDropdown.Item>
        <NavDropdown.Item
          as={NavLink}
          to="/events/create"
          className={styles.NavLink}
          activeClassName={styles.Active}
        >
          <UserGroupIcon className={appStyles.Icon} /> Add event
        </NavDropdown.Item>
        <NavDropdown.Item
          as={NavLink}
          to={`/profile/${currentUser?.profile_id}`}
          activeClassName={styles.Active}
          className={styles.NavLink}
        >
          <UserCircleIcon className={appStyles.Icon} /> Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleSignout} className={styles.NavLink}>
          <ArrowRightStartOnRectangleIcon className={appStyles.Icon} />
          Sign out
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signup"
        className={`${styles.NavLink} ${styles.HideLinkMobile}`}
        activeClassName={styles.Active}
      >
        <UserPlusIcon className={appStyles.Icon} />
        Sign up
      </NavLink>
      <NavLink
        to="/signin"
        className={`${styles.NavLink} ${styles.HideLinkMobile}`}
        activeClassName={styles.Active}
      >
        <KeyIcon className={appStyles.Icon} />
        Sign in
      </NavLink>
    </>
  );

  return (
    <Navbar fixed="top" className={styles.NavBar}>
      <Container fluid>
        <NavLink to="/">
          <img src={logo} height={45} alt="logo" />
        </NavLink>

        {showSearchBar && (
          <div className={styles.SearchBar__Container}>
            <Form
              inline
              className={`${styles.SearchBar}`}
              onSubmit={(event) => event.preventDefault()}
            >
              <MagnifyingGlassIcon className={styles.SearchIcon} />
              <FormControl
                aria-label="search"
                type="text"
                placeholder="Search"
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
                className="mr-sm-2"
              />
            </Form>
          </div>
        )}

        <Nav className="ml-auto align-items-center flex-row">
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
