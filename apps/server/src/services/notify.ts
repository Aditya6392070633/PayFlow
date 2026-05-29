import { prisma } from '../config/prisma';
export async function notify(userId:string,type:string,title:string,body:string){return prisma.notification.create({data:{userId,type,title,body}})}
