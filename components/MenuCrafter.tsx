"use client";
import { FoodItemSQL, MealIngredient } from "@/interfaces/FoodInterfaces";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UnitInput } from "./NutritionTableEditWrapper";
import { Button } from "./ui/button";
import axios from "axios";
import { useAlert } from "@/components/TopAlert";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";

function MenuCrafter({ foodItems }: { foodItems: FoodItemSQL[] }) {
  const { showAlert } = useAlert();
  const nameRef = useRef(null);
  const [ingredients, setIngredients] = useState<MealIngredient[]>([]);
  const [currentIngredientState, setCurrentIngredientState] =
    useState<MealIngredient>({
      amount: null,
      unit: "%",
      foodItem: null,
    });

  function resetIngredientState() {
    setIngredients([]);
    setCurrentIngredientState({
      amount: null,
      unit: "%",
      foodItem: null,
    });
  }
  function handleFoodItemChange(foodItemId: BigInt) {
    const matchingfoodItem = foodItems.filter(
      (_foodItem) => _foodItem.id === foodItemId
    )[0];

    setCurrentIngredientState((_old) => ({
      ..._old!,
      foodItem: matchingfoodItem,
    }));
  }
  function handleUnitChange(unit: string) {
    setCurrentIngredientState((_old) => ({ ..._old!, unit: unit }));
  }
  function handleAmountChange(e: React.FormEvent<HTMLInputElement>) {
    const amount: number = parseFloat(e.currentTarget.value);
    setCurrentIngredientState((_old) => ({
      ..._old!,
      amount: amount,
    }));
  }
  function handleAddItem() {
    // Check if all fields are filled
    const allValuesAreNonNull = Object.values(currentIngredientState).every(
      (value) => value !== null && value !== undefined && value !== ""
    );
    if (!allValuesAreNonNull || isNaN(currentIngredientState.amount!)) {
      // All Fields are not filled
      showAlert({
        show: true,
        message: "You must fill out all fields.",
        error: true,
      });
      return;
    }
    // Convert any units to percent of serving size
    const possibleIngredient = { ...currentIngredientState };
    if (
      possibleIngredient.unit !== "%" &&
      possibleIngredient.unit === possibleIngredient.foodItem!.servingSizeUnit
    ) {
      let percent =
        100 *
        (possibleIngredient.amount! / possibleIngredient.foodItem!.servingSize);

      percent = parseFloat(percent.toFixed(2));
      possibleIngredient.amount = percent;
      possibleIngredient.unit = "%";
    }

    setIngredients((_old) => [..._old, possibleIngredient]);
  }

  function saveMealToDatabase() {
    const flattened = {
      ingredient1_id: null,
      ingredient1_amount: null,
      ingredient2_id: null,
      ingredient2_amount: null,
      ingredient3_id: null,
      ingredient3_amount: null,
      ingredient4_id: null,
      ingredient4_amount: null,
      ingredient5_id: null,
      ingredient5_amount: null,
      ingredient6_id: null,
      ingredient6_amount: null,
      ingredient7_id: null,
      ingredient7_amount: null,
      ingredient8_id: null,
      ingredient8_amount: null,
      ingredient9_id: null,
      ingredient9_amount: null,
      ingredient10_id: null,
      ingredient10_amount: null,
      ingredient11_id: null,
      ingredient11_amount: null,
      ingredient12_id: null,
      ingredient12_amount: null,
      ingredient13_id: null,
      ingredient13_amount: null,
      ingredient14_id: null,
      ingredient14_amount: null,
      ingredient15_id: null,
      ingredient15_amount: null,
    };

    const name = nameRef.current!.value;

    let calories = 0; // g
    let total_fat = 0; // g
    let saturated_fat = 0; // g
    let trans_fat = 0; // g
    let cholesterol = 0; // mg
    let sodium = 0; // mg
    let total_carbohydrates = 0; // g
    let dietary_fiber = 0; // g
    let total_sugars = 0; // g
    let added_sugars = 0; // g
    let protein = 0; // g

    ingredients.forEach((ingredient, index) => {
      if (index < 15 && ingredient.foodItem) {
        console.log(ingredient.foodItem);
        flattened[`ingredient${index + 1}_id`] = ingredient.foodItem?.id;
        flattened[`ingredient${index + 1}_amount`] = ingredient.amount;

        // Increase meal macros proportionately
        calories +=
          (ingredient.foodItem?.Calories || 0) * (ingredient.amount! / 100);
        total_fat +=
          (ingredient.foodItem?.["Total Fat"] || 0) *
          (ingredient.amount! / 100);
        saturated_fat +=
          (ingredient.foodItem?.["Saturated Fat"] || 0) *
          (ingredient.amount! / 100);
        trans_fat +=
          (ingredient.foodItem?.["Trans Fat"] || 0) *
          (ingredient.amount! / 100);
        cholesterol +=
          (ingredient.foodItem?.Cholesterol || 0) * (ingredient.amount! / 100);
        sodium +=
          (ingredient.foodItem?.Sodium || 0) * (ingredient.amount! / 100);
        total_carbohydrates +=
          (ingredient.foodItem?.Carbohydrate || 0) * (ingredient.amount! / 100);
        dietary_fiber +=
          (ingredient.foodItem?.["Dietary Fiber"] || 0) *
          (ingredient.amount! / 100);
        total_sugars +=
          (ingredient.foodItem?.["Total Sugars"] || 0) *
          (ingredient.amount! / 100);
        added_sugars +=
          (ingredient.foodItem?.["Added Sugars"] || 0) *
          (ingredient.amount! / 100);
        protein +=
          (ingredient.foodItem?.Protein || 0) * (ingredient.amount! / 100);
      }
    });

    // TODO: Make sure all values are valid
    if (ingredients.length <= 0 || !name) {
      showAlert({
        show: true,
        message: "Meal not valid.",
        error: true,
      });
      return;
    }
    axios
      .post("/api/protected/menu/item", {
        data: {
          name: name,
          ...flattened,
          calories,
          total_fat,
          saturated_fat,
          trans_fat,
          cholesterol,
          sodium,
          total_carbohydrates,
          dietary_fiber,
          total_sugars,
          added_sugars,
          protein,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          resetIngredientState();
          showAlert({
            show: true,
            message: "Meal added.",
            error: false,
          });
        }
      })
      .catch((error) => {
        showAlert({
          show: true,
          message: "Failed to add meal.",
          error: true,
        });
      });
  }

  return (
    <div className="w-full flex flex-col items-center h-full">
      <div className="item-unit-selector flex items-center justify-center w-full gap-2 p-5">
        <Select onValueChange={handleFoodItemChange}>
          <SelectTrigger className="w-48 min-w-48 max-w-48 ">
            <SelectValue placeholder="Select food item to add." />
          </SelectTrigger>
          <SelectContent>
            {foodItems?.map((foodItem, idx) => (
              <SelectItem value={foodItem.id} key={idx}>
                {foodItem.brandName || foodItem.brandOwner}{" "}
                {foodItem.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <UnitInput
          unit={currentIngredientState?.foodItem?.servingSizeUnit || null}
          unitSelect
          onValueChange={handleUnitChange}
          onChange={handleAmountChange}
        />
      </div>
      <div className="buttons flex gap-2">
        <Button onClick={handleAddItem}>Add Ingredient</Button>
        <AlertDialog>
          <AlertDialogTrigger className="bg-green-500 rounded-md px-3 text-sm">
            Save
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Finishing Touches.</AlertDialogTitle>
              <AlertDialogDescription>
                Enter a name and serving for your meal.
                <Input
                  type="text"
                  placeholder="Enter name."
                  id="meal-name-input"
                  ref={nameRef}
                  className="w-full mt-2"
                />
                <Input
                  type="text"
                  placeholder="Enter serving."
                  id="meal-serving-input"
                  // ref={null}
                  className="w-full mt-2"
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={saveMealToDatabase}>
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <ScrollArea className="added-items text-xs mt-5 h-[450px] p-2">
        {ingredients.map((_ingredient, idx) => (
          <IngredientItem ingredient={_ingredient} key={idx}></IngredientItem>
        ))}
        <div className="fill mb-20 w-full text-center mt-5">
          Add more items above.
        </div>
      </ScrollArea>
    </div>
  );
}

function IngredientItem({ ingredient }: { ingredient: MealIngredient }) {
  let percent = ingredient.foodItem?.servingSize * (ingredient.amount / 100);
  percent = parseFloat(percent.toFixed(2));
  return (
    <div className="flex gap-2 border-b border-secondary p-2 shadow-sm w-full items-center ">
      <span className="flex flex-wrap">
        {ingredient.foodItem?.brandName || ingredient.foodItem?.brandOwner}{" "}
        {ingredient.foodItem?.description}
      </span>
      <span className="bg-secondary rounded-full py-1 px-2 ml-auto flex flex-shrink-0">
        {percent} {ingredient.foodItem?.servingSizeUnit}
      </span>
    </div>
  );
}

export default MenuCrafter;
