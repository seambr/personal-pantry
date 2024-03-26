import { createClient } from "@/utils/supabase/server";

import React, { useEffect, useState } from "react";

import MenuCrafter from "@/components/MenuCrafter";
import { AlertProvider, TopAlert } from "@/components/TopAlert";

async function CookPage() {
  const supabase = createClient();
  let { data: foodItems, error } = await supabase
    .from("FoodItems")
    .select(
      `id,edited,description,ingredients,createdAt,brandOwner,brandName,foodCategory,servingSize,servingSizeUnit,householdServingFullText,Calories,"Total Fat","Saturated Fat","Trans Fat",Cholesterol,Sodium,Carbohydrate,"Dietary Fiber","Total Sugars","Added Sugars",Protein`
    );

  return (
    <main className="flex-grow flex justify-center items-center flex-col xl:justify-start  pt-24 md:pt-0">
      <h2 className="text-xl border-b p-2 w-44 text-center">Cook</h2>
      <AlertProvider>
        <MenuCrafter foodItems={foodItems}></MenuCrafter>
        <TopAlert />
      </AlertProvider>
    </main>
  );
}

export default CookPage;
