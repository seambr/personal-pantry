export interface SearchCriteria {
  query: string
  generalSearchInput: string
  pageNumber: number
  numberOfResultsPerPage: number
  pageSize: number
}
export interface Nutrient {
  [key: string]: any
  derivationCode: string
  derivationDescription: string
  derivationId: string
  foodNutrientId: string
  foodNutrientSourceCode: string
  foodNutrientSourceDescription: string
  foodNutrientSourceId: number
  indentLevel: number
  nutrientId: number
  nutrientName: string
  nutrientNumber: string
  rank: number
  unitName: string
  value: number
}

export interface FoodItem {
  [key: string]: any
  fdcId: number
  description: string
  dataType: string
  gtinUpc: string
  publishedData: string
  ingredients: string[]
  servingSize: number
  servingSizeUnit: string
  packageWeight: string
  foodNutrients: Nutrient[]
  brandName: string
  brandOwner: string
  dataSource: string
  marketCountry: string
  score: number
}

export interface SearchResponse {
  totalHits: number
  currentPage: number
  totalPages: number
  pageList: number[]
  foodSearchCriteria: SearchCriteria
  aggregations: any
  foods: FoodItem[]
}
