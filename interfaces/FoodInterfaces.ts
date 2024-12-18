export interface SearchCriteria {
  query: string
  pageNumber: number
  pageSize: number
  dataType: string[]
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

export interface FoodItemSQL {
  id: bigint
  createdAt: Date // timestamp with time zone usually mapped to Date in TypeScript
  edited: boolean
  description: string // 'text' type in PostgreSQL is mapped to 'string' in TypeScript
  dataType: string
  brandOwner: string
  brandName: string
  ingredients: string
  foodCategory: string
  packageWeight: string
  servingSizeUnit: string
  servingSize: number // 'real' type in PostgreSQL is mapped to 'number' in TypeScript
  householdServingFullText: string
  user_id: string // 'uuid' type in PostgreSQL is commonly mapped to 'string' in TypeScript
  Calories: number // 'numeric' type in PostgreSQL is mapped to 'number' in TypeScript
  Energy: number
  "Total Fat": number
  "Saturated Fat": number
  "Trans Fat": number
  Cholesterol: number
  Sodium: number
  Carbohydrate: number
  "Dietary Fiber": number
  "Total Sugars": number
  "Added Sugars": number
  Protein: number
  "Monounsaturated Fatty Acids": number
  "Polyunsaturated Fatty Acids": number
  "Total sugar alcohols": number
  "Vitamin D (D2 + D3), International Units": number
  "Vitamin D (D2 + D3)": number
  "Vitamin A, IU": number
  "Vitamin A": number
  Thiamin: number
  Riboflavin: number
  Niacin: number
  "Vitamin B-6": number
  "Vitamin B-12": number
  Biotin: number
  "Vitamin C": number
  "Vitamin E": number
  "Vitamin K (Menaquinone-4)": number
  "Vitamin K (Dihydrophylloquinone)": number
  "Vitamin K (phylloquinone)": number
  "Calcium, Ca": number
  "Iron, Fe": number
  "Potassium, K": number
  "Folate, total": number
  "Pantothenic acid": number
  "Magnesium, Mg": number
  "Phosphorus, P": number
  "Iodine, I": number
  "Zinc, Zn": number
  "Copper, Cu": number
  "Manganese, Mn": number
  "Chromium, Cr": number
  "Molybdenum, Mo": number
  Carotene: number
}

export interface MealIngredient {
  // meal_id
  amount: number | null
  unit: string | null
  foodItem: FoodItemSQL | null
}

export interface Meal {
  id: number
  name: string
  unit: string | null
  foodItem: FoodItemSQL | null
  ingredient1_id: number | null
  ingredient1_amount: number | null
  ingredient2_id: number | null
  ingredient2_amount: number | null
  ingredient3_id: number | null
  ingredient3_amount: number | null
  ingredient4_id: number | null
  ingredient4_amount: number | null
  ingredient5_id: number | null
  ingredient5_amount: number | null
  ingredient6_id: number | null
  ingredient6_amount: number | null
  ingredient7_id: number | null
  ingredient7_amount: number | null
  ingredient8_id: number | null
  ingredient8_amount: number | null
  ingredient9_id: number | null
  ingredient9_amount: number | null
  ingredient10_id: number | null
  ingredient10_amount: number | null
  ingredient11_id: number | null
  ingredient11_amount: number | null
  ingredient12_id: number | null
  ingredient12_amount: number | null
  ingredient13_id: number | null
  ingredient13_amount: number | null
  ingredient14_id: number | null
  ingredient14_amount: number | null
  ingredient15_id: number | null
  ingredient15_amount: number | null
  calories: number
  total_fat: number
  saturated_fat: number
  trans_fat: number
  cholesterol: number
  sodium: number
  total_carbohydrates: number
  dietary_fiber: number
  total_sugars: number
  added_sugars: number
  protein: number
}
