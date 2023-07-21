export default class Element {
  constructor(tag = "div", attributes = {}, children = "") {
    this.tag = tag;
    this.attributes = attributes;
    this.children = Array.isArray(children)
      ? children.filter(Boolean)
      : children;
  }
}

export function createElement(tag, ...params) {
  return new Element(tag, ...params);
}
