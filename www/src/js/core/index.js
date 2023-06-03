import UserList from "../components/backOffice/UserList.js";
import Component from "./Component.js";


window.createElement = function(tag, attrs = {}, children = []){
    let component = new Component(tag);
    if(attrs != null){
        for(let key in attrs){
            component.setAttribute(key, attrs[key]);
        }
    }
    if(children != null){
        console.log(children)
        debugger;
        if(!Array.isArray(children)){
            children = [children];
        }
        
        children.forEach(child => {
            component.addChild(child);
        });
    }
    return component;
};


window.userList = new UserList()
userList.render();