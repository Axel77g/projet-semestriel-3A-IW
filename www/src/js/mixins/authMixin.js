import Api from "../core/Api.js";

export const AUTH_STATE = {
  UNKOWN: undefined,
  AUTH: true,
  NOT_AUTH: false,
};

export default {
  init() {
    this.state = {
      ...this.state,
      isAuth: AUTH_STATE.UNKOWN,
      user: null,
    };
    this.getAuth();
  },

  async getAuth() {
    const user = await this.getUser();
    let isAuth = Boolean(user);
    this.setState({ isAuth, user });
    return isAuth;
  },

  async getUser() {
    const api = new Api(false);
    try {
      const response = await api.get("api/users/me");
      if (response instanceof Error) throw new response();
      const user = response;
      return user;
    } catch (error) {
      return null;
    }
  },

  getStatus() {},
};
