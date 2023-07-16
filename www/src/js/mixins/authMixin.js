import { AUTH_STATE } from "../utils/auth.js";

export default {
  init() {
    this.state = {
      ...this.state,
      ...router.auth,
    };
  },
};
