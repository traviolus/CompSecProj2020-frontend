import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, Signin, Signup } from "views";
import { AuthContext, Navbar } from "components";
import { getToken } from "helpers/Auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setLoggedIn(true);
    }
    setReadyToRender(true);
  }, []);

  return !readyToRender ? (
    ""
  ) : (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
