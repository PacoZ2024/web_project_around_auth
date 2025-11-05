class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards/`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error al cargar las cartas: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Error al cargar la información del usuario: ${res.status}`
      );
    });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewPlace(card) {
    return fetch(`${this.baseUrl}/cards/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: card.name, link: card.link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  isLiked(idCard) {
    return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({ isLiked: true }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteLiked(idCard) {
    return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "c7ddeb73-151f-41a7-9f67-d93995416067",
    "Content-Type": "application/json",
  },
});

export { api };
