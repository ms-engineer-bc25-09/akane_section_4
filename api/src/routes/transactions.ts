import { Router, Request, Response } from 'express';

const router = Router();

// メモリ上で取引データを保存（DBの代わり）
let transactions: {
  id: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  memo?: string;
}[] = [];

let nextId = 1;

// 🔹 入力チェック（バリデーション）
function validateTransaction(data: any): string | null {
  if (!['income', 'expense'].includes(data.type))
    return 'typeは "income" または "expense" が必要です';
  if (typeof data.amount !== 'number' || data.amount <= 0)
    return 'amountは正の数値が必要です';
  if (!data.category || typeof data.category !== 'string')
    return 'categoryは文字列が必要です';
  if (!data.date || typeof data.date !== 'string')
    return 'dateは文字列(YYYY-MM-DD)で指定してください';
  return null;
}

// 🟢 GET /transactions
router.get('/', (req: Request, res: Response) => {
  res.json(transactions);
});

// 🟣 POST /transactions
router.post('/', (req: Request, res: Response) => {
  const error = validateTransaction(req.body);
  if (error) return res.status(400).json({ error });

  const newTransaction = { id: nextId++, ...req.body };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

export default router;
