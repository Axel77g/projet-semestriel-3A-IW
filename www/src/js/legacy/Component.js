export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.domParentElement = null;
    this.elements = null;
    this.children = [];
    this.parent = null;
    this.init();
  }
  init() {}
  onUpdate() {}
  onMount() {}
  onDestroy() {}

  setState(newState) {
    this.state = Object.assign(this.state, newState);
    this.update();
    this.onStateChange(this.state);
  }
  onStateChange(...param) {}

  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    this.children = [];
    if (this.domElements instanceof Array) {
      this.elements.forEach((element) => {
        element.domElement.remove();
      });
    } else {
      this.elements.domElement.remove();
    }
    this.onDestroy();
  }

  update() {
    //this.destroy();
    this.build(this.domParentElement, this.parent, true);
  }

  build(domParentElement, parent) {
    this.children = [];
    let rendered = null;
    let firstBuild = true;
    this.parent = parent;
    this.domParentElement = domParentElement;
    if (this.elements) {
      rendered = this.elements;
      firstBuild = false;
    }
    this.elements = this.render();

    if (this.elements instanceof Array) {
      this.elements.forEach((element) => {
        element.build(domParentElement, this);
      });
    } else {
      this.elements.build(domParentElement, this, rendered);
    }

    if (firstBuild) {
      this.onMount();
    }

    this.onUpdate();
  }
}
