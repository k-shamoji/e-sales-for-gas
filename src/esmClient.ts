import { CheckItems } from "./models/checkItem"
import { Columns } from "./models/column"
import { Items } from "./models/item"
import { SearchCondition } from "./models/searchCondition"
import { SelectItems } from "./models/selectItem"

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

type EntitiesNames = {
  names: string[]
}

export type SearchRequest = {
  searchCondition: SearchCondition
  columnCodes: number[],
  sortKeys?: any,
  fromIndex?: number,
}

type SearchResult = {
  hits: number,
  values: []
}

type CreateRequest = {
  objectName: string,
  items: Items,
}

type UpdateRequest = {
  objectName: string,
  items: Items,
}

type DeleteRequest = {
  objectName: string,
  items: Items,
  bulkRelate?: boolean,
}


class ESMClient {
  constructor(
    private readonly baseUrl: string,
    private readonly apiToken: string) {
  }

  /**
   * eセールスマネージャーRemix REST APIがサポートしているエンティティ名の一覧を取得します。
   * @returns {EntitiesNames} エンティティ名の一覧
   */
  getEntityNames(): EntitiesNames {
    return this.exec_('get', `${this.baseUrl}/rest/v1/entities/names`)
  }

  /**
   * 指定したチェックボックス型項目の選択肢一覧を取得します。
   * 
   * @param {string} objectName - エンティティ名
   * @param {string} columnCode - チェックボックス型項目の項目コード
   * @returns {CheckItems}
   */
  getCheckItems(objectName: string, columnCode: string): CheckItems {
    return this.exec_('get', `${this.baseUrl}/rest/v1/entities/checkitems?obj_name=${objectName}&column_code=${columnCode}`)
  }

  /**
   * 指定したセレクト型項目の選択肢一覧を取得します。
   * 
   * @param {string} objectName - エンティティ名
   * @param {string} columnCode - セレクト型項目の項目コード
   * @returns {SelectItem}
   */
  getSelectItems(objectName: string, columnCode: string): SelectItems {
    return this.exec_('get', `${this.baseUrl}/rest/v1/entities/selectitems?obj_name=${objectName}&column_code=${columnCode}`)
  }

  /**
   * エンティティの種類を指定し、項目一覧を取得します。
   * 
   * @param {string} objectName - エンティティ名
   * @returns {Columns }
   */
  getColumns(objectName: string): Columns {
    return this.exec_('get', `${this.baseUrl}/rest/v1/entities/columns?obj_name=${objectName}`)
  }

  /**
   * eセールスマネージャーRemixに登録済みのエンティティを検索し、単一のエンティティを取得します。
   */
  find(obj: string, id: string, columncodes: number[]): SearchResult {
    return this.exec_('get', `${this.baseUrl}/rest/v1/entity?obj=${obj}&id=${id}&columncodes=${columncodes.join(',')}`)
  }

  /**
   * eセールスマネージャーRemixに登録済みのエンティティのレコードを検索します。
   * 複数のレコードを取得可能です。
   */
  search(request: SearchRequest): SearchResult {
    return this.exec_('post', `${this.baseUrl}/rest/v1/entities/search`, request)
  }

  /**
   * eセールスマネージャーRemixに単一のエンティティを登録します。
   */
  create(request: CreateRequest) {
    return this.exec_('post', `${this.baseUrl}/rest/v1/entity`, request)
  }

  /**
   * eセールスマネージャーRemixに登録済みの単一のエンティティを更新します。
   */
  update(request: UpdateRequest) {
    return this.exec_('put', `${this.baseUrl}/rest/v1/entity`, request)
  }

  /**
   * eセールスマネージャーRemixに登録済みの単一のエンティティを削除します。
   * 
   * @link
   */
  delete(request: DeleteRequest) {
    return this.exec_('delete', `${this.baseUrl}/rest/v1/entity`, request)
  }

  exec_(method: HttpMethod, url: string, request?: any) {
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-API-Token": this.apiToken
      },
      payload: request ? JSON.stringify(request) : '',
      muteHttpExceptions: true,
    };
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  }
}

/**
 * eセールスマネージャーRemix用APIクライアントを作成します。
 * @param {string} baseUrl - APIのベースURL
 * @param {string} apiToken - 認証用APIトークン
 * @returns {ESMClient} APIクライアントのインスタンス
 */
export function getESMClient(baseUrl: string, apiToken: string): ESMClient {
  return new ESMClient(baseUrl, apiToken)
}