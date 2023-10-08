import { clientPromise } from "../../../utils/mongodb.js";
export async function POST(request) {
  const data = await request.json();
  try {
    const client = await clientPromise;
    const db = client.db("KnightBites");
    const collection = db.collection("ingredients");
    const { ingredient } = data;
    console.log(ingredient);
    const result = await collection.deleteOne({ ingredient: ingredient });
  } catch (err) {
    console.log(err);
  }
  return Response.json(data);
}
