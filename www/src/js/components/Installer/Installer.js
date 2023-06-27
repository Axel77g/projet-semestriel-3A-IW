import Component from "../../core/Component.js";
import API from "../../core/API.js";

import { Step0 } from "./forms/Step_0.js";
import { Step1 } from "./forms/Step_1.js";
import { Step2 } from "./forms/Step_2.js";
import { Step3 } from "./forms/Step_3.js";

export class Installer extends Component {
    init() {

        this.state = {
            form: {
                "input_name_site": "",
                "input_username_site": "",
                "input_password_site": "",
                "input_email_site": "",
                "input_name_database": "",
                "input_username_database": "",
                "input_password_database": "",
                "input_host_database": "",
                "input_table_prefix_database": "",
            }
        }

        this.state = {
            ...this.state,
            steps:[
                new Step0(),
                new Step1({form: this.state.form, setForm: this.setForm.bind(this)}),
                new Step2({form: this.state.form, setForm: this.setForm.bind(this)}),
                new Step3(),
            ],
            currentStep: 0
            
        }
    }

    nextStep() {
        console.log("next");
        if (this.state.currentStep < this.state.steps.length - 1) {
            this.setState({currentStep: this.state.currentStep + 1});
        }
    }

    previousStep() {
        if (this.state.currentStep > 0) {
            this.setState({currentStep: this.state.currentStep - 1});
        }
    }

    setForm(event) {
        this.setState({form: {...this.state.form, [event.target.name]: event.target.value}});
        this.setState({steps: [new Step0(), new Step1({form: this.state.form, setForm: this.setForm.bind(this)}), new Step2({form: this.state.form, setForm: this.setForm.bind(this)}), new Step3()]});
        console.log(this.state.form);
    }

    onStateChange(state)
    {

    }

    submitForm(event) {
        event.preventDefault();
        console.log("submit");

        // const api = new API();
        // api.post("install", this.state.form).then((response) => {
        //     console.log(response);
        // });
    }

    render() {
        return createElement("div", { class: ["container", "d-flex", "flex-column", "w-50"] }, [
            createElement("form", {onsubmit: this.submitForm.bind(this)}, [
                this.state.steps[this.state.currentStep],
                createElement("div", { class: ["d-flex", "justify-content-end"] }, [
                    createElement("button", { class: ["btn", "mx-3", "btn-primary", "w-25"], onclick: this.previousStep.bind(this)}, "Previous"),
        
                    createElement("button", { class: ["btn", "mx-3", "btn-primary", "w-25"], onclick: this.state.currentStep < this.state.steps.length - 1?this.nextStep.bind(this):(() => {}), type: this.state.currentStep < this.state.steps.length - 1?"button":"submit" }, this.state.currentStep < this.state.steps.length - 1?"Next":"Finish"),
                ])
            ]),
        ]);
    }
    } 