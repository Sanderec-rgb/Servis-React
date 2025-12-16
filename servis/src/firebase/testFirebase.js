// Crea un archivo testFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  // Tu configuración aquí
};

const testConnection = async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const snapshot = await getDocs(collection(db, 'restaurants'));
    console.log('✅ Conexión exitosa. Documentos:', snapshot.size);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
};

testConnection();