//Conexión con firestore
import { db } from "../config/firebaseConfig.js";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

//Referencia a la colección "products"
const productsRef = collection(db, "products");

//FUNCIONES CRUD

//getAllProducts()
export async function getAllProducts() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


//getProductById(id)
// export async function getProductById(id) {
//   const ref = doc(db, "products", id);
//   const snap = await getDoc(ref);
//   return snap.exists() ? { id: snap.id, ...snap.data() } : null;
// }
export async function getProductById(id) {
  console.log("Buscando producto con ID:", id);
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  console.log("Documento encontrado:", snap.exists());
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
// POST 
export async function saveProduct(nombre, descripcion, imagen, precio, stock, categoria) {
  const docRef = await addDoc(productsRef, {
    nombre,
    descripcion,
    imagen,
    precio,
    stock,
    categoria
  });
  return { id: docRef.id, nombre, descripcion, imagen, precio, stock, categoria };
}

//PUT
export async function updateProduct(id, updates) {
  const ref = doc(db, "products", id);
  await updateDoc(ref, updates);
  const updated = await getDoc(ref);
  return { id: updated.id, ...updated.data() };
}

// DELETE

export async function deleteProduct(id) {
  const ref = doc(db, "products", id);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    return false; // No existe el documento
  }

  await deleteDoc(ref);
  return true; // Eliminado con éxito
}

//SEARCH
export async function searchProducts(query) {
  const snapshot = await getDocs(productsRef);
  const q = query.toLowerCase();

  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q)
    );
}

