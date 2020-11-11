import React, { useContext } from "react";
import { Button, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { removeToken, removeUsername } from "helpers/Auth";
import AuthContext from "./AuthContext";

const Navbar: React.FunctionComponent = () => {
  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const handleNavClick = (command: string) => {
    if (loggedIn && command === "signout") {
      // sign out
      removeToken();
      removeUsername();
      if (setLoggedIn) {
        setLoggedIn(false);
      }
      history.push("/");
    } else if (loggedIn && command === "newpost") {
      // new post
      history.push("/post");
    } else {
      if (command === "signin") {
        // sign in
        history.push("/signin");
      } else if (command === "signup") {
        // sign up
        history.push("/signup");
      }
    }
  };

  return (
    <BootstrapNavbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
    >
      <BootstrapNavbar.Brand href="/">Pandip</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
      <BootstrapNavbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav>
          {loggedIn ? (
            <>
              <Button variant="info" style={{marginRight: "10px"}} onClick={() => handleNavClick("newpost")}>
                New post
              </Button>
              <Nav.Link onClick={() => handleNavClick("signout")}>
                Sign out
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link onClick={() => handleNavClick("signin")}>
                Sign in
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("signup")}>
                Sign up
              </Nav.Link>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
