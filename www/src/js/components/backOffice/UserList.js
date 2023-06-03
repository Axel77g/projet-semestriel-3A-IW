import Component from "../../core/Component.js";

export default class UserList extends Component{
    init(){
        this.state = {
            users: [
                {name: "John"},
                {name: "Doe"}
            ]
        };
    }
    fetchUser(){
        this.setState({
            users: [
                {name: "John"},
                {name: "Doe"}
            ]
        })
    }
    render(){
        console.log(this)
        let result =  createElement("div", {class: ["container"]}, [
            createElement("button", {onClick: this.fetchUser}, "Fetch User"),
            createElement("ul", {}, [
                this.state.users.map(user => createElement("li", {}, user.name))
            ])
        ])
        console.log(result)
    }
}
