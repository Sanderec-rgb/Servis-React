# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




Descripción breve del proyecto:
Una aplicación web moderna para descubrir y registrar restaurantes destacados. Diseñada con React, utiliza componentes modulares para presentar tarjetas de restaurantes, un slider interactivo, y permite a los usuarios agregar nuevos restaurantes.

📁 Estructura de archivos:

Servis/
├── index.html              # Página principal
├── src/
│   ├── App.jsx             # Componente principal de React
│   ├── main.jsx            # Punto de entrada de la app
│   ├── components/
│   │   ├── Header.jsx      # Encabezado y barra de navegación
│   │   ├── MobileMenu.jsx  # Menú móvil responsive
│   │   ├── Slider.jsx      # Carrusel de imágenes
│   │   ├── RestaurantCard.jsx # Tarjeta individual de restaurante
│   │   └── Footer.jsx      # Pie de página
│   ├── pages/
│   │   ├── Home.jsx        # Página de inicio con slider y tarjetas
│   │   ├── Search.jsx      # Página de búsqueda
│   │   └── NewRestaurant.jsx # Formulario para agregar restaurantes
│   ├── data/
│   │   └── restaurants.js  # Datos iniciales de restaurantes
│   └── styles/             # CSS global y de componentes
├── public/
│   └── img/                # Imágenes estáticas usadas en el proyecto
├── README.md               # Este archivo
├── package.json            # Dependencias y scripts del proyecto
└── vite.config.js          # Configuración del entorno de desarrollo


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


