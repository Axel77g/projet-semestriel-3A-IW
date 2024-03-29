import DomRenderer from "./DomRenderer.js";

export default class Component {
  static component_last_id = 1;

  constructor(props = {}, state = {}, parent) {
    this.state = state || {};
    this.props = props;
    this.$parent = parent;
    this.$components = [];
    this.id = Number(Component.component_last_id);
    this.key = props?.key || this.__proto__.constructor.name;
    Component.component_last_id += 1;
    this.applyMixins();
    this.init();
    this.onMounted();
  }

  applyMixins() {
    this.mixins.forEach((mixin) => {
      for (let prop in mixin) {
        if (typeof this[prop] == "function") {
          const originalFunction = this[prop].bind(this);
          const combinedFunction = (...args) => {
            originalFunction.apply(this, args);
            mixin[prop].apply(this, args);
          };
          this[prop] = combinedFunction;
        } else {
          this[prop] = mixin[prop];
        }
      }
    });
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

  update() {
    DomRenderer.update();
    this.onUpdate();
  }
  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.update();
  }

  init() {}

  onRerender() {}

  onUpdate() {}

  onMounted() {}

  findChildren(key, components = this.$components, componentIndex = 0) {
    if (key) {
      let childsMatch = components.filter((c) => c.key == key);
      if (childsMatch.length == 1) {
        let child = childsMatch[0];
        return child;
      } else if (childsMatch.length == 0) {
        return null;
      }
    }

    if (components.length > componentIndex) return components[componentIndex];
    return null;
  }

  get name() {
    return this.protoConstructor.name;
  }

  get protoConstructor() {
    return this.__proto__.constructor;
  }

  get structure() {
    return this.render();
  }

  get mixins() {
    return [];
  }

  propagate(event, data) {
    this.$components.forEach((c) => {
      c.propagate(event, data);
    });

    if (this[`on${event}`]) this[`on${event}`](data);
  }
}
