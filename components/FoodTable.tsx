import React from "react"
import { Table, TableBody, TableCaption, TableCell, TableRow } from "./ui/table"
import { FoodItem, FoodItemSQL } from "@/interfaces/FoodInterfaces"
import { cn } from "@/lib/utils"

function FoodTable({
  foodItem,
  isSQL = false,
}: {
  foodItem: FoodItemSQL
  isSQL: boolean
}) {
  return !isSQL ? (
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
  ) : (
    <div className="table-wrapper mt-24 md:mt-0 w-10/12 flex justify-center m-auto flex-col text-slate-200">
      <h3 className="font-bold text-2xl text-primary mb-2">
        Nutrition Information
      </h3>
      <MainTag
        name="Calories"
        value={foodItem.Calories}
        unit=""
        first
      ></MainTag>
      <MainTag name="Total Fat" value={foodItem["Total Fat"]} unit="g">
        <SubTag
          name="Saturated Fat"
          value={foodItem["Saturated Fat"]}
          unit="g"
        />
        <SubTag name="Trans Fat" value={foodItem["Trans Fat"]} unit="g" />
      </MainTag>
      <MainTag
        name="Cholesterol"
        value={foodItem.Cholesterol}
        unit="g"
      ></MainTag>
      <MainTag name="Sodium" value={foodItem.Sodium} unit="mg"></MainTag>
      <MainTag name="Total Carbohydrate" value={foodItem.Carbohydrate} unit="g">
        <SubTag
          name="Dietary Fiber"
          value={foodItem["Dietary Fiber"]}
          unit="g"
        />
        <SubTag name="Sugars" value={foodItem["Total Sugars"]} unit="g" />
        <SubTag
          name="Added Sugars"
          value={foodItem["Added Sugars"]}
          unit="g"
          depth={2}
        />
      </MainTag>
      <MainTag name="Protein" value={foodItem.Protein} unit="g"></MainTag>
      <MainTag
        name="Serving Size"
        value={foodItem.servingSize}
        unit={foodItem.servingSizeUnit}
        right
      ></MainTag>
      <p className="text-xs mt-2 opacity-50">
        Disclaimer: Items retrieved via the FDC API search may contain
        incomplete, or sometimes incorrect, data. If something looks off it may
        be, be sure to double check and make any corrections.
      </p>
    </div>
  )
}

function MainTag({
  first = false,
  children,
  name,
  value,
  unit,
  right = false,
  className = "",
}: {
  first: boolean
  last: boolean
  children: any
  name: string
  value: number
  unit: string
  right: bool
  className: string
}) {
  return (
    <div
      className={cn(
        `border-b-2 border-primary ${first && "border-t-2"} w-full py-2`,
        className
      )}
    >
      <p className={`font-bold ${right && "text-right"}`}>
        {name}{" "}
        <span className="font-normal">
          {value} {unit}
        </span>
      </p>
      {children}
    </div>
  )
}

function SubTag({
  name,
  value,
  unit,
  depth = 1,
}: {
  name: string
  value: number
  unit: string
  depth: number
}) {
  return (
    <p className={`${depth === 1 ? "ml-8" : "ml-16"}`}>
      {name}{" "}
      <span className="font-normal">
        {value} {unit}
      </span>
    </p>
  )
}

export default FoodTable
