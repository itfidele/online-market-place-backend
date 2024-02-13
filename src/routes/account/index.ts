import AuthController from "../../controllers/account.controller";
import { Router,Request,Response, NextFunction } from "express";


import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const authRouter = Router();
const authController = new AuthController();


passport.use(new LocalStrategy(async function verify(email, password, done){
    try {
      const user = await prisma.users.findFirst({
        where: {
          email,
          password,
        },
      });
  
      if (!user) {
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      return done(err);
    }
}));


  


authRouter.post("/login", authController.login);

authRouter.post("/register", authController.register);

export default authRouter;
