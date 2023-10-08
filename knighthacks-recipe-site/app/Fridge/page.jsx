"use client";

import { NavBar } from "../components/NavBar.jsx";
import { Table } from "../components/TableIngredients.jsx";
import { useEffect, useState } from "react";

const header = ["Ingredients"];

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  // Function to add the ingredients list
  useEffect(() => {
    fetch("/api/getIngredients")
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data.ingredients);
      });
  }, []);
  const addIngredient = (newValue) => {
    fetch("/api/sendIngredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredient: newValue }),
    });
    if (newValue === "") {
      return;
    }
    if (!ingredients.includes(newValue)) {
      setIngredients((prevIngredients) => [newValue, ...prevIngredients]);
    }
  };

  // Function to remove an ingredient
  const removeIngredient = (name) => {
    console.log("Removing ingredient");
    fetch("/api/removeIngredient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredient: name }),
    });
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      const index = updatedIngredients.indexOf(name);
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
