import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import { MASTER_ADMIN_PATH, HOME_PATH } from "../routing/routing";
import styles from "./styles";

class HomeAppBar extends React.Component {
  render() {
    const {
      classes,
      open,
      title,
      isDrawerIconVisible,
      onDrawerIconClicked
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes[`appBarShift-left`]]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            {isDrawerIconVisible
              ? this.showAppDrawerIcon(classes, onDrawerIconClicked, open)
              : ""}

            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.flex}
            >
              {title}
            </Typography>

            <div className="navbar-btns-container">
              <NavLink to={MASTER_ADMIN_PATH}>
                <Button className="btn-outline link-override">
                  RESTAURANTS
                </Button>
              </NavLink>

              {this.props.auth.isLoggedIn
                ? this.getLogoutLink()
                : this.getLoginLink()}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  getLoginLink() {
    return (
      <NavLink to="#">
        <Button
          className="btn-outline link-override"
          onClick={() => this.loginWithGoogle()}
        >
          LOGIN
        </Button>
      </NavLink>
    );
  }

  showAppDrawerIcon(classes, onDrawerIconClicked, open) {
    return (
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={() => onDrawerIconClicked()}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
    );
  }

  loginWithGoogle() {
    console.log("loginWithGoogle");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  getLogoutLink() {
    return (
      <NavLink to="#" className="link-override">
        <Button
          className="btn-outline link-override"
          onClick={() => firebase.auth().signOut()}
        >
          LOGOUT
        </Button>
      </NavLink>
    );
  }
}

HomeAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer
  };
};

export default connect(mapStateToProps)(withStyles(styles)(HomeAppBar));
