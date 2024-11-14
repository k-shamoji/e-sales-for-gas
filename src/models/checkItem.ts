/**
 * チェックボックス型項目の選択肢
 */
export type CheckItem = {
  /** 選択肢の一意識別子です。同一チェックボックス型項目内で一意になります。 */
  checkItemCode: number,
  /** 選択肢名です。 */
  checkItemName: string,
}

/**
 * チェックボックス型項目の選択肢の一覧
 */
export type CheckItems = {
  checkItems: CheckItem[],
}
