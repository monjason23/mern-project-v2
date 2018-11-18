import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Components/Pages/Login";
import Profile from "./Components/Pages/Profile";
import SignUp from "./Components/Pages/SignUp";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
