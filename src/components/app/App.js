import React, { Component } from "react";
import "./App.css";
import Home from "../home/home";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurant from "../restaurant/Restaurant";
import MasterAdmin from "../masterAdmin/masterAdmin";
import firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";
import {
  NotFound,
  AuthenticationLoading,
  INDIVIDUAL_RESTAURANT_PATH,
  MASTER_ADMIN_PATH,
  HOME_PATH
} from "../routing/routing";

import { logoutUser, fetchUser } from "../../actions/authActions";

class App extends Component {
  render() {
    const { isLoggingLoading } = this.props.auth;
    return (
      <div>
        <Router>
          <div>
            <AuthenticationLoading isChecking={isLoggingLoading}>
              <Switch>
                <Route exact path={HOME_PATH} component={Home} />
                <Route
                  path={INDIVIDUAL_RESTAURANT_PATH}
                  component={Restaurant}
                />
                <Route exact path={MASTER_ADMIN_PATH} component={MasterAdmin} />
                <Route component={NotFound} />
              </Switch>
            </AuthenticationLoading>
          </div>
        </Router>
      </div>
    );
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      this.props.setUserStatus(user);
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserStatus: user => {
      if (user) {
        dispatch(fetchUser(user.uid));
      } else {
        dispatch(logoutUser());
      }
    }
  };
};

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
