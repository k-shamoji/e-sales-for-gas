/**
 * セレクト型項目の選択肢
 */
export type SelectItem = {
  /** 選択肢の一意識別子です。同一セレクト型項目内で一意になります。 */
  selectItemCode: number,
  /** 選択肢名です。 */
  selectItemName: string,
  /** 選択肢番号です。 */
  selectItemNumber: '',
}

/**
 * セレクト型項目の選択肢の一覧
 */
export type SelectItems = {
  selectItems: SelectItem[]
}