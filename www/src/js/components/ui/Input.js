import Component from "../../core/Component.js";
import { createElement } from "../../core/Element.js";

export default class Input extends Component {
  init() {
    this.state = {
      passwordVisible: false,
      passwordStrength: 0,
      focus: false,
    };
  }

  protect(string) {
    return string.replace(/[<>&'"`]/g, function (match) {
      switch (match) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&#x27;";
        case '"':
          return "&quot;";
        case "`":
          return "&#x60;";
      }
    });
  }

  handleChange(e) {
    if (this.props.onChange) {
      this.props.onChange({
        event: e,
        value: this.protect(e.srcElement.value),
        name: this?.props?.name,
        type: this?.props?.type,
        id: this?.props?.id,
      });
    }
  }
  get strengh() {
    if (this.state.passwordStrength <= 33) return "weak";
    if (this.state.passwordStrength <= 66) return "medium";
    return "strong";
  }
  get input() {
    if (this.props.type === "textarea") {
      return createElement(
        "textarea",
        {
          name: this.props.name,
          class: ["form-control"],
          id: this.props.name,
          placeholder: this.props.placeholder,
          value: this.props.value ?? "",
          onchange: this.handleChange.bind(this),
          ...(this.props?.attributes ?? {}),
        },
        this.props.value ?? ""
      );
    } else if (this.props.type === "password") {
      //add a password toggle + password strength
      return createElement("div", {}, [
        createElement("div", { class: ["input-group"] }, [
          createElement("input", {
            type: this.state.passwordVisible ? "text" : "password",
            name: this.props.name,
            class: ["form-control"],
            id: this.props.name,
            placeholder: this.props.placeholder,
            value: this.props.value ?? "",
            oninput: (e) => {
              this.setState({
                passwordStrength: (e.srcElement.value.length * 100) / 8,
              });
            },
            onchange: (e) => {
              this.handleChange(e);
            },
            onfocus: () => {
              this.setState({ focus: true });
            },
            onblur: () => {
              this.setState({ focus: false });
            },
            ...(this.props?.attributes ?? {}),
          }),
          createElement(
            "button",
            {
              class: ["btn", "btn-outline-secondary"],
              type: "button",
              onclick: () => {
                this.setState({
                  passwordVisible: !this.state.passwordVisible,
                });
              },
            },
            [
              createElement("i", {
                class: [
                  "bi",
                  !this.state.passwordVisible
                    ? "bi-eye-fill"
                    : "bi-eye-slash-fill",
                ],
              }),
            ]
          ),
        ]),
        (this.state.focus || this.props.value) &&
          createElement("div", { class: ["password-strength"] }, [
            createElement("div", {
              class: [
                "password-strength-bar",
                "password-strength-bar--" + this.strengh,
              ],
              style: {
                "--w": Math.min(this.state.passwordStrength, 100) + "%",
              },
            }),
          ]),
      ]);
    } else {
      if (this.props.readonly) {
        return createElement(
          "div",
          {
            class: ["form-control", "text-muted"],
            id: this.props.name,
            placeholder: this.props.placeholder,
            value: this.props.value ?? "",
            readonly: true,
            onchange: this.handleChange.bind(this),
            ...(this.props?.attributes ?? {}),
          },
          this.props.value ?? ""
        );
      }
      return createElement("input", {
        type: this.props.type ?? "text",
        name: this.props.name,
        class: ["form-control"],
        id: this.props.name,
        placeholder: this.props.placeholder,
        value: this.props.value ?? "",
        onchange: this.handleChange.bind(this),
        ...(this.props?.attributes ?? {}),
      });
    }
  }

  render() {
    return createElement(
      "div",
      {
        class: ["form-group"],
      },
      [
        createElement(
          "label",
          {
            for: this.props.name,
            class: ["form-label"],
          },
          this.props.placeholder
        ),
        this.input,
        createElement(
          "div",
          { class: ["text-danger", "fs-6"] },
          this.props.message ? this.props.message[0] : ""
        ),
      ]
    );
  }
}
