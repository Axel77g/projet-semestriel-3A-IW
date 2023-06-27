import Component from "../../../core/Component.js";

export class Step2 extends Component {

    init() {
        console.log(this.props)
        this.state = {
            form: {
                "input_name_site": this.props.form.input_name_site,
                "input_username_site": this.props.form.input_username_site,
                "input_password_site": this.props.form.input_password_site,
                "input_email_site": this.props.form.input_email_site,
            }
    }
    }

    render() {
        return createElement( "div", {class: ["container"]}, [
            createElement( "h1", {class: ["mb-3", "text-center"]}, "Site informations"),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_name_site", class: ["form-label"]}, "Site name"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_name_site", type: "text", class: ["form-control"], id: "input_name_site", placeholder: "site name", value: this.state.form.input_name_site}),
            ]),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_username_site", class: ["form-label"]}, "Username"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_username_site", type: "text", class: ["form-control"], id: "input_username_site", placeholder: "Username", value: this.state.form.input_username_site}),
            ]),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_password_site", class: ["form-label"]}, "Password"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_password_site", type: "password", class: ["form-control"], id: "input_password_site", placeholder: "Password", value: this.state.form.input_password_site}),
            ]),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_email_site", class: ["form-label"]}, "Email"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_email_site", type: "email", class: ["form-control"], id: "input_email_site", placeholder: "Email", value: this.state.form.input_email_site}),
            ]),
        ]);
      }
    } 