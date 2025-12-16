// import { 
//     collection, 
//     getDocs, 
//     addDoc, 
//     query, 
//     orderBy,
//     where,
//     doc,
//     updateDoc,
//     deleteDoc,
//     serverTimestamp
// } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../firebase/config";

// const restaurantsCollection = collection(db, "restaurants");

// // Función auxiliar para manejar errores de Firebase
// const handleFirebaseError = (error) => {
//     console.error("Firebase Error:", error.code, error.message);
    
//     // Manejo específico por tipo de error
//     switch (error.code) {
//         case 'failed-precondition':
//             return 'La base de datos no está configurada correctamente.';
//         case 'unavailable':
//         case 'network-request-failed':
//             return 'Sin conexión a internet. Verifica tu red e intenta de nuevo.';
//         case 'permission-denied':
//             return 'No tienes permisos para realizar esta acción.';
//         case 'not-found':
//             return 'El recurso solicitado no fue encontrado.';
//         case 'storage/object-not-found':
//             return 'La imagen no fue encontrada en el servidor.';
//         case 'storage/unauthorized':
//             return 'No tienes autorización para subir archivos.';
//         case 'storage/canceled':
//             return 'La operación fue cancelada.';
//         case 'storage/unknown':
//             return 'Error desconocido en el almacenamiento.';
//         default:
//             return 'Ocurrió un error inesperado. Intenta de nuevo.';
//     }
// };

// // Verificar si hay conexión a internet
// const checkNetworkConnection = () => {
//     if (!navigator.onLine) {
//         throw new Error('Sin conexión a internet. Verifica tu red.');
//     }
// };

// export const restaurantsService = {
//     // READ: Obtener todos los restaurantes
//     async getRestaurants() {
//         try {
//             checkNetworkConnection();
            
//             const q = query(restaurantsCollection, orderBy("createdAt", "desc"));
//             const querySnapshot = await getDocs(q);
            
//             const restaurants = [];
//             querySnapshot.forEach((doc) => {
//                 restaurants.push({
//                     id: doc.id,
//                     ...doc.data()
//                 });
//             });
            
//             return restaurants;
//         } catch (error) {
//             console.error("Error al obtener restaurantes:", error);
            
//             // Si es error de red, lanzar mensaje específico
//             if (!navigator.onLine || error.code === 'unavailable' || error.code === 'network-request-failed') {
//                 throw new Error('No hay conexión a internet. No se pudieron cargar los restaurantes.');
//             }
            
//             // Para otros errores de Firebase
//             if (error.code) {
//                 throw new Error(handleFirebaseError(error));
//             }
            
//             // Error genérico
//             throw new Error('No se pudieron cargar los restaurantes. Intenta de nuevo.');
//         }
//     },

//     // CREATE: Agregar nuevo restaurante
//     async addRestaurant(restaurantData, imageFile = null) {
//         try {
//             checkNetworkConnection();
            
//             let imageUrl = "";
            
//             // Subir imagen si existe
//             if (imageFile) {
//                 // Validar tamaño del archivo (máximo 5MB)
//                 if (imageFile.size > 5 * 1024 * 1024) {
//                     throw new Error('La imagen es demasiado grande. Máximo 5MB.');
//                 }
                
//                 // Validar tipo de archivo
//                 const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
//                 if (!validTypes.includes(imageFile.type)) {
//                     throw new Error('Formato de imagen no válido. Usa JPG, PNG o WebP.');
//                 }
                
//                 const storageRef = ref(storage, `restaurants/${Date.now()}_${imageFile.name}`);
//                 await uploadBytes(storageRef, imageFile);
//                 imageUrl = await getDownloadURL(storageRef);
//             } else if (restaurantData.image) {
//                 imageUrl = restaurantData.image;
//             }
            
//             const newRestaurant = {
//                 name: restaurantData.name,
//                 description: restaurantData.description,
//                 address: restaurantData.address,
//                 image: imageUrl,
//                 createdAt: serverTimestamp(),
//                 updatedAt: serverTimestamp()
//             };
            
//             const docRef = await addDoc(restaurantsCollection, newRestaurant);
//             return { id: docRef.id, ...newRestaurant };
//         } catch (error) {
//             console.error("Error al agregar restaurante:", error);
            
//             // Si es error de red
//             if (!navigator.onLine || error.code === 'unavailable' || error.code === 'network-request-failed') {
//                 throw new Error('No hay conexión a internet. El restaurante se guardará cuando se recupere la conexión.');
//             }
            
//             // Si es error de validación (tamaño/tipo de imagen)
//             if (error.message.includes('demasiado grande') || error.message.includes('Formato de imagen')) {
//                 throw error;
//             }
            
//             // Para otros errores de Firebase
//             if (error.code) {
//                 throw new Error(handleFirebaseError(error));
//             }
            
//             // Error genérico
//             throw new Error('Error al agregar el restaurante. Verifica los datos e intenta de nuevo.');
//         }
//     },

