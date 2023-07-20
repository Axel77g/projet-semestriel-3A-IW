export default {
  init() {
    this.state = {
      ...this.state,
      ...router.auth,
    };
  },
};
