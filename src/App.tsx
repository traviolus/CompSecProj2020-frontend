import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {
  Home,
  Signin,
  Signup,
  ViewTopic,
  Post,
  EditTopic,
  EditComment,
} from "views";
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
            <Route exact path="/post">
              <Post />
            </Route>
            <Route exact path="/topic/:topicId" component={ViewTopic} />
            <Route
              exact
              path="/editcomment/:commentId"
              component={EditComment}
            />
            <Route exact path="/edittopic/:topicId" component={EditTopic} />
            <Route path="*" component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
