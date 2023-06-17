export default class Component {
  constructor(options = {}) {
    let tag = options.tag || "div";
    this.props = options;
    this.element = document.createElement(tag);
    this.children = [];
    this.renderedChildren = [];
    this.parent = document.body;
    this.textNode = null;

    this.init();
  }

  init() {
    this.state = {};
  }
  /**
   * @param {Component} child
   */
  addChild(child) {
    if (child instanceof Component) {
      child.setParent(this);
      this.children.push(child);
    } else {
      this.textNode = child;
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  setParent(parent) {
    this.parent = parent;
  }

  setAttribute(key, value) {
    if (key.startsWith("on")) {
      this.element.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (key == "class") {
      this.element.classList.add(...value);
    } else if (key == "style") {
      for (let style in value) {
        this.element.style[style] = value[style];
      }
    } else {
      this.element.setAttribute(key, value);
    }
  }
  getAttribute(key) {
    return this.element.getAttribute(key);
  }

  render() {
    return this.children;
  }

  update() {
    if (this.parent instanceof Component) {
      this.parent.destroy();
      this.parent.build();
    } else {
      this.destroy();
      this.build();
    }
  }

  destroy() {
    this.renderedChildren.forEach((child) => {
      if (child instanceof Component) {
        child.destroy();
      }
    });
    this.element.remove();
  }

  build() {
    let children = this.render() || this.children || [];
    if (!Array.isArray(children)) children = [children];
    children.forEach((child) => {
      child.setParent(this);
    });

    if (this.parent instanceof Component) {
      this.parent.element.appendChild(this.element);
    } else this.parent.appendChild(this.element);

    //add the text node
    try {
      if (this.textNode != null) {
        let textNode = document.createTextNode(this.textNode);
        this.element.appendChild(textNode);
      }
    } catch (error) {
      console.error(error);
      console.log(this.element);
    }

    children.forEach((child, i) => {
      if (child instanceof Component) {
        child.build();
      }
    });

    this.renderedChildren = children;
  }
}
