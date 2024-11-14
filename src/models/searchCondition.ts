enum Operator {
  /**
   * 「等しい」を表す符号です。
   * テキスト型／テキストエリア型では、指定した検索条件値に完全に合致するエンティティのみを抽出します。
   * 
   * チェックボックス型では、「true」を指定した選択肢のうち、1つ以上の選択肢にチェックが入れられているエンティティのみを抽出します。
   * 
   * セレクト型／日付型／整数型では、指定した検索条件値に合致するエンティティのみを抽出します。
   * ※日付型の最小単位は「秒」です。タイムゾーンの違いは考慮しません 
   */
  Equals = '=',
  /**
   * 「より小さい」を表す符号です。
   * 日付型では、指定した条件値よりも過去の値を持つエンティティのみを抽出します。
   */
  LessThan = '<',
  /**
   * 「以下」を表す符号です。
   * 整数型では、指定した条件値よりも小さいまたは同一の値を持つエンティティのみを抽出します。
   */
  LessThanEqual = '<=',
  /**
   * 「以上」を表す符号です。
   * 日付型では、指定した条件値よりも未来または同一の値を持つエンティティのみを抽出します。
   * 
   * 整数型では、指定した条件値よりも大きいまたは同一の値を持つエンティティのみを抽出します。
   */
  GreaterThanEqual = '>=',
  /**
   * 「前方一致」を表す符号です。
   * テキスト型／テキストエリア型では、指定した検索条件値に文字列の先頭が合致するエンティティのみを抽出します。
   */
  Forward = 'forward',
  /**
   * 「後方一致」を表す符号です。
   * テキスト型／テキストエリア型では、指定した検索条件値に文字列の末尾が合致するエンティティのみを抽出します。
   */
  Backward = 'backward',
  /**
   * 「部分一致」を表す符号です。
   * テキスト型／テキストエリア型では、指定した検索条件値を含むエンティティのみを抽出します。
   */
  Partly = 'partly',
}


/**
 * テキスト型／テキストエリア型項目用条件式
 */
type TextSearchConditionItem = {
  columnCode: number,
  operator: Operator.Equals | Operator.Forward | Operator.Backward | Operator.Partly,
  text: string,
}

/**
 * 日付／日時型項目用条件式
 */
type DateSearchConditionItem = {
  columnCode: number,
  operator: Operator.Equals | Operator.LessThan | Operator.GreaterThanEqual,
  date: string,
}

/**
 * 整数型／セレクト型項目用条件式
 */
type NumberSearchConditionItem = {
  columnCode: number,
  operator: Operator.Equals | Operator.LessThanEqual | Operator.GreaterThanEqual,
  num: number,
}

/**
 * チェックボックス型項目用条件式
 */
type CheckBoxSearchConditionItem = {
  columnCode: number,
  operator: Operator.Equals,
  checkBox: boolean[],
}

/**
 * 小数型項目用条件式
 */
type DecimalSearchConditionItem = {
  columnCode: number,
  operator: Operator.Equals | Operator.LessThanEqual | Operator.GreaterThanEqual,
  decimal: number,
}

/**
 * NULL検索用条件式
 */
type IsNullSearchConditionItem = {
  columnCode: number,
  operator: Operator.Equals,
  null: true,
}

/**
 * NOT NULL検索用条件式
 */
type IsNotNullSearchConditionItem = {
  columnCode: number,
  operator: Operator.Equals,
  notNull: true,
}

/**
 * 検索条件式
 */
export type SearchConditionItem =
  TextSearchConditionItem |
  DateSearchConditionItem |
  NumberSearchConditionItem |
  CheckBoxSearchConditionItem |
  DecimalSearchConditionItem |
  IsNullSearchConditionItem |
  IsNotNullSearchConditionItem

export type SearchCondition = {
  targetObjectName: string,
  items: SearchConditionItem[],
  notExists?: boolean,
  relatedObjectConditions?: SearchCondition[],
}