//     // READ: Buscar restaurantes por nombre
//     async searchRestaurants(searchTerm) {
//         try {
//             checkNetworkConnection();
            
//             const q = query(
//                 restaurantsCollection,
//                 where("name", ">=", searchTerm),
//                 where("name", "<=", searchTerm + "\uf8ff"),
//                 orderBy("name")
//             );
            
//             const querySnapshot = await getDocs(q);
//             const restaurants = [];
//             querySnapshot.forEach((doc) => {
//                 restaurants.push({
//                     id: doc.id,
//                     ...doc.data()
//                 });
//             });
            
//             return restaurants;
//         } catch (error) {
//             console.error("Error al buscar restaurantes:", error);
            
//             // Si es error de red
//             if (!navigator.onLine || error.code === 'unavailable' || error.code === 'network-request-failed') {
//                 throw new Error('No hay conexión a internet. La búsqueda no está disponible.');
//             }
            
//             // Si es error de índice (puede pasar con Firestore)
//             if (error.code === 'failed-precondition') {
//                 throw new Error('La función de búsqueda necesita configuración adicional. Usa la búsqueda básica por ahora.');
//             }
            
//             // Para otros errores de Firebase
//             if (error.code) {
//                 throw new Error(handleFirebaseError(error));
//             }
            
//             // Error genérico
//             throw new Error('Error al buscar restaurantes. Intenta de nuevo.');
//         }
//     },

//     // UPDATE: Actualizar restaurante
//     async updateRestaurant(id, data) {
//         try {
//             checkNetworkConnection();
            
//             if (!id) {
//                 throw new Error('ID del restaurante no proporcionado.');
//             }
            
//             const restaurantRef = doc(db, "restaurants", id);
//             await updateDoc(restaurantRef, {
//                 ...data,
//                 updatedAt: serverTimestamp()
//             });
//             return { id, ...data };
//         } catch (error) {
//             console.error("Error al actualizar restaurante:", error);
            
//             // Si es error de red
//             if (!navigator.onLine || error.code === 'unavailable' || error.code === 'network-request-failed') {
//                 throw new Error('No hay conexión a internet. Los cambios se guardarán cuando se recupere la conexión.');
//             }
            
//             // Si el documento no existe
//             if (error.code === 'not-found') {
//                 throw new Error('El restaurante que intentas actualizar no existe.');
//             }
            
//             // Para otros errores de Firebase
//             if (error.code) {
//                 throw new Error(handleFirebaseError(error));
//             }
            
//             // Error genérico
//             throw new Error('Error al actualizar el restaurante. Intenta de nuevo.');
//         }
//     },

//     // DELETE: Eliminar restaurante
//     async deleteRestaurant(id) {
//         try {
//             checkNetworkConnection();
            
//             if (!id) {
//                 throw new Error('ID del restaurante no proporcionado.');
//             }
            
//             const restaurantRef = doc(db, "restaurants", id);
//             await deleteDoc(restaurantRef);
//             return true;
//         } catch (error) {
//             console.error("Error al eliminar restaurante:", error);
            
//             // Si es error de red
//             if (!navigator.onLine || error.code === 'unavailable' || error.code === 'network-request-failed') {
//                 throw new Error('No hay conexión a internet. No se puede eliminar en este momento.');
//             }
            
//             // Si el documento no existe
//             if (error.code === 'not-found') {
//                 throw new Error('El restaurante que intentas eliminar no existe.');
//             }
            
//             // Para otros errores de Firebase
//             if (error.code) {
//                 throw new Error(handleFirebaseError(error));
//             }
            
//             // Error genérico
//             throw new Error('Error al eliminar el restaurante. Intenta de nuevo.');
//         }
//     },

//     // Función auxiliar para verificar conexión
//     checkConnection: () => {
//         return navigator.onLine;
//     },

//     // Función para obtener datos de fallback (offline)
//     getFallbackRestaurants: () => {
//         return [
//             {
//                 id: 'offline-1',
//                 name: "Vista Mar",
//                 description: "Restaurante 5 estrellas con vista al mar. Datos cargados en modo offline.",
//                 address: "Av. Costera 123, Ciudad",
//                 image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
//                 createdAt: new Date().toISOString()
//             },
//             {
//                 id: 'offline-2',
//                 name: "La Terraza",
//                 description: "Cocina mediterránea en un ambiente acogedor. Datos en modo offline.",
//                 address: "Calle Principal 456, Ciudad",
//                 image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
//                 createdAt: new Date().toISOString()
//             }
//         ];
//     }
// };

