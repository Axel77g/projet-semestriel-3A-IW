export default class Api {
  header = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: localStorage.getItem("authorization"),
  });

  baseUrl = "http://" + window.location.hostname + ":8080/";

  get(url, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "GET",
      headers: this.header,
      ...options,
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("authorization");
          window.location.href = "/login";
        }
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  post(url, data, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.header,
      body: JSON.stringify(data),
      ...options,
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("authorization");
          window.location.href = "/login";
        }
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  put(url, data, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "PUT",
      headers: this.header,
      body: JSON.stringify(data),
      ...options,
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("authorization");
          window.location.href = "/login";
        }
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }

  delete(url, options = {}) {
    return fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.header,
      ...options,
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("authorization");
          window.location.href = "/login";
        }
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  }
}
