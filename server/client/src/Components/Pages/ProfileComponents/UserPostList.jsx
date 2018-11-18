import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

import { authGetUserPosts } from "../../../Redux/Actions";

class UserPostList extends PureComponent {
  componentDidMount() {
    this.props.authGetUserPosts();
  }

  render() {
    let { posts, isLoading } = this.props.userPosts;

    if (isLoading || !posts) {
      return <div>Loading..</div>;
    }

    console.log(posts);

    return (
      <div className="user-post-list">
        {posts.map(post => (
          <Link key={post._id} to={`${this.props.match.url}/posts/${post._id}`}>
            <UserPost postData={post} />
          </Link>
        ))}
      </div>
    );
  }
}

class UserPost extends PureComponent {
  render() {
    return <div className="user-post">{this.props.postData.content}</div>;
  }
}

function mapStateToProps({ userPosts }) {
  return {
    userPosts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authGetUserPosts: () => dispatch(authGetUserPosts())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserPostList));