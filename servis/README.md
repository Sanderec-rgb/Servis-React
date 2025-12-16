<img width="1349" height="636" alt="image" src="https://github.com/user-attachments/assets/3e92c42e-6d5f-4174-a4b5-24314435063e" /># React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🍽️ Servis - Aplicación para Descubrir Restaurantes

**Servis** es una aplicación web moderna construida con **React + Vite**, que permite a los usuarios descubrir, buscar y agregar nuevos restaurantes a una base de datos centralizada usando **Firebase**. Fue desarrollada como un proyecto práctico para aprender desarrollo frontend, integración con backend (Firestore), y gestión de estado.

---

## 📁 Estructura del Proyecto

Servis/ ├── index.html # Página principal ├── src/ │ ├── App.jsx # Componente principal de React │ ├── main.jsx # Punto de entrada de la app │ ├── components/ │ │ ├── Header.jsx # Encabezado y barra de navegación │ │ ├── MobileMenu.jsx # Menú móvil responsive │ │ ├── Slider.jsx # Carrusel de imágenes │ │ ├── RestaurantCard.jsx # Tarjeta individual de restaurante │ │ └── Footer.jsx # Pie de página │ ├── pages/ │ │ ├── Home.jsx # Página de inicio con slider y tarjetas │ │ ├── Search.jsx # Página de búsqueda │ │ └── NewRestaurant.jsx # Formulario para agregar restaurantes │ ├── data/ │ │ └── restaurants.js # Datos iniciales de restaurantes │ ├── services/ │ │ └── restaurantsService.js # Servicio para gestionar operaciones de restaurantes │ ├── firebase/ │ │ ├── config.js # Configuración de Firebase │ │ └── testFirebase.js # Pruebas de conexión con Firebase │ ├── utils/ │ │ └── checkEnv.js # Verificación de variables de entorno │ ├── assets/ # Recursos estáticos como imágenes o íconos │ │ └── react.svg │ ├── index.css # Estilos globales │ └── styles/ │ └── App.css # Estilos específicos de App ├── public/ │ ├── img/ # Imágenes estáticas usadas en el proyecto │ │ └── placeholder.jpg │ └── vite.svg # Logo de Vite ├── .env.local # Variables de entorno locales ├── .env.example # Ejemplo de variables de entorno ├── README.md # Este archivo ├── package.json # Dependencias y scripts del proyecto ├── package-lock.json # Bloqueo de versiones de dependencias ├── vite.config.js # Configuración del entorno de desarrollo ├── eslint.config.js # Configuración de ESLint └── .gitignore # Archivos ignorados por Git

---

Nombre del estudiante

Maria Adelaida Bernal Tangarife
Isabella Perdomo Hernández
Carlos Mario Mosquera 
Sander Enrique Camargo Orozco

Estructura de archivos
Instrucciones para ejecutar el proyecto
Asegúrate de tener instalado un servidor local o abre directamente el archivo index.html en tu navegador.
Alternativamente, si usas Vite:
Ejecuta npm run dev para iniciar el servidor de desarrollo.
Abre el enlace proporcionado en tu navegador.

<img width="1349" height="637" alt="image" src="https://github.com/user-attachments/assets/793b93d6-aafe-4e71-b40a-4f809549fdba" />
<img width="1349" height="636" alt="image" src="https://github.com/user-attachments/assets/a8f21404-879f-4b05-9bb3-a05cd333ba25" />
<img width="1349" height="638" alt="image" src="https://github.com/user-attachments/assets/527f54cc-5b11-4803-942e-231baa43c5d8" />


## 🔧 Tecnologías Usadas

- **React** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de desarrollo rápida y moderna
- **Firebase (Firestore)** - Base de datos en tiempo real y autenticación
- **CSS3** - Estilos personalizados
- **ESLint** - Linter para código limpio y consistente

---

## ⚙️ Configuración Inicial

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/servis.git
cd servis