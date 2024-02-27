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
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import appStyles from "../App.module.css";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { useSetCurrentSearch } from "../context/SearchContext";
import { removeTokenTimestamp } from "../utils/utils";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const setSearchQuery = useSetCurrentSearch();

  const handleSignout = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        exact
        to="/"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <HomeIcon className={appStyles.Icon} />
        Home
      </NavLink>
      <NavLink
        exact
        to="/events"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <TicketIcon className={appStyles.Icon} />
        Events
      </NavLink>
      <NavLink
        exact
        to="/feed"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <Bars3CenterLeftIcon className={appStyles.Icon} />
        Feed
      </NavLink>

      <NavDropdown
        title={
          <Avatar
            src={currentUser?.profile_image}
            height={40}
            text={`Hi ${currentUser?.username}`}
          />
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item
          as={NavLink}
          to="/posts/create"
          className={styles.NavLink}
        >
          <PlusIcon className={appStyles.Icon} /> Add post
        </NavDropdown.Item>

        <NavDropdown.Item
          as={NavLink}
          to={`/profile/${currentUser?.profile_id}`}
        >
          <UserCircleIcon className={appStyles.Icon} /> Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleSignout}>
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
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <UserPlusIcon className={appStyles.Icon} />
        Sign up
      </NavLink>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <KeyIcon className={appStyles.Icon} />
        Sign in
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      expand="md"
      fixed="top"
      className={styles.NavBar}
    >
      <Container fluid>
        <NavLink to="/">
          <img src={logo} height={45} alt="logo" />
        </NavLink>

        <Form
          inline
          className={`${styles.SearchBar} mx-auto`}
          onSubmit={(event) => event.preventDefault()}
        >
          <MagnifyingGlassIcon className={styles.SearchIcon} />
          <FormControl
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            className="mr-sm-2"
          />
        </Form>

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
          <Nav className="ml-auto align-items-center">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
