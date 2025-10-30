import express from 'express';
import transactionsRouter from './routes/transactions';
import categoriesRouter from './routes/categories';
import summaryRouter from './routes/summary';

const app = express();
const port = 4000; // Next.js とは別ポートでOK

// JSONを扱うための設定
app.use(express.json());

// ルーターを紐づけ
app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/summary', summaryRouter);

// 動作確認用ルート
app.get('/', (req, res) => {
  res.send('Kakeibo API running!');
});

// サーバー起動
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
