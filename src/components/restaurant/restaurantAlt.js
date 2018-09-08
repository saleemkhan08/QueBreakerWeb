import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import styles from "./styles";
import HomeAppBar from "../app/header";

class Restaurant extends React.Component {
  state = {
    open: false
  };

  handleDrawer = open => {
    this.setState({ open: open });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const drawer = (
      <Drawer
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => this.handleDrawer(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <HomeAppBar
            isDrawerIconVisible={true}
            open={open}
            title="Restaurant"
            onDrawerIconClicked={() => this.handleDrawer(true)}
          />

          {drawer}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open
            })}
          >
            <div className={classes.drawerHeader} />
            <Typography>
              {"You think water moves fast? You should see ice."}
            </Typography>
          </main>
        </div>
      </div>
    );
  }
}

Restaurant.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Restaurant);
