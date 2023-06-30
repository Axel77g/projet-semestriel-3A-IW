export default class Api {
  header = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  baseUrl = "http://" + window.location.hostname + ":8080/";

  get(url, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "GET",
      headers: this.header,
      ...options,
    })
      .then((res) => res.json())
      .catch((err) => err);
  }

  post(url, data, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.header,
      body: JSON.stringify(data),
      ...options,
    })
      .then((res) => res.json())
      .catch((err) => err);
  }

  put(url, data, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "PUT",
      headers: this.header,
      body: JSON.stringify(data),
      ...options,
    })
      .then((res) => res.json())
      .catch((err) => err);
  }

  delete(url, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.header,
      ...options,
    })
      .then((res) => res.json())
      .catch((err) => err);
  }
}
