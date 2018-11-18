import axios from "axios";
import jwt from "jsonwebtoken";

const SECRET_KEY = "socialmedia101";
const LOCAL_STORAGE_ITEM = "user_token";

export default class AuthService {
  login = (username, password) => {
    return this.requestHTTP("/auth/login", {
      method: "post",
      data: { username, password }
    })
      .then(({ data, status }) => {
        if (status === 200) {
          this.setToken(data.token);
          return data;
        }
      })
      .catch(err => err);
  };

  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.tokenIsExpired(token);
  };

  setToken = token => {
    localStorage.setItem(LOCAL_STORAGE_ITEM, token);
  };

  getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_ITEM);
  };

  getUserInfo = () => {
    return this.requestHTTP("/user", {
      method: "get"
    })
      .then(res => res)
      .catch(err => err);
  };

  getUserPosts = () => {
    return this.requestHTTP("/user/posts", {
      method: "get"
    })
      .then(res => res)
      .catch(err => err);
  };

  createUserPost = content => {
    return this.requestHTTP("/user/create/post", {
      method: "post",
      data: { content }
    })
      .then(res => res)
      .catch(err => err);
  };

  updateUserPost = newContent => {
    return this.requestHTTP("/user/update/post", {
      method: "post",
      data: { newContent }
    })
      .then(res => res)
      .catch(err => err);
  };

  logout = () => {
    return this.requestHTTP("/user/logout", {
      method: "get"
    })
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem(LOCAL_STORAGE_ITEM);
          return this.getToken();
        }
      })
      .catch(err => console.log(err));
  };

  tokenIsExpired = token => {
    return jwt.verify(token, SECRET_KEY, err => {
      if (err) {
        return true;
      } else return false;
    });
  };

  signUp = (username, password, email) => {
    return this.requestHTTP("/auth/create/user", {
      method: "post",
      data: { username, password, email }
    })
      .then(({ data, status }) => {
        if (status === 200) {
          return data;
        }
      })
      .catch(err => err);
  };

  requestHTTP = (url, options) => {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    if (this.loggedIn()) {
      headers["Authorization"] = `Bearer ${this.getToken()}`;
    }

    return axios({ url, headers, ...options })
      .then(response => response)
      .catch(err => err);
  };
}
