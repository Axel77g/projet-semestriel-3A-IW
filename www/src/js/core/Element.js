export default class Element {
  constructor(tag = "div", attributes = {}, children = {}) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
  }
}

export function createElement(tag, ...params) {
  return new Element(tag, ...params);
}
