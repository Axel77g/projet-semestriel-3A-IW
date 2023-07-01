import DomRenderer from "./DomRenderer.js";

export default class Component {
  static component_last_id = 1;

  constructor(props = {}, state = {}, parent) {
    this.state = state;
    this.props = props;
    this.$parent = parent;
    this.$components = [];
    this.id = Number(Component.component_last_id);
    Component.component_last_id += 1;
    this.init();
  }

  redefine(props = {}, state = {}, parent = null) {
    let newState = { ...this.state, ...state };
    let hasStateChange = JSON.stringify(newState) != JSON.stringify(this.state);
    this.state = newState;
    this.props = { ...this.props, ...props };
    this.parent = parent || this.parent;

    if (hasStateChange) {
      this.update();
    }
  }

  init() {}
  update() {
    DomRenderer.update();
  }
  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.update();
  }

  get structure() {
    return this.render();
  }
}
