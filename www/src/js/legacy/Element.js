import Component from "./Component.js";

export default class Element {
  constructor(tag, attributes, children) {
    this.tag = tag;
    this.attributes = {};
    this._attributes = attributes;
    this.children = children;
    this.component = null;
    this.domElement = null;
  }

  setAttributes(domElement, attributes) {
    for (let key in attributes) {
      if (key.startsWith("on")) {
        this.createListener(
          domElement,
          key.substring(2).toLowerCase(),
          attributes[key]
        );
      } else if (key == "class") {
        domElement.classList.add(...attributes[key]);
      } else if (key == "style") {
        for (let style in value) {
          domElement.style[style] = value[style];
        }
      } else {
        domElement.setAttribute(key, attributes[key]);
      }
    }
  }

  createListener(domElement, eventName, callback) {
    if (eventName == "change") {
      domElement.addEventListener("input", (e) => {
        callback.call(this.component, e);

        try {
          let newInput = document.querySelector(
            "[value='" + e.target.value + "']"
          );
          newInput.focus();
          /* set cursor at the end */
          let val = newInput.value;
          newInput.value = "";
          newInput.value = val;
        } catch (error) {
          console.error(error);
        }
      });
      return;
    }
    domElement.addEventListener(eventName, callback.bind(this.component));
  }

  /* 
    @param {HTMLElement} parentDomElment
    @param {Component} component
    @param {Element} rendered
  */
  build(parentDomElment, component, rendered) {
    this.component = component;
    let domElement = document.createElement(this.tag);
    this.setAttributes(domElement, this._attributes);

    if (this.children instanceof Array) {
      this.children.forEach((child, i) => {
        if (child instanceof Component) {
          child.state = rendered?.children[i]?.state || child.state;
          child.elements = rendered?.children[i]?.elements || child.elements;
          component.children.push(child);
        }
        child.build(domElement, component);
      });
    } else {
      const textNode = document.createTextNode(this.children);
      domElement.appendChild(textNode);
    }

    this.domElement = domElement;

    /* Update DOM */
    if (rendered != null) {
      if (parentDomElment.contains(rendered.domElement)) {
        parentDomElment.replaceChild(domElement, rendered.domElement);
      } else {
        parentDomElment.appendChild(domElement);
      }
    } else {
      parentDomElment.appendChild(domElement);
    }
  }
}
