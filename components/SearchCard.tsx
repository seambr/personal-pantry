import React from "react"
import { FoodItem } from "@/interfaces/FoodInterfaces"

function SearchCard({ foodItem }: { foodItem: FoodItem }) {
  return (
    <div className="flex w-full border shadow-md rounded-md  mt-5 mb-5 p-2">
      <div>
        <h3 className="text-2xl text-slate-900 font-bold ">
          {foodItem?.brandName}
        </h3>
        <p>{foodItem.description}</p>
        <p>ID : {foodItem.fdcId}</p>
      </div>
    </div>
  )
}

export default SearchCard
