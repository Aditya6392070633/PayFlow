import express from 'express';
import { prisma } from '../config/prisma';

const router = express.Router();

router.get('/analytics', async (req, res) => {

  try {

    const transactions = await prisma.transaction.findMany();

    const totalSent = transactions
      .filter((t: any) => t.senderId)
      .reduce((a: number, b: any) => a + b.amount, 0);

    const totalReceived = transactions
      .filter((t: any) => t.receiverId)
      .reduce((a: number, b: any) => a + b.amount, 0);

    return res.json({
      totalTransactions: transactions.length,
      totalSent,
      totalReceived
    });

  } catch (error) {

    return res.status(500).json({
      message: 'Analytics fetch failed'
    });
  }
});

export default router;