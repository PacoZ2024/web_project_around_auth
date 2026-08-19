# Around The U.S. - Frontend

> Una aplicación web interactiva que permite a los usuarios registrarse, iniciar sesión, gestionar su información de perfil y compartir imágenes de lugares emblemáticos de los Estados Unidos, incluyendo funciones interactivas como dar "me gusta" y eliminar tarjetas fotográficas. El proyecto está completamente desacoplado en una arquitectura de Frontend y Backend.

1. **Proyecto desplegado:** [![Proyecto desplegado](https://img.shields.io/badge/Proyecto%20desplegado-8A2BE2)](https://www.around-the-us-2025.mooo.com/signin)

2. **Backend:** [![Repositorio Backend](https://img.shields.io/badge/Repositorio%20Backend-8A2BE2)](https://github.com/PacoZ2024/web_project_api_full)

---

## 📦 Características del Frontend

- Formularios interactivos controlados para Registro e Inicio de Sesión.
- Modales estructurados en componentes de React para editar avatar, editar perfil y añadir imágenes.
- Rutas protegidas (`ProtectedRoute`) para evitar el acceso de usuarios no autenticados a la línea de tiempo.

---

## 🛠️ Tecnologías Utilizadas

- **React.js** (Hooks, Contextos y Enrutamiento)
- **JavaScript (ES6+)**
- **CSS3** (Diseño responsivo, Grid, Flexbox)
- **Vite / Create React App**

---

## 💻 Instalación y Configuración Local

Para ejecutar el proyecto completo en tu máquina local, sigue las instrucciones:

### 1. Clonar el repositorio

```bash
git clone https://github.com/PacoZ2024/web_project_around_auth.git
```

### 2. Configuración del Frontend

Navega al directorio del frontend e instala las dependencias:

```bash
cd ../web_project_around_auth
npm install
```

Asegúrate de configurar la URL base de la API en tu archivo de configuración del frontend (`src/utils/auth.js` o similar) apuntando a `http://localhost:3000` para pruebas locales.

Inicia el entorno de desarrollo del frontend:

```bash
npm start
```

---
