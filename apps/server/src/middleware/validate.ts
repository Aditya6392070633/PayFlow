import {Request,Response,NextFunction} from 'express';import {ZodSchema} from 'zod';
export const validate=(schema:ZodSchema)=>(req:Request,res:Response,next:NextFunction)=>{const out=schema.safeParse(req.body);if(!out.success)return res.status(400).json({ok:false,message:out.error.flatten()});req.body=out.data;next();};
