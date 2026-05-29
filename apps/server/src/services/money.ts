import { prisma } from '../config/prisma';
import { redis } from '../config/redis';

export async function topup(
  userId: string,
  amount: number
) {

  return prisma.$transaction(async (tx) => {

    const wallet = await tx.wallet.upsert({
      where: {
        userId
      },

      create: {
        userId,
        balance: amount
      },

      update: {
        balance: {
          increment: amount
        }
      }
    });

    await tx.transaction.create({
      data: {
        receiverId: userId,
        amount,
        status: 'completed',
        note: 'Wallet top up'
      }
    });

    await redis.del(`wallet:${userId}`);

    return wallet;
  });
}

export async function send(
  senderId: string,
  receiverPhone: string,
  amount: number,
  note?: string
) {

  return prisma.$transaction(async (tx) => {

    // Find sender
    const sender = await tx.user.findUnique({
      where: {
        id: senderId
      },

      include: {
        wallet: true
      }
    });

    if (!sender) {
      throw new Error('Sender not found');
    }

    // Frozen account check
    if (sender.frozen) {
      throw new Error('Account frozen');
    }

    // Wallet check
    if (!sender.wallet) {
      throw new Error('Wallet not found');
    }

    // Balance check
    if (sender.wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Find receiver
    const receiver = await tx.user.findUnique({
      where: {
        phone: receiverPhone
      },

      include: {
        wallet: true
      }
    });

    if (!receiver) {
      throw new Error('Receiver not found');
    }

    // Debit sender
    await tx.wallet.update({
      where: {
        userId: senderId
      },

      data: {
        balance: {
          decrement: amount
        }
      }
    });

    // Credit receiver
    await tx.wallet.upsert({
      where: {
        userId: receiver.id
      },

      create: {
        userId: receiver.id,
        balance: amount
      },

      update: {
        balance: {
          increment: amount
        }
      }
    });

    // Create transaction record
    const txn = await tx.transaction.create({
      data: {
        senderId,
        receiverId: receiver.id,
        amount,
        note,
        status: 'completed'
      }
    });

    // Clear Redis cache
    await redis.del(`wallet:${senderId}`);
    await redis.del(`wallet:${receiver.id}`);

    return txn;
  });
}