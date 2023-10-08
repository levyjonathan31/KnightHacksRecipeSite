"use client";
import { Table } from "./components/TableRecipes.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { useEffect } from "react";
import { useState } from "react";
const header = ["Recipe", "Ingredients", "Relevancy Score"];

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/process-ingredients")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.processedData);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Table inputs={recipes} header={header} />
      <div className="bg-slate-900 h-screen"></div>
    </div>
  );
}
