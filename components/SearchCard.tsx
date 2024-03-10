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

function SearchCard({
  foodItem,
  showAlert,
}: {
  foodItem: FoodItem
  showAlert: any
}) {
  async function addToFridge(item: FoodItem) {
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
        foodNutrients: item.foodNutrients.map((nutrient) => ({
          nutrientId: nutrient.nutrientId || "N/A",
          nutrientName: nutrient.nutrientName || "N/A",
          unitName: nutrient.unitName || "N/A",
          nutrientNumber: nutrient.nutrientNumber || "N/A",
          foodNutrientId: nutrient.foodNutrientId || "N/A",
          indentLevel: nutrient.indentLevel || "N/A",
        })),
      },
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/protected/pantry/item",
        body
      )
      if (res.status === 200) {
        showAlert({ show: true, message: "Added item to fridge." })
      } else {
        showAlert({ show: true, message: "Failed to add item to fridge." })
      }
    } catch {
      // TODO: Make this an alert of some kind
      console.log("Failed to add")
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
            <Table>
              <TableCaption>
                Per Serving of {foodItem.servingSize} {foodItem.servingSizeUnit}
              </TableCaption>
              <TableBody>
                {foodItem.foodNutrients.map((e, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {e.nutrientName}
                    </TableCell>
                    <TableCell className="w-20 text-right">
                      {e.value} {e.unitName}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default SearchCard
