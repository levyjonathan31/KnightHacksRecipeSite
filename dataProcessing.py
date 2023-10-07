import json

with open ('recipes_raw/recipes_raw_nosource_fn.json') as json_file:
    full_data = json.load(json_file)

recipes = {}
ingredients = {}

for key in full_data:
    if "title" in full_data[key]:
        title = full_data[key]["title"]
        recipes[title] = full_data[key]
        full_data[key].pop('title')

# Placeholder
input_list = ["garlic","tomato","onion","milk","strawberry"]
# Placeholder

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
      
# for title in results_dict:
#     total_ing = len(recipes[title]["ingredients"])
#     results_dict[title] = (results_dict[recipe_quant]/total_ing)*100

#Sorts results in descending order        
results_dict = sorted(results_dict.items(), key=lambda x:x[1], reverse=False)
print(results_dict)

#Figure out a way to load the pictures with each correlated recipe
