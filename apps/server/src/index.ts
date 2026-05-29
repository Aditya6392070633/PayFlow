import 'dotenv/config';import express from 'express';import cors from 'cors';import helmet from 'helmet';import morgan from 'morgan';import http from 'http';import {Server} from 'socket.io';
import authRoutes from './routes/auth.routes';import walletRoutes from './routes/wallet.routes';import transactionRoutes from './routes/transaction.routes';import splitRoutes from './routes/split.routes';import notificationRoutes from './routes/notification.routes';import futureRoutes from './routes/future.routes';
const app=express();app.use(cors());app.use(helmet());app.use(morgan('dev'));app.use(express.json());
app.get('/health',(_,res)=>res.json({ok:true,name:'PayFlow API'}));app.use('/auth',authRoutes);app.use('/wallet',walletRoutes);app.use('/transactions',transactionRoutes);app.use('/splits',splitRoutes);app.use('/notifications',notificationRoutes);app.use('/future',futureRoutes);
const server=http.createServer(app);export const io=new Server(server,{cors:{origin:'*'}});io.on('connection',s=>{s.on('join',uid=>s.join(uid));});
server.listen(process.env.PORT||4000,()=>console.log('PayFlow API running'));
