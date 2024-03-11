import React from "react"
import { Table, TableBody, TableCaption, TableCell, TableRow } from "./ui/table"
import { FoodItem } from "@/interfaces/FoodInterfaces"

function FoodTable({ foodItem }: { foodItem: FoodItem }) {
  return (
    <Table>
      <TableCaption>
        Per Serving of {foodItem.servingSize} {foodItem.servingSizeUnit}
      </TableCaption>
      <TableBody>
        {foodItem.foodNutrients.map((e, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{e.nutrientName}</TableCell>
            <TableCell className="w-20 text-right">
              {e.value} {e.unitName}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default FoodTable
