import { clientPromise } from "../../../utils/mongodb.js";
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("KnightBites");
    const collection = db.collection("ingredients");
    const result = await collection.find().toArray();
    const ingredients = result.map((ingredient) => ingredient.ingredient);

    // Return the array of second key values in the response
    return new Response(JSON.stringify({ ingredients }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
}
