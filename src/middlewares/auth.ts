import { NextFunction,Response,Request } from "express"
import { decodeTokenizedRequest } from "../utils/jwt"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function restrictToAdmins(req: Request, res:Response, next: NextFunction): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1]
    if (token === undefined) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    else{
        const {userId} = await decodeTokenizedRequest(token)
        const user = await prisma.users.findFirst(userId);
        if(user?.isAdmin){
            req.user = user;
            next();
        }
    }
    
    return res.status(401).json({ message: 'Unauthorized' })
    
  }
  
  export async function mustBeAuthenticated (req: Request, res:Response, next: NextFunction): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1]
    if (token === undefined) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    else{

        const {userId} = await decodeTokenizedRequest(token)
        const user = await prisma.users.findFirst(userId);
        if(user){
            req.user = user;
            return next();
        }
    }
    
    return res.status(401).json({ message: 'Unauthorized' })
  }

