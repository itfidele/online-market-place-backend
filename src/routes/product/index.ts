import { upload } from "../../middlewares/upload";
import ProductController from "../../controllers/product.controller";
import { Router } from "express";
import { mustBeAuthenticated } from "../../middlewares/auth";

const productRouter = Router();


const productController = new ProductController();

productRouter.use(mustBeAuthenticated);
productRouter.post("/add/category",productController.addCategory);
productRouter.post("/create",upload.single('image'),productController.create);

export default productRouter;
