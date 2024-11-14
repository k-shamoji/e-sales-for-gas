/**
 * 項目のデータ型
 */
export enum ColumnType {
  /** テキスト型項目 */
  TEXT = 0,
  /** セレクト型項目 */
  SELECT = 1,
  /** 日付型項目 */
  DATE = 2,
  /** 整数型項目 */
  INT = 3,
  /** テキストエリア型項目 */
  TEXTAREA = 4,
  /** 小数型項目 */
  DOUBLE = 5,
  /** チェックボックス型項目 */
  CHECK_BOX = 6,
  /** 日時型項目 */
  DATETIME = 11,
}

/**
 * 項目
 */
export type Column = {
  /** 項目に割り当てられた一意識別子です。同一エンティティ内で一意になります。 */
  code: number,
  /** 項目名です。 */
  name: string,
  /** 項目のデータ型を表すコード値です。 */
  type: ColumnType
}

/**
 * 項目の一覧
 */
export type Columns = {
  columns: Column[]
}
