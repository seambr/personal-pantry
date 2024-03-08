import React from "react"
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

function SearchCard({ foodItem }: { foodItem: FoodItem }) {
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
        <Button>Add To Fridge</Button>

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
