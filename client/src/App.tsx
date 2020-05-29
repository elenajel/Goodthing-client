import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Main from "./pages/main";
import List from "./pages/list";
import Error from "./pages/error";
export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Main} />
          <Route path="/error" component={Error} />
          <Route path="/listpage" component={List} />
          <Redirect path="/" to="/login" />
        </Switch>
      </div>
    );
  }
}
