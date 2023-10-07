import { Table } from "./components/Table.jsx";
import { NavBar } from "./components/NavBar.jsx";
const header = ["Recipe", "Ingredients", "Relevancy Score"];
const recipes = [
  [
    "Spaghetti Bolognese",
    ["Spaghetti", "Ground beef", "Tomato sauce", "Onions", "Garlic", "Oregano"],
    "100%",
    "To make this, you need to boil the spaghetti, cook the ground beef, and mix it all together.",
  ],
  [
    "Chicken Stir Fry",
    ["Chicken breast", "Broccoli", "Soy sauce", "Ginger", "Vegetables"],
    "100%",
    "To make this, you need to cook the chicken, cook the broccoli, and mix it all together.",
  ],

  // Add more recipe objects as needed
];

export default function Home() {
  return (
    <div>
      <NavBar />
      <Table inputs={recipes} header={header} />
    </div>
  );
}
