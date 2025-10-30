# 家計簿アプリのAPI 設計書

## 1.エンドポイント一覧

| リソース         | メソッド   | パス                       | 概要        |
| ------------ | ------ | ------------------------ | --------- |
| Transactions | GET    | `/transactions`          | 入出金の一覧を取得 |
| Transactions | POST   | `/transactions`          | 入出金を登録    |
| Transactions | DELETE | `/transactions/{id}`     | 入出金を削除    |
| Categories   | GET    | `/categories`            | カテゴリ一覧を取得 |
| Categories   | POST   | `/categories`            | カテゴリを登録   |
| Summary      | GET    | `/summary?month=YYYY-MM` | 月別集計を取得   |


## Transactions API（入出金）

```yaml
paths:
  /transactions:
    get:
      summary: すべての入出金履歴を取得
      responses:
        '200':  # 成功したら↓
          description: 入出金のリストを返す
          content:
            application/json:
              schema:
                type: array  # リスト形式って意味
                　items:
                  　type: object

    post:
      summary: 新しい入出金を登録
      requestBody:
        content:
          application/json:
            schema:
              type: object
      responses:
        '201':
          description: 登録済みの入出金を返す

    delete:
      summary: 入出金を削除
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: 削除成功メッセージ
          content:
            application/json:
              schema:
                type: object
```

## Categories API（入出金）

```yaml
paths:
  /categories:
    get:
      summary: カテゴリ一覧を取得
      responses:
        '200':
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object

    post:
      summary: カテゴリを追加
      requestBody:
        content:
          application/json:
            schema:
              type: object
```

## Summary API (月別集計)

```yaml
paths:
  /summary:
    get:
      summary: 指定月の収支を集計
      parameters:
        - name: month
          in: query
          schema: { type: string, example: 2025-10 }
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
```


                  