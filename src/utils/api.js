import { getToken } from './token.js';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getHeaders() {
    const token = getToken();
    return {
      ...this._headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._getHeaders,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders,
    }).then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders,
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then(this._checkResponse);
  }

  addNewPlace(card) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._getHeaders,
      body: JSON.stringify({ name: card.name, link: card.link }),
    }).then(this._checkResponse);
  }

  isLiked(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._getHeaders,
      body: JSON.stringify({ isLiked: true }),
    }).then(this._checkResponse);
  }

  deleteLiked(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders,
    }).then(this._checkResponse);
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders,
      body: JSON.stringify({ avatar: data.avatar }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://se-register-api.en.tripleten-services.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { api };
