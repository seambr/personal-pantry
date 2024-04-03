"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FoodItemSQL } from "@/interfaces/FoodInterfaces";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";
import FoodTable from "./FoodTable";
import Link from "next/link";
function FridgeResults({ user }) {
  // TODO: GET FRIDGE RESULTS FROM SERVER PARENT
  const [results, setResults] = useState<FoodItemSQL[] | null>(null);

  useEffect(() => {
    async function getFridge() {
      const data = await axios.get("/api/protected/pantry");
      setResults(data?.data);
    }

    if (user) {
      getFridge();
    }
  }, []);

  return (
    <>
      <ScrollArea className="h-[calc(100vh-15em)] w-full p-4 gap-2">
        {results?.length ? (
          <div className="fridge-grid flex flex-col sm:grid sm:grid-cols-2 gap-1 gap-y-5 gap-x-5 lg:grid-cols-3">
            {results?.map((r: FoodItemSQL, idx) => (
              <FridgeCard key={idx} foodItem={r} />
            ))}
          </div>
        ) : (
          <span className="flex flex-grow-1 justify-center">
            Your fridge is empty.
          </span>
        )}
      </ScrollArea>
    </>
  );
}

function FridgeCard({ foodItem }: { foodItem: FoodItemSQL }) {
  const [open, setOpen] = useState(false);

  return (
    <Link href={`/fridge/item/${foodItem.id}`}>
      <div className="fridge-item hover:bg-secondary flex border-b border-secondary shadow-md  p-5 justify-between items-center h-28 sm:h-32">
        <div className="info-container">
          <h3 className="font-bold">
            {foodItem.brandName || foodItem.brandOwner || "N/A"}
          </h3>
          <p className="text-xs sm:text-sm">{foodItem.description}</p>
        </div>

        <div className="shorthand-nutrition text-right">
          <p>
            {foodItem.servingSize} {foodItem.servingSizeUnit}
          </p>
          <p>{foodItem.Calories} Calories</p>
          <p className="text-xs">{foodItem.id}</p>
        </div>
      </div>
    </Link>
  );
}

export default FridgeResults;