import { 
    collection, 
    getDocs, 
    addDoc, 
    query, 
    orderBy,
    where,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/config";

const restaurantsCollection = collection(db, "restaurants");

// Función para convertir imagen a Base64 (DataURL)
const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// Función para comprimir imagen
const compressImage = (file, maxSizeKB = 300) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        img.onload = () => {
            let width = img.width;
            let height = img.height;
            const maxDimension = 800; // Ancho máximo 800px
            
            // Redimensionar si es muy grande
            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = (height * maxDimension) / width;
                    width = maxDimension;
                } else {
                    width = (width * maxDimension) / height;
                    height = maxDimension;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convertir a JPEG con calidad ajustable
            canvas.toBlob(
                (blob) => resolve(new File([blob], file.name, { type: 'image/jpeg' })),
                'image/jpeg',
                0.7 // Calidad 70%
            );
        };
        
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
};

export const restaurantsService = {
    // CREATE: Agregar nuevo restaurante CON IMAGEN
    async addRestaurant(restaurantData, imageFile = null) {
        try {
            console.log('📤 Iniciando guardado de restaurante...');
            
            let imageData = '';
            
            // 1. Si hay archivo de imagen, convertir a Base64
            if (imageFile) {
                console.log('🖼️ Procesando imagen...');
                
                // Validar tamaño (máximo 2MB)
                if (imageFile.size > 2 * 1024 * 1024) {
                    throw new Error('La imagen es demasiado grande. Máximo 2MB.');
                }
                
                // Validar tipo
                const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
                if (!validTypes.includes(imageFile.type)) {
                    throw new Error('Formato no válido. Usa JPG, PNG o WebP.');
                }
                
                // Comprimir imagen
                const compressedFile = await compressImage(imageFile, 300);
                
                // Convertir a Base64
                imageData = await convertImageToBase64(compressedFile);
                console.log('✅ Imagen convertida a Base64');
                
            } else if (restaurantData.image && restaurantData.image.startsWith('http')) {
                // 2. Si hay URL de imagen, usar directamente
                imageData = restaurantData.image;
                console.log('🔗 Usando URL de imagen proporcionada');
                
            } else {
                // 3. Si no hay imagen, usar una por defecto
                imageData = this.getDefaultImage();
                console.log('🖼️ Usando imagen por defecto');
            }
            
            // Preparar datos para Firestore
            const newRestaurant = {
                name: restaurantData.name,
                description: restaurantData.description,
                address: restaurantData.address,
                image: imageData, // Guarda Base64 o URL
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                hasImage: !!imageFile // Marcar si tiene imagen
            };
            
            console.log('📝 Guardando en Firestore:', {
                name: newRestaurant.name,
                hasImage: newRestaurant.hasImage,
                imageType: typeof newRestaurant.image
            });
            
            // Guardar en Firestore
            const docRef = await addDoc(restaurantsCollection, newRestaurant);
            
            console.log('✅ Restaurante guardado con ID:', docRef.id);
            return { 
                id: docRef.id, 
                ...newRestaurant,
                // Para mostrar inmediatamente en la UI
                createdAt: new Date().toISOString() 
            };
            
        } catch (error) {
            console.error("❌ Error en addRestaurant:", error);
            
            if (!navigator.onLine) {
                throw new Error('Sin conexión. Guarda los datos localmente y reintenta después.');
            }
            
            if (error.code === 'permission-denied') {
                throw new Error('Error de permisos. Verifica las reglas de Firestore.');
            }
            
            throw new Error(error.message || 'Error al guardar el restaurante.');
        }
    },
    
    // READ: Obtener todos los restaurantes
    async getRestaurants() {
        try {
            const q = query(restaurantsCollection, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            
            const restaurants = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                restaurants.push({
                    id: doc.id,
                    ...data,
                    // Asegurar que la imagen se muestre correctamente
                    image: data.image || this.getDefaultImage(),
                    // Convertir timestamp a fecha legible
                    createdDate: data.createdAt?.toDate?.() || new Date()
                });
            });
            
            console.log(`📊 ${restaurants.length} restaurantes cargados`);
            return restaurants;
            
        } catch (error) {
            console.error("Error al obtener restaurantes:", error);
            throw error;
        }
    },
    
    // Función para obtener imagen por defecto
    getDefaultImage() {
        const defaultImages = [
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyYzNlNTAiLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNlY2YwZjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5SZXN0YXVyYW50ZTwvdGV4dD4KPC9zdmc+",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        ];
        return defaultImages[Math.floor(Math.random() * defaultImages.length)];
    },
    
    // Función para probar conexión a Firestore
    async testConnection() {
        try {
            const testDoc = {
                name: "Prueba de Conexión",
                description: "Documento de prueba",
                address: "Dirección de prueba",
                image: this.getDefaultImage(),
                createdAt: serverTimestamp()
            };
            
            const docRef = await addDoc(restaurantsCollection, testDoc);
            await deleteDoc(doc(db, "restaurants", docRef.id));
            return true;
        } catch (error) {
            console.error("❌ Error de conexión a Firestore:", error);
            return false;
        }
    }
    
    // ... otros métodos (search, update, delete)
};