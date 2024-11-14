import { SearchRequest } from "./esmClient"
import { SearchConditionItem } from "./models/searchCondition"

export namespace Util {

  class SearchRequestBuilder {
    searchRequest: SearchRequest
    constructor(targetObjectName: string) {
      this.searchRequest = {
        searchCondition: {
          targetObjectName: targetObjectName,
          items: [],
        },
        columnCodes: [],
      }
    }

    addSearchConditionItem(searchConditionItem: SearchConditionItem) {
      this.searchRequest.searchCondition.items.push(searchConditionItem)
      return this
    }
    
    setTargetColumns(columns: number[]) {
      this.searchRequest.columnCodes = columns;
      return this
    }

    build(): SearchRequest {
      return this.searchRequest
    }
  }

  export function getSearchRequestBuilder(targetObjectName: string): SearchRequestBuilder {
    return new SearchRequestBuilder(targetObjectName)
  }
}