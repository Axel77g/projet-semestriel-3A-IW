import Component from "../../../core/Component.js";

export class Step3 extends Component {
    render() {
        return createElement( "div", {class: ["container"]}, [
            createElement( "h1", {class: ["mb-3", "text-center"]}, "Thank you for installing our CMS !"),
        ]);
    
      }
    } 