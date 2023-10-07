import { NavBar } from "../components/NavBar.jsx";
import { Table } from "../components/TableIngredients.jsx";
const header = ["Ingredients"];
const ingredients = [
  ["Tomato Sauce"],
  ["Ground Beef"],
  ["Spaghetti"],
  ["Onions"],
  ["Garlic"],
  ["Oregano"],
  ["Chicken Breast"],
  ["Broccoli"],
  ["Soy Sauce"],
  ["Ginger"],
  ["Vegetables"],
];
export default function Home() {
  return (
    <div>
      <NavBar />
      <Table header={header} inputs={ingredients} />
    </div>
  );
}
