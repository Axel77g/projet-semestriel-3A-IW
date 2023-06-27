import Component from "../core/Component.js";

export default class Button extends Component{
    constructor(){
        super("button");
    }
    render(){

    }
}



function UserList(){
    const users = []
    const fetchUser = ()  =>{
        users = res.data
    }



    return <div>
        <button onClick={fetchUser}>Fetch User</button>
        <ul>
            {users.map(user => <li>{user.name}</li>)}
        </ul>
    </div>
}