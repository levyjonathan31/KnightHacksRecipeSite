import fs from "fs/promises";
import path from "path";

async function dataProcessing(inputList) {
  try {
    console.log(inputList);
    // Construct the absolute file path using __dirname
    const filePath = "app/api/dataProcessing/recipes_raw_nosource_fn.json";

    // Read data from a JSON file asynchronously
    const rawData = await fs.readFile(filePath, "utf8");
    const fullData = JSON.parse(rawData);

    const recipes = {};
    const ingredients = {};

    for (const key in fullData) {
      if (fullData[key].hasOwnProperty("title")) {
        const title = fullData[key].title;
        recipes[title] = fullData[key];
      }
    }

    for (const inputIng of inputList) {
      ingredients[inputIng] = [];
      for (const key in recipes) {
        for (const ingredient of recipes[key].ingredients) {
          if (ingredient.includes(inputIng)) {
            ingredients[inputIng].push(key);
            break;
          }
        }
      }
    }

    const resultsDict = {};

    for (const inputIng in ingredients) {
      for (const recipeQuant of ingredients[inputIng]) {
        if (!resultsDict.hasOwnProperty(recipeQuant)) {
          resultsDict[recipeQuant] = 0;
        }
        resultsDict[recipeQuant] +=
          100 / recipes[recipeQuant].ingredients.length;
      }
    }

    // Sort results in descending order
    const sortedResults = Object.entries(resultsDict).sort(
      (a, b) => b[1] - a[1]
    );

    const recipeList = sortedResults.map((x) => x[0]);
    const ingredientList = sortedResults.map((x) => recipes[x[0]].ingredients);
    const relevancyScore = sortedResults.map((x) => x[1]);
    const instructionsList = sortedResults.map(
      (x) => recipes[x[0]].instructions
    );

    const resultsList = recipeList.map((recipe, index) => ({
      recipe,
      ingredients: ingredientList[index],
      relevancyScore: relevancyScore[index],
      instructions: instructionsList[index],
    }));
    return { results: resultsList };
  } catch (error) {
    console.error("Error processing data:", error);
    throw error; // Propagate the error for handling elsewhere
  }
}
import { clientPromise } from "../../../utils/mongodb.js";
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("KnightBites");
    const collection = db.collection("ingredients");
    const result = await collection.find().toArray();
    const ingredients = result.map((ingredient) => ingredient.ingredient);
    const results = await dataProcessing(ingredients);
    const resultsArray = results.results.map((result) => [
      result.recipe,
      result.ingredients,
      result.relevancyScore,
      result.instructions,
    ]);

    return new Response(JSON.stringify(resultsArray), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);

    // Return an error response if needed
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
