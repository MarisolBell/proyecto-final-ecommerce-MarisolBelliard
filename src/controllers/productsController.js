import * as productService from "../services/productsService.js";

export const getAllProductsController = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

export const filterProductsController = async (req, res) => {
  try {
    const filtered = await productService.filterProducts(req.query);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: "Error al filtrar productos" });
  }
};

export const createProductController = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Error al crear producto" });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

export const patchProductController = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error al aplicar actualización parcial" });
  }
};

export const searchProductsController = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== "string" || q.trim() === "") {
      return res.status(400).json({ message: "Falta o es inválido el parámetro de búsqueda" });
    }

    const results = await productService.searchProducts(q.trim());
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error en la búsqueda" });
  }
};