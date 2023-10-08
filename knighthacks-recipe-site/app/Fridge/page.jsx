"use client";

import { NavBar } from "../components/NavBar.jsx";
import { Table } from "../components/TableIngredients.jsx";
import { useState } from "react";

const header = ["Ingredients"];

export default function Home() {
  const [ingredients, setIngredients] = useState([]);

  // Function to add the ingredients list
  const addIngredient = (newValue) => {
    fetch("/api/sendIngredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredient: newValue }),
    });
    setIngredients((prevIngredients) => [[newValue], ...prevIngredients]);
  };

  // Function to remove an ingredient
  const removeIngredient = (index) => {
    fetch("/api/removeIngredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    });
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];

      updatedIngredients.splice(index, 1);
      return updatedIngredients;
    });
  };
  return (
    <div>
      <NavBar />
      <Table
        header={header}
        inputs={ingredients}
        onAdd={addIngredient}
        onRemove={removeIngredient}
      />
      <div className="bg-slate-900 h-screen"></div>
    </div>
  );
}
