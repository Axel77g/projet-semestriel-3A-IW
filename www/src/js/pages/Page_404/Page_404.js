import Button from "../../components/ui/Button.js";
import Component from "../../core/Component.js";
import Router from "../../core/Router.js";

export default class Page_404 extends Component {
  init() {
    document.title = "404";
  }

  render() {
    return createElement(
      "div",
      {
        class: [
          "d-flex",
          "align-items-center",
          "justify-content-center",
          "vh-100",
        ],
      },
      [
        createElement("div", { class: ["text-center"] }, [
          createElement("h1", { class: ["display-1", "fw-bold", "h1"] }, "404"),
          createElement("h2", {}, [
            createElement("span", { class: ["text-danger"] }, "Oops! "),
            createElement("span", {}, "Page not found"),
          ]),
          createElement(
            "p",
            { class: ["h4", "mb-5"] },
            "The page you’re looking for doesn’t exist."
          ),

          createElement(Button, {
            onClick: () => {
              router.push("/");
            },
            children: "Go Home",
          }),
        ]),
      ]
    );
  }
}
