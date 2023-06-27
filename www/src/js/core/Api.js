export default class Api{

    header = new Headers(
        {"Content-Type": "application/json"}
    );

    baseUrl = "http://" + window.location.hostname + ":8080/";
    
    get(url, options = {}) {
        console.log(this.baseUrl + url)
        return fetch(this.baseUrl + url, {
            method: "GET",
            headers: this.header,
            ...options
        }).then(res => res.json());
    }

    post(url, data, options = {}) {
        return fetch(this.baseUrl + url, {
            method: "POST",
            headers: this.header,
            body: JSON.stringify(data),
            ...options
        }).then(res => res);
    }

    put(url, data, options = {}) {
        return fetch(this.baseUrl + url, {
            method: "PUT",
            headers: this.header,
            body: JSON.stringify(data),
            ...options
        }).then(res => res.json());
    }

    delete(url, options = {}) {
        return fetch(this.baseUrl + url, {
            method: "DELETE",
            headers: this.header,
            ...options
        }).then(res => res.json());
    }
}