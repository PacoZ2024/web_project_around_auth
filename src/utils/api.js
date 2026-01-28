import { getToken } from './token';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  async _request(endpoint, method, body) {
    return await fetch(`${this._baseUrl}${endpoint}`, {
      method,
      headers: this._headers,
      body: JSON.stringify(body),
    }).then((res) => this._checkResponse(res));
  }

  getInitialCards() {
    return this._request('cards');
  }

  getUserInfo() {
    return this._request('users/me');
  }

  setUserInfo(data) {
    return this._request('users/me', 'PATCH', {
      name: data.name,
      about: data.about,
    });
  }

  addNewPlace(card) {
    return this._request('cards', 'POST', { name: card.name, link: card.link });
  }

  isLiked(idCard) {
    return this._request(`cards/${idCard}/likes`, 'PUT', { isLiked: true });
  }

  deleteLiked(idCard) {
    return this._request(`cards/${idCard}/likes`, 'DELETE');
  }

  setUserAvatar(data) {
    return this._request('users/me/avatar', 'PATCH', { avatar: data.avatar });
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, 'DELETE');
  }
}

const api = new Api({
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.pacosclub.mooo.com/'
      : 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
});

export { api };
