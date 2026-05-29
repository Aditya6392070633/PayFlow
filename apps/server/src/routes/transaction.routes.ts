import express from 'express';
import { prisma } from '../config/prisma';

const router = express.Router();

router.get('/', async (req, res) => {

  try {

    const transactions = await prisma.transaction.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(transactions);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch transactions'
    });
  }
});

router.get('/:id', async (req, res) => {

  try {

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    return res.json(transaction);

  } catch (error) {

    return res.status(500).json({
      message: 'Failed to fetch transaction'
    });
  }
});

export default router;