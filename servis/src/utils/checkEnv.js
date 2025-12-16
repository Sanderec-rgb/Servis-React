export const checkEnvironment = () => {
    console.group('🔍 VERIFICACIÓN DE VARIABLES DE ENTORNO');
    console.log('VITE_FIREBASE_PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
    console.log('VITE_FIREBASE_STORAGE_BUCKET:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
    console.log('¿Coincide con "servis-restaurantes"?', 
        import.meta.env.VITE_FIREBASE_PROJECT_ID === 'servis-restaurantes');
    console.groupEnd();
};

// Luego en main.jsx o App.jsx, llama:
// checkEnvironment();