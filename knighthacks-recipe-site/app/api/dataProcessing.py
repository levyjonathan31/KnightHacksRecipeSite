import json
import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from pymongo import MongoClient


from dotenv import load_dotenv
app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://knight-bites.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def data_processing(input_list: list[str]):
    with open ('../../recipes_raw/recipes_raw_nosource_fn.json') as json_file:
        full_data = json.load(json_file)

    recipes = {}
    ingredients = {}

    for key in full_data:
        if "title" in full_data[key]:
            title = full_data[key]["title"]
            recipes[title] = full_data[key]
            full_data[key].pop('title')

    for input_ing in input_list:
        ingredients[input_ing] = []
        for key in recipes:
            for ingredient in recipes[key]["ingredients"]:
                if input_ing in ingredient:
                    ingredients[input_ing].append(key)
                    break

    results_dict = {}

    for input_ing in ingredients:
        for recipe_quant in ingredients[input_ing]:
            if recipe_quant not in results_dict:
                results_dict[recipe_quant] = 0
            results_dict[recipe_quant] += 100/len(recipes[recipe_quant]["ingredients"])

    #Sorts results in descending order        
    results_dict = sorted(results_dict.items(), key=lambda x:x[1], reverse=True)
    
    recipe_list = [x[0] for x in results_dict]
    ingredient_list = [recipes[x[0]]["ingredients"] for x in results_dict]
    relevancy_score = [x[1] for x in results_dict]
    instructions_list = [recipes[x[0]]["instructions"] for x in results_dict]

    results_list = zip(recipe_list, ingredient_list, relevancy_score, instructions_list)
    
    return {"results" : results_list}

# MongoDB from env variables
load_dotenv()
MONGO_DB_URI = os.environ.get("MONGODB_URI")
MONGO_DB_NAME = "KnightBites"

# Dependency to get the MongoDB client
def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = MONGO_DB_URI
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)
   # Create the database for our example (we will use the same database throughout the tutorial
   return client[MONGO_DB_NAME]
  
# This is added so that many files can reuse the function get_database()

@app.get("/process-ingredients")
async def process_ingredients(db: get_database()):
    try:
        # Fetch data from the database
        # For example, assuming you have a collection named "ingredients"
        ingredients_collection = db["ingredients"]
        ingredients = await db[ingredients_collection].find().to_list(length=None)
        # Process the data
        processed_data = data_processing([ingredient["name"] for ingredient in ingredients])

        return {"processed_data": processed_data}
    except Exception as e:
        # Handle exceptions, log errors, and return an appropriate response
        return {"error": str(e)}
