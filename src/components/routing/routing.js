import React, { Component } from "react";
import { connect } from "react-redux";
import "./routing.css";
import { Redirect } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
export const RESTAURANTS_PATH = "/restaurants";
export const INDIVIDUAL_RESTAURANT_PATH = RESTAURANTS_PATH + "/:restaurantId";

export const MASTER_ADMIN_PATH = "/masterAdmin";
export const HOME_PATH = "/";
export const MASTER_ADMIN = "masterAdmin";
export const RESTAURANT_ADMIN = "restaurantAdmin";
export const USER = "user";

export const NotFound = props => {
  return (
    <div className="view">
      <div className="flex-center center-text">
        <h2>Page Not Found</h2>
      </div>
    </div>
  );
};

function showSpinner() {
  return (
    <div className="loading-page">
      <div className="flex-center">
        <CircularProgress />
      </div>
    </div>
  );
}

export const AuthenticationLoading = props => {
  const { children, isChecking } = props;
  if (isChecking) {
    return showSpinner();
  } else {
    return <div> {children} </div>;
  }
};

class Authenticated extends Component {
  render() {
    const { children, currentPath } = this.props;
    const { isLoggedIn, isLoggingLoading, user } = this.props.auth;
    const correctPath = this.getCorrectPath(user);
    console.log(
      "Authenticated : render :",
      "currentPath :",
      currentPath,
      ", correctPath : ",
      correctPath
    );
    const isCorrectPath =
      user !== null &&
      (currentPath === correctPath || user.type === MASTER_ADMIN);
    if (isLoggingLoading) {
      return showSpinner();
    } else if (isLoggedIn && isCorrectPath) {
      return <div> {children} </div>;
    } else {
      return (
        <Redirect
          to={{
            pathname: correctPath
          }}
        />
      );
    }
  }

  getCorrectPath(user) {
    if (user) {
      switch (user.type) {
        case MASTER_ADMIN:
          return MASTER_ADMIN_PATH;
        case RESTAURANT_ADMIN:
          return RESTAURANTS_PATH + "/" + user.restaurantId;
        default:
          return HOME_PATH;
      }
    } else {
      return HOME_PATH;
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer
  };
};

export default connect(mapStateToProps)(Authenticated);
