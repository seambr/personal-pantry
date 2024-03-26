"use client";
import NutritionTableEditWrapper from "@/components/NutritionTableEditWrapper";
import { FoodItemSQL } from "@/interfaces/FoodInterfaces";
import { createClient } from "@/utils/supabase/server";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ItemPage() {
  const path = usePathname();
  const id = path.split("/").slice(-1)[0];
  const [foodItem, setFoodItem] = useState<FoodItemSQL | null>(null);

  useEffect(() => {
    async function fetchItemFromDB() {
      const data = await axios.get("/api/protected/pantry/item", {
        params: { id: id },
      });

      setFoodItem(data.data[0]);
    }

    fetchItemFromDB();
  }, []);

  return (
    <main className="flex-grow flex items-center flex-col xl:justify-start mt-28 md:mt-0 overflow-y-scroll mb-40">
      <NutritionTableEditWrapper
        foodItem={foodItem}
        setFoodItem={setFoodItem}
      />
    </main>
  );
}

export default ItemPage;
