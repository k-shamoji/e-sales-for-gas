# ESM Client for GAS 

eセールスマネージャー Remix のREST API をGASから実行するためのライブラリ

[API仕様](https://www.softbrain.co.jp/ext_support/customer/assets/esales_res/html/restapi/reference.html)

## API対応状況

| メソッド | APIエンドポイント     | 対応状況 | 対応メソッド名           |
| -------- | --------------------- | -------- | ------------------------ |
| GET      | /entities/names       | 対応済   | ESMClient#getEntityNames |
| GET      | /entities/checkitems  | 対応済   | ESMClient#getCheckItems  |
| GET      | /entities/selectitems | 対応済   | ESMClient#getSelectItems |
| GET      | /entities/columns     | 対応済   | ESMClient#getColumns     |
| POST     | /entities/search      | 一部対応 | ESMClient#search         |
| GET      | /entity               | 対応済   | ESMClient#find           |
| POST     | /entity               | 対応済   | ESMClient#create         |
| PUT      | /entity               | 対応済   | ESMClient#update         |
| DELETE   | /entity               | 一部対応 | ESMClient#delete         |
| POST     | /entities             | 未対応   | なし                     |
| PUT      | /entities             | 未対応   | なし                     |
| DELETE   | /entities             | 未対応   | なし                     |

## 使い方

### 共通

```js
const BASE_URL = 'https://grove.softbrain.co.jp/xxxxxxxxx';
const API_TOKEN = 'b6d2a3a0-dummy-uuid-token-212facd4d6ca';
```
> [!CAUTION]
> 実際の実装においてはスクリプトプロパティを使うなどして、APIトークンを漏らさないようにしてください。

### ESMClient#getEntityNames

エンティティの一覧を取得します。

example:
```js
const client ESMClient.getESMClient(BASE_URL, API_TOKEN);
const entitiesName = client.getEntityNames();
```

### ESMClient#getCheckItems

チェックボックス型項目一覧取得

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
const checkItems = client.getCheckItems('business', '10904')
```

### ESMClient#getSelectItems

セレクト型項目一覧取得

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
const selectItems = client.getSelectItems('business', '10048')
```

### ESMClient#getColumns

項目一覧取得

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
const columns = client.getColumns('business')
```

### ESMClient#search

検索

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
const request = ESMClient.Util.getSearchRequestBuilder('business')
    .addSearchConditionItem({
      columnCode: 202,
      operator: 'partly',
      text: 'テスト',
    })
    .setTargetColumns([201, 202, 216])
    .build()
const result = client.search(request)
```

### ESMClient#find

一件取得

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
// エンティティ「案件」から案件コード「12312」のレコードを検索し、項目「案件コード」「案件名」を返却する
const result = client.find('business', '12312', [201,202])
```

### ESMClient#create

登録

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
const result = client.create({
	objectName: 'business',
	items: [
		// 案件名
		{
			column_code: 202,
			text: 'テスト案件名',
		},
		// 顧客コード
		{
			column_code: 216,
			num: 1234,
		}
	]
})
```

### ESMClient#update

更新

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
const result = client.update({
	objectName: 'business',
	items: [
		// 案件コード
		{
			column_code: 201,
			num: 1234,
		},
		// 案件名
		{
			column_code: 202,
			text: 'テスト案件名_update',
		},
	]
})
```

### ESMClient#delete

削除

example:
```js
const client = ESMClient.getESMClient(BASE_URL, API_TOKEN)
const result = client.delete({
	objectName: 'business',
	items: [
		// 案件コード
		{
			column_code: 201,
			num: 1234,
		},
	]
})
```