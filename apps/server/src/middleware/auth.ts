import { Request,Response,NextFunction } from 'express';import jwt from 'jsonwebtoken';
declare global{namespace Express{interface Request{user?:{id:string;phone:string}}}}
export function auth(req:Request,res:Response,next:NextFunction){const h=req.headers.authorization;if(!h)return res.status(401).json({ok:false,message:'No token'});try{req.user=jwt.verify(h.replace('Bearer ',''),process.env.JWT_SECRET||'secret') as any;next();}catch{return res.status(401).json({ok:false,message:'Invalid token'});}}
export const sign=(u:{id:string;phone:string})=>jwt.sign(u,process.env.JWT_SECRET||'secret',{expiresIn:'7d'});
