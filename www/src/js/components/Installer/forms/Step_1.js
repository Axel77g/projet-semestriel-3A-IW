import Component from "../../../core/Component.js";

export class Step1 extends Component {
    init() {
        console.log(this.props)
        this.state = {
            form: {
                "input_name_database": this.props.form.input_name_database,
                "input_username_database": this.props.form.input_username_database,
                "input_password_database": this.props.form.input_password_database,
                "input_host_database": this.props.form.input_host_database,
                "input_table_prefix_database": this.props.form.input_table_prefix_database
        }
    }
    }

    render() {
        return createElement( "div", {class: ["container"]}, [
            createElement( "h1", {class: ["mb-3", "text-center"]}, "Database informations"),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_name_database", class: ["form-label"]}, "Database name"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_name_database", type: "text", class: ["form-control"], id: "input_name_database", placeholder: "Database name", value: this.state.form.input_name_database}),
            ]),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_username_database", class: ["form-label"]}, "Username"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_username_database", type: "text", class: ["form-control"], id: "input_username_database", placeholder: "Username", value: this.state.form.input_username_database}),
            ]),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_password_database", class: ["form-label"]}, "Password"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_password_database", type: "password", class: ["form-control"], id: "input_password_database", placeholder: "Password", value: this.state.form.input_password_database}),
            ]),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_host_database", class: ["form-label"]}, "Host"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_host_database", type: "text", class: ["form-control"], id: "input_host_database", placeholder: "Host", value: this.state.form.input_host_database}),
            ]),
            createElement( "div", {class: ["mb-3"]}, [
                createElement("label", {for: "input_table_prefix_database", class: ["form-label"]}, "Table prefix"),
                createElement("input", {onchange: this.props.setForm.bind(this), name: "input_table_prefix_database", type: "text", class: ["form-control"], id: "input_table_prefix_database", placeholder: "Table prefix", value: this.state.form.input_table_prefix_database}),
            ]),
        ]);
    
      }
    } 