import { Response,Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { APP_BASE_URL } from "../config/env";
import { parse } from "path";


const prisma = new PrismaClient();


class ProductController {

  public async create(req: Request, res: Response) {
    const user = req.user as any;
    const {name,description,price,category} = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "All fields are required [name,description,price,category]",
      });
    }

    if(req.file === undefined){
        return res.status(400).json({
            message: "Image is required",
        });
    }
    const image = APP_BASE_URL+'/' + req.file.path;

    const categoryExists = await prisma.categories.findFirst({
        where: {
          id: parseInt(category),
          user:user
        },
      
    });
    
    if (categoryExists ===null) {
        return res.status(400).json({
            message: "Category does not exist",
        });
        
    }

    try{
        const product = await prisma.products.create({
            data: {
              name,
              description,
              userId:user.id,
              image,
              price:parseFloat(price),
              categoryId: parseInt(category),
            },
          });
          return res.status(201).json(product);
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Error adding product, try again!",
        });
    }
    
  }


  public async addCategory(req: Request, res: Response, next: NextFunction) {
    const user = req.user as any;
    const {name} = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }
    try{
        const category = await prisma.categories.create({
            data: {
              name,
              userId:user.id
            },
          });
          return res.status(201).json(category);
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message: "Error adding category, try again!",
        });
    }
}

}


export default ProductController;