import json
from fastapi import FastAPI, Body, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

# Allow requests from localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/")
async def dataProcessing(input_list: dict[str]):
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
#print(list(dataProcessing(["garlic","tomato","strawberry"])))