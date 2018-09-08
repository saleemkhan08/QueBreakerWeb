import React, { Component } from "react";
import "./Restaurant.css";
import Authenticated from "../routing/routing";
import Grid from "@material-ui/core/Grid";
import Calendar from "react-calendar";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import HomeAppBar from "../app/header";
import { fetchOrders } from "../../actions/ordersActions";
import styles from "./styles";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

class Restaurant extends Component {
  state = {
    date: new Date(),
    open: false
  };

  componentDidMount() {
    const { restaurantId } = this.props.match.params;
    this.props.fetchOrders(restaurantId, this.dateToDMY(this.state.date));
  }

  dateToDMY(date) {
    if (date === undefined) {
      return "";
    }
    const d = date.getDate();
    const m = date.getMonth() + 1; //Month from 0 to 11
    const y = date.getFullYear();
    return (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
  }

  handleDrawer = open => {
    this.setState({ open: open });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const { restaurantId } = this.props.match.params;
    const currentPath = this.props.location.pathname;
    const { orders } = this.props.reducer;

    return (
      <Authenticated currentPath={currentPath}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <HomeAppBar
              drawerIcon
              onDrawerIconClicked={() => this.toggleDrawer(true)}
            />
            <HomeAppBar
              isDrawerIconVisible={true}
              open={open}
              title="Restaurant"
              onDrawerIconClicked={() => this.handleDrawer(true)}
            />

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
              <Paper style={{ margin: "10px", padding: "5px" }}>
                <Calendar
                  onChange={date => {
                    this.setState({ date });
                    this.props.fetchOrders(restaurantId, this.dateToDMY(date));
                  }}
                  value={this.state.date}
                />
              </Paper>
            </Drawer>
            <main
              className={classNames(classes.content, classes[`content-left`], {
                [classes.contentShift]: open,
                [classes[`contentShift-left`]]: open
              })}
            >
              <div className={classes.drawerHeader} />
              <Grid container className="root" spacing={16}>
                <Grid item xs={12}>
                  <Grid container spacing={16} justify="center">
                    {this.showOrderList(orders)}
                  </Grid>
                </Grid>
              </Grid>
            </main>
          </div>
        </div>
      </Authenticated>
    );
  }

  showOrderList(orders) {
    if (this.props.reducer.isLoading) {
      return <Paper className="paper-style"> Loading ... </Paper>;
    } else if (orders.length > 0) {
      return orders.map(order => {
        return this.getOrderRow(order);
      });
    } else {
      return <Paper className="paper-style"> No Orders Found</Paper>;
    }
  }

  getOrderRow(order) {
    console.log("getOrderRow", order);
    return (
      <Paper className="paper-style">
        <p> {order.date} </p>
        <p> {order.totalAmount} </p>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    reducer: state.OrderReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (restaurantId, date) => {
      dispatch(fetchOrders(restaurantId, date));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Restaurant));
