import Api from "../../core/Api.js";
import Component from "../../core/Component.js";
import Button from "../ui/Button.js";

import Input from "../ui/Input.js";
import Select from "../ui/Select.js";
import Switch from "../ui/Switch.js";

export default class MenuFormCreate extends Component {
  init() {
    this.state = {
      isEdit: Boolean(router.route.params.id),
      title: "",
      parent_id: [],
      url: "",
      visible: false,
      position: "",
      messages: {},
    };
    if (this.state.isEdit) this.fetchMenu();
  }

  async fetchMenu() {
    let api = new Api();
    let menu = await api.get("api/menu/" + router.route.params.id);
    this.setState({ ...menu });
    console.log(menu);
  }

  async handleSubmit(e) {
    let api = new Api();

    let payload = {
      title: this.state.title,
      parent_id: this.state.parent_id,
      url: this.state.url,
      visible: this.state.visible,
      position: this.state.position,
    };

    let response;

    if (this.state.isEdit) {
      response = await api.put("api/menu/" + router.route.params.id, payload);
    } else {
      response = await api.post("api/menu", payload);
    }

    if (response.status === 200) {
      router.push("menus");
    } else {
      this.setState({ messages: response.data });
    }
  }

  render() {
    return createElement("div", { class: ["container-fluid", "mt-4"] }, [
      createElement(
        "h1",
        {},
        this.state.isEdit ? "Editer le menu" : "Créer le menu"
      ),
      createElement("div", { class: "row" }, [
        createElement("div", { class: "col-6" }, [
          createElement(Input, {
            key: "title",
            name: "title",
            placeholder: "Titre du menu",
            value: this.state.title,
            message: this.state.messages?.title,
            onChange: (e) => this.setState({ title: e.value }),
          }),
          createElement(Select, {
            key: "parent_id",
            name: "parent_id",
            placeholder: "Parent",
            options: [],
            value: this.state.parent_id,
            onChange: (e) => this.setState({ parent_id: e.value }),
          }),
          createElement(Input, {
            key: "url",
            name: "url",
            placeholder: "URL du menu",
            value: this.state.url,
            message: this.state.messages?.url,
            onChange: (e) => this.setState({ url: e.value }),
          }),
          createElement(Input, {
            key: "position",
            name: "position",
            placeholder: "Position",
            value: this.state.position,
            message: this.state.messages?.position,
            onChange: (e) => this.setState({ position: e.value }),
          }),
          createElement(Switch, {
            key: "visible",
            name: "visible",
            label: "Visible",
            checked: this.state.visible,
            message: this.state.messages?.visible,
            onChange: (e) => this.setState({ visible: e.checked }),
          }),
          createElement(Button, {
            key: "submit",
            class: ["btn", "btn-primary", "mt-4"],
            onClick: this.handleSubmit.bind(this),
            children: "Enregistrer",
          }),
        ]),
      ]),
    ]);
  }
}
