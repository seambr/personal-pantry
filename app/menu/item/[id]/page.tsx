"use client";
import NutritionTableEditWrapper from "@/components/NutritionTableEditWrapper";
import { FoodItemSQL } from "@/interfaces/FoodInterfaces";
import { createClient } from "@/utils/supabase/server";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MealTable from "@/components/MealTable";

function ItemPage() {
  const path = usePathname();
  const id = path.split("/").slice(-1)[0];
  const [meal, setMeal] = useState();

  useEffect(() => {
    async function fetchItemFromDB() {
      const data = await axios.get("/api/protected/menu/item", {
        params: { id: id },
      });

      setMeal(data.data[0]);
    }

    fetchItemFromDB();
  }, []);

  return (
    <main className="flex-grow flex items-center flex-col xl:justify-start mt-28 md:mt-0 overflow-y-scroll mb-40">
      {meal && <MealTable mealItem={meal} />}
    </main>
  );
}

export default ItemPage;
