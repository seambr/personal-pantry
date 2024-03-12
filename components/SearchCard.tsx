import React from "react"
import axios, { isCancel, AxiosError } from "axios"
import { FoodItem } from "@/interfaces/FoodInterfaces"
import { Button } from "./ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAlert } from "@/components/TopAlert"
import FoodTable from "./FoodTable"
function SearchCard({ foodItem }: { foodItem: FoodItem }) {
  const { showAlert } = useAlert()
  async function addToFridge(item: FoodItem) {
    const nutrientMap = {
      208.0: ["Calories", "KCAL"],
      268.0: ["Energy", "kJ"],
      204.0: ["Total Fat", "G"],
      606.0: ["Saturated Fat", "G"],
      605.0: ["Trans Fat", "G"],
      601.0: ["Cholesterol", "MG"],
      307.0: ["Sodium", "MG"],
      205.0: ["Carbohydrate", "G"],
      291.0: ["Dietary Fiber", "G"],
      269.3: ["Total Sugars", "G"],
      539.0: ["Added Sugars", "G"],
      203.0: ["Protein", "G"],
      645.0: ["Monounsaturated Fatty Acids", "G"],
      646.0: ["Polyunsaturated Fatty Acids", "G"],
      299.0: ["Total sugar alcohols", "G"],
      324.0: ["Vitamin D (D2 + D3), International Units", "IU"],
      328.0: ["Vitamin D (D2 + D3)", "UG"],
      318.0: ["Vitamin A, IU", "IU"],
      960.0: ["Vitamin A", "UG"],
      404.0: ["Thiamin", "MG"],
      405.0: ["Riboflavin", "MG"],
      406.0: ["Niacin", "MG"],
      415.0: ["Vitamin B-6", "MG"],
      418.0: ["Vitamin B-12", "UG"],
      416.0: ["Biotin", "UG"],
      401.0: ["Vitamin C", "MG"],
      959.0: ["Vitamin E", "MG"],
      428.0: ["Vitamin K (Menaquinone-4)", "UG"],
      429.0: ["Vitamin K (Dihydrophylloquinone)", "UG"],
      430.0: ["Vitamin K (phylloquinone)", "UG"],
      301.0: ["Calcium, Ca", "MG"],
      303.0: ["Iron, Fe", "MG"],
      306.0: ["Potassium, K", "MG"],
      417.0: ["Folate, total", "UG"],
      410.0: ["Pantothenic acid", "MG"],
      304.0: ["Magnesium, Mg", "MG"],
      305.0: ["Phosphorus, P", "MG"],
      314.0: ["Iodine, I", "UG"],
      309.0: ["Zinc, Zn", "MG"],
      312.0: ["Copper, Cu", "MG"],
      315.0: ["Manganese, Mn", "MG"],
      310.0: ["Chromium, Cr", "UG"],
      316.0: ["Molybdenum, Mo", "UG"],
      393.0: ["Carotene", "MCG_RE"],
    }

    function buildNutrientSkeleton(nutrientMap) {
      const nutrients = {}
      Object.keys(nutrientMap).forEach((key) => {
        const nutrientName = nutrientMap[key][0]
        nutrients[nutrientName] = null
      })

      return nutrients
    }

    const nutrients = buildNutrientSkeleton(nutrientMap)

    foodItem?.foodNutrients?.forEach((_n) => {
      const nutrientTuple = nutrientMap[_n.nutrientNumber]

      if (nutrientTuple !== undefined) {
        const nutrientName = nutrientTuple[0]
        console.log(nutrientName)
        if (Object.hasOwn(nutrients, nutrientName)) {
          nutrients[nutrientName] = _n.value
        }
      }
    })

    // FIXME: Not complete
    const body = {
      data: {
        edited: false,
        // fdcId: item.fdcId,
        description: item.description,
        dataType: item.dataType,
        // gtinUpc: item.gtinUpc,
        brandOwner: item.brandOwner,
        brandName: item.brandName,
        ingredients: item.ingredients,
        // marketCountry: item.marketCountry,
        foodCategory: item.foodCategory,
        packageWeight: item.packageWeight,
        servingSizeUnit: item.servingSizeUnit,
        servingSize: item.servingSize,
        householdServingFullText: item.householdServingFullText,
        ...nutrients,
      },
    }

    console.log(body.data)
    try {
      const res = await axios.post(
        "http://localhost:3000/api/protected/pantry/item",
        body
      )

      if (res.status === 200) {
        showAlert({ show: true, message: "Added item to fridge." })
      }
    } catch {
      // TODO: Make this an alert of some kind
      showAlert({ show: true, message: "Failed to add item to fridge." })
    }
  }

  return (
    <div className="flex w-full border border-secondary shadow-md rounded-md  mt-5 mb-5 p-5 justify-between sm:items-center flex-col sm:flex-row">
      <div className="food-info text-left mb-5 sm:mb-0">
        <h3 className="text-xl text-primary font-bold sm:text-2xl">
          {foodItem.brandName ? foodItem.brandName : foodItem.brandOwner}
        </h3>
        <p className="text-sm">{foodItem.description}</p>
        <p className="text-xs text-primary">{foodItem.foodCategory}</p>
        <p className="hidden text-xs text-primary sm:block">
          ID : {foodItem.fdcId}
        </p>
      </div>
      <div className="buttons flex gap-2 justify-center items-center">
        <Button onClick={() => addToFridge(foodItem)}>Add To Fridge</Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Edit</Button>
          </PopoverTrigger>
          <PopoverContent>
            <FoodTable foodItem={foodItem} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default SearchCard
