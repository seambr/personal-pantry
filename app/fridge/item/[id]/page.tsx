"use client";
import NutritionTableEditWrapper from "@/components/NutritionTableEditWrapper";
import { FoodItemSQL } from "@/interfaces/FoodInterfaces";
import { createClient } from "@/utils/supabase/server";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

function ItemPage() {
  const path = usePathname();
  const id = path.split("/").slice(-1)[0];
  const [foodItem, setFoodItem] = useState<FoodItemSQL | null>(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchItemFromDB() {
      const data = await axios.get("/api/protected/pantry/item", {
        params: { id: id },
      });

      setFoodItem(data.data[0]);
    }

    fetchItemFromDB();
  }, []);

  async function deleteItem() {
    try {
      const response = await axios.delete(
        "/api/protected/pantry/item",
        {
          params: {
            id: id,  // Pass the item ID as a query parameter
          }
        }
      );



      console.log("Success:", response.data);

      if (response.status == 200) {
        router.push("/fridge"); // Redirect to /fridge
      }
    } catch (error: any) {
      console.error("Error deleting item:", error.response?.data || error.message);
      throw error; // Rethrow the error if you want to handle it elsewhere
    }
  }



  return (
    <main className="flex-grow flex items-center flex-col xl:justify-start mt-28 md:mt-0 overflow-y-scroll mb-40">
      <NutritionTableEditWrapper
        foodItem={foodItem}
        setFoodItem={setFoodItem}
      />
      <Button variant={"destructive"} className="mt-5" onClick={deleteItem}>Delete</Button>
    </main>
  );
}

export default ItemPage;
