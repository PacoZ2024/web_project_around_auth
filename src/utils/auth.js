const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : res.status === 400
      ? Promise.reject('Uno de los campos se rellenó de forma incorrecta')
      : Promise.reject(`Error: ${res.status}`);
  });
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : res.status === 400
      ? Promise.reject('No se ha proporcionado uno o más campos')
      : res.status === 401
      ? Promise.reject(
          'no se ha encontrado al usuario con el correo electrónico especificado'
        )
      : Promise.reject(`Error: ${res.status}`);
  });
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : res.status === 400
      ? Promise.reject(
          'Token no proporcionado o proporcionado en el formato incorrecto'
        )
      : res.status === 401
      ? Promise.reject('El token provisto es inválido')
      : Promise.reject(`Error: ${res.status}`);
  });
}
