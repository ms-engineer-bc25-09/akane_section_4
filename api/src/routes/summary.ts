import { Router, Request, Response } from 'express';

const router = Router();

let transactions: {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
}[] = [];

router.get('/', (req: Request, res: Response) => {
  const month = req.query.month as string;
  if (!month) return res.status(400).json({ error: 'month パラメータが必要です' });

  const filtered = transactions.filter(t => t.date.startsWith(month));
  const totalIncome = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  res.json({
    month,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  });
});

export default router;
