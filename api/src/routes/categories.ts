import { Router, Request, Response } from 'express';

const router = Router();

// メモリ上のカテゴリデータ
let categories: { id: number; name: string; type: 'income' | 'expense' }[] = [];
let nextId = 1;

// バリデーション関数
function validateCategory(data: any): string | null {
  if (!data.name || typeof data.name !== 'string') return 'nameが必要です';
  if (!['income', 'expense'].includes(data.type))
    return 'typeは "income" または "expense" が必要です';
  return null;
}

// GET /categories
router.get('/', (req: Request, res: Response) => {
  res.json(categories);
});

// POST /categories
router.post('/', (req: Request, res: Response) => {
  const error = validateCategory(req.body);
  if (error) return res.status(400).json({ error });

  const newCategory = { id: nextId++, ...req.body };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

export default router;
