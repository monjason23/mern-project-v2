import React, { PureComponent } from "react";

import { withRouter, Redirect, Route, Switch } from "react-router-dom";

import UserPostCreator from "./ProfileComponents/UserPostCreator";
import UserPostDetails from "./ProfileComponents/UserPostDetails";

import { connect } from "react-redux";

import withAuth from "../Authentication/withAuth";

import { authLogout, authGetUserInfo } from "../../Redux/Actions";

class Profile extends PureComponent {
  componentDidMount() {
    this.props.authGetUserInfo();
  }

  handleLogout = () => {
    this.props.authLogout();
  };

  render() {
    let {
      userLoggedIn,
      userInfo: { info }
    } = this.props;

    if (!userLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="profile">
        <h1 className="profile__header">Welcome, {info && info.username}!</h1>
        <button onClick={this.handleLogout}>Logout</button>

        <Route exact path={this.props.match.path} component={UserPostCreator} />
        <Route
          path={`${this.props.match.path}/posts/:postId`}
          component={UserPostDetails}
        />

        <br />
      </div>
    );
  }
}

function mapStateToProps({ userInfo }) {
  return {
    userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authGetUserInfo: () => dispatch(authGetUserInfo()),
    authLogout: () => dispatch(authLogout())
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withAuth(Profile))
);
