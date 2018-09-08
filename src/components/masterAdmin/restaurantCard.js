import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

function RestaurantCard(props) {
  const { classes, restaurant, path } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={restaurant.icon}
          title={restaurant.name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {restaurant.name}
          </Typography>
          <Typography component="p">{restaurant.address}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={path}> Open </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

RestaurantCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RestaurantCard);
