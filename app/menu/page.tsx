import MealCard from "@/components/MealCard";
import { createClient } from "@/utils/supabase/server";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import React from "react";

async function MenuPage() {
  const supabase = createClient();

  let { data: Meals, error } = await supabase.from("Meals").select("*");

  return (
    <main className="flex-grow flex justify-center items-center flex-col xl:justify-start">
      {Meals?.length ? (
        Meals?.map((meal, i) => {
          return <MealCard meal={meal} key={i}></MealCard>;
        })
      ) : (
        <span className="flex flex-grow-1 justify-center">
          Your menu is empty.
        </span>
      )}
    </main>
  );
}

export default MenuPage;
