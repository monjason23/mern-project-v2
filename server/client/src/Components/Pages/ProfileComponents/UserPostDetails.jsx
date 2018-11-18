import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UserPostDetails extends PureComponent {
  render() {
    let { postId } = this.props.match.params;
    let {
      userPosts: { posts }
    } = this.props;

    let userPost = posts.filter(post => post._id === postId)[0];
    return (
      <Fragment>
        <div className="user-post-details">
          <small>{userPost.date}</small>
          <h2 className="user-post-details__title">{userPost.content}</h2>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({ userPosts }) {
  return {
    userPosts
  };
}

export default connect(mapStateToProps)(withRouter(UserPostDetails));
