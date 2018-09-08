import React, { Component } from "react";

import "./home.css";
import { connect } from "react-redux";
import Intro from "../intro/Intro";
import HomeAppBar from "../app/header";
const QUEUE_BREAKER = "QUEUE BREAKER";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModal: false
    };
  }

  render() {
    return (
      <div>
        <HomeAppBar title={QUEUE_BREAKER} />
        <Intro />
      </div>
    );
  }

  toggleModal = () => {
    this.setState({
      loginModal: !this.state.loginModal
    });
  };
}

const mapStateToProps = state => {
  return {
    auth: state.AuthReducer
  };
};

export default connect(mapStateToProps)(Home);
