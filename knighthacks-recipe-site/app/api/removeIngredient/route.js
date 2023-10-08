import { clientPromise } from "../../../utils/mongodb.js";
export async function POST(request) {
  const res = await fetch("https://data.mongodb-api.com/...");
  const data = await request.json();
  try {
    const client = await clientPromise;
    const db = client.db("KnightBites");
    const collection = db.collection("ingredients");
    const { ingredient } = data;

    const result = await collection.deleteOne({ ingredient: data.ingredient });
  } catch (err) {
    console.log(err);
  }
  return Response.json(data);
}
