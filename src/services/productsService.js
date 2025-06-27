//productsService es la capa intermedia entre los modelos y los controladores

import * as productModel from "../models/productsModel.js";
import { validateProduct } from "../utils/validations.js";

//Esta función llama al modelo y devuelve todos los productos.
export const getAllProducts = async () => {
  return await productModel.getAllProducts();
};

//Esta función llama al modelo, devuelve todos los productos y los filtra de acuerdo a ciertos criterios.
export const filterProducts = async (filters) => {
  // Obtiene todos los productos desde el modelo de datos
  const allProducts = await productModel.getAllProducts();

  return allProducts.filter(product => {
    return (
      // Si el usuario proporciona un nombre, busca coincidencias dentro del nombre del producto
      (!filters.nombre || product.nombre.toLowerCase().includes(filters.nombre.toLowerCase())) &&
      
      // Si el usuario proporciona una categoría, filtra los productos que coincidan con ella
      (!filters.categoria || product.categoria === filters.categoria) &&
      
      // Si el usuario establece un precio mínimo, filtra los productos con precio mayor o igual
      (!filters.precioMin || product.precio >= parseFloat(filters.precioMin)) &&
      
      // Si el usuario establece un precio máximo, filtra los productos con precio menor o igual
      (!filters.precioMax || product.precio <= parseFloat(filters.precioMax))
    );
  });
};

export const searchProducts = async (query) => {
  const allProducts = await productModel.getAllProducts();
  return allProducts.filter(p =>
    p.nombre.toLowerCase().includes(query.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(query.toLowerCase())
  );
};

//Esta función llama al modelo y devuelve un producto por su id
export const getProductById = async (id) => {
  return await productModel.getProductById(id);
};


//Esta función recibe los datos del nuevo producto y los envía al modelo para que lo cree en Firestore.

export const createProduct = async ({ nombre, descripcion, imagen, precio, stock, categoria }) => {
  // Validar antes de guardar
  validateProduct({ nombre, descripcion, imagen, precio, stock, categoria });

  // Guardar si la validación fue exitosa
  return await productModel.saveProduct(nombre, descripcion, imagen, precio, stock, categoria);
};

//Esta función actualiza un producto con el ID y los datos de modificación.
export const updateProduct = async (id, updates) => {
  const currentProduct = await productModel.getProductById(id);
  if (!currentProduct) throw new Error("Producto no encontrado");

  const updatedProduct = { ...currentProduct, ...updates };
  validateProduct(updatedProduct);

  return await productModel.updateProduct(id, updates);
};

//Esta función elimina un producto por ID.
export const deleteProduct = async (id) => {
  return await productModel.deleteProduct(id);
};


