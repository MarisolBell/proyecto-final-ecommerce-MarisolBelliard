import express from "express";
import * as productController from "../controllers/productsController.js";
import  {authenticateToken} from "../middlewares/authentication.js";

const router = express.Router();

router.get("/products", productController.getAllProductsController);
router.get("/products/search", productController.searchProductsController);
router.get("/products/filter", productController.filterProductsController);
router.get("/products/:id", productController.getProductByIdController);
router.post("/products/create", authenticateToken, productController.createProductController);
router.put("/products/:id", authenticateToken, productController.updateProductController);
router.patch("/products/:id", authenticateToken, productController.patchProductController);
router.delete("/products/:id", authenticateToken, productController.deleteProductController);

export default router;
