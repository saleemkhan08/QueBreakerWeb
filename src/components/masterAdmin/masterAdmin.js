import React, { Component } from "react";
import "./masterAdmin.css";
import { connect } from "react-redux";
import RestaurantCard from "./restaurantCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { fetchRestaurants } from "../../actions/restaurantActions";
import Authenticated, { RESTAURANTS_PATH } from "../routing/routing";
import Grid from "@material-ui/core/Grid";
import HomeAppBar from "../app/header";
const ADMIN = "ADMIN";
class MasterAdmin extends Component {
  componentDidMount() {
    const { restaurants } = this.props.data.restaurants;
    if (restaurants === undefined) {
      this.props.dispatch(fetchRestaurants());
    }
  }

  render() {
    const { isLoading } = this.props.data;
    const { restaurants } = this.props.data.restaurants;
    console.log("MasterAdmin : data : ", this.props.data);
    const currentPath = this.props.location.pathname;

    return (
      <Authenticated currentPath={currentPath}>
        <HomeAppBar title={ADMIN} />
        {isLoading ? this.showProgressSpinner() : this.showList(restaurants)}
      </Authenticated>
    );
  }

  showList(restaurants) {
    console.log("MasterAdmin : showList", restaurants);
    if (restaurants !== undefined && restaurants.length > 0) {
      return (
        <div>
          <Grid container className="root" spacing={16}>
            <Grid item xs={12}>
              <Grid container spacing={16} justify="center">
                {restaurants.map(restaurant => {
                  return this.getRestaurantRow(restaurant);
                })}
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return <h1>No Restaurants Found</h1>;
    }
  }

  showProgressSpinner() {
    return (
      <div className="loading-page">
        <div className="flex-center">
          <CircularProgress />
        </div>
      </div>
    );
  }

  getRestaurantRow(restaurant) {
    return (
      <Grid
        style={{ marginTop: "20px", marginLeft: "20px" }}
        key={restaurant.restaurantId}
        xs={12}
        sm={6}
        md={4}
        lg={3}
      >
        <RestaurantCard
          restaurant={restaurant}
          path={RESTAURANTS_PATH + "/" + restaurant.restaurantId}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.RestaurantReducer
  };
};

export default connect(mapStateToProps)(MasterAdmin);
