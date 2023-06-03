export default class Component{
    constructor(tag = "div"){
        this.element = document.createElement(tag);
        this.children = [];
        this.parent = document.body;
        this.textNode = null;
        this.init()
    }

    init(){
        this.state = {}
    }
    /**
     * @param {Component} child
     */
    addChild(child){
        if(child instanceof Component){
            child.setParent(this);
            this.children.push(child);
        }else{
            console.log(child)
            debugger;
            this.textNode = child;
        }
    }

    setState(newState){
        this.state = {...this.state, ...newState}
        this.render();
    }
    
    setParent(parent){
        this.parent = parent;
    }

    setAttribute(key, value){
        if(key.startsWith("on")){   
            this.element.addEventListener(key.substring(2).toLowerCase(), value);
        }else if(key == "class"){
            this.element.classList.add(...value);
        }else if(key == "style"){   
            for(let style in value){
                this.element.style[style] = value[style];
            }
        }else{
            this.element.setAttribute(key, value);
        }
    }
    getAttribute(key){
        return this.element.getAttribute(key);
    }

    render(){
        if(this.textNode != null)
            this.element.createTextNode(this.textNode);
        
        this.parent.appendChild(this.element);
        
        this.children.forEach(child => {
            child.render();
        });
    }
    
}
