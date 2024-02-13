import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { getUserToken } from "../utils/jwt";

const db = new PrismaClient();

class AuthController {

  public async login(req: Request, res: Response) {
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await db.users.findFirst({
      where: {
        email,
        password,
      },
    });
    if (user) {
      const token = await getUserToken(user.email, user.id, false);
      return res.status(200).json({
        token
      });
    }
    return res.status(401).json({
      messge:"Invalid email or password"
    })
  }

  public async register(req: Request, res: Response) {
    const { email, password,first_name,last_name,contact } = req.body;
    const user = await db.users.findFirst({
      where:{
        email
      }
    });
    if(user){
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    try{
      const user = await db.users.create({
        data: {
          email,
          password,
          first_name,
          last_name,
          contact
        },
      });
      return res.status(201).json({
        message: "User created successfully",
      });
    }
    catch(err){
      return res.status(400).json({
        message: "User not created",
      });
    }
    
  }
}

export default AuthController;
