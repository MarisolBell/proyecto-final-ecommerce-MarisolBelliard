export const validateProduct = ({ nombre, descripcion, imagen, precio, stock, categoria }) => {
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    throw new Error("Product name is required and must be a non-empty string.");
  }

  if (!descripcion || typeof descripcion !== "string" || descripcion.trim() === "") {
    throw new Error("Product description is required and must be a non-empty string.");
  }

  if (!Array.isArray(imagen) || imagen.length === 0 || !imagen.every(url => typeof url === "string" && url.startsWith("http"))) {
    throw new Error("Product images must be an array of valid URLs.");
  }

  if (typeof precio !== "number" || isNaN(precio) || precio <= 0) {
    throw new Error("Price must be a number greater than 0.");
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new Error("Stock must be an integer greater than or equal to 0.");
  }

  const allowedCategories = ["cintos", "collares", "billeteras", "pulseras", "aros"];
  if (!categoria || !allowedCategories.includes(categoria.toLowerCase())) {
    throw new Error(`Category must be one of the following: ${allowedCategories.join(", ")}`);
  }
};
