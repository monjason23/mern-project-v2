import React, { PureComponent } from "react";

import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import withAuth from "../Authentication/withAuth";
import { authLogin } from "../../Redux/Actions";

class Login extends PureComponent {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = prop => e => {
    this.setState({
      [prop]: e.target.value
    });
  };

  handleSubmit = () => e => {
    e.preventDefault();
    let { username, password } = this.state;
    let { authLogin } = this.props;

    authLogin(username, password);
  };

  render() {
    let {
      userLoggedIn,
      userAuth: { isLoading }
    } = this.props;

    if (userLoggedIn) {
      return <Redirect to="/profile" />;
    }

    if (isLoading) {
      return <div>Loading..</div>;
    }

    return (
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit()} className="login-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="login-form__input"
            onChange={this.handleInputChange("username")}
          />
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="login-form__input"
            onChange={this.handleInputChange("password")}
          />
          <br />
          <br />
          <button type="submit" className="login-form__button">
            Login
          </button>
          <Link to="/signup">Sign up</Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ userAuth }) {
  return {
    userAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: (username, password) => dispatch(authLogin(username, password))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withAuth(Login))
);
