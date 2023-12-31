import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>(); 
   
  private recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      "A slice of classic cheese pizza is one of life's greatest pleasures. While calling for delivery is always a treat, being able to make your own pizza recipes at home is even more satisfying.",
      'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*',
      [
        new Ingredient("pizza-bread",1),
        new Ingredient("onion",1),
        new Ingredient("cheese",1),
        new Ingredient("corn",1),
        new Ingredient("capcicum",1),
        new Ingredient("tomato",2),
      ]
    ),
    new Recipe(
      'Burger',
      "Stovetop Burgers are easier than you think! Learning how to cook the perfect burgers on the stove means you can make this easy dinner anytime of year.",
      'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
      [
        new Ingredient("burger-buns",2),
        new Ingredient("patty",2),
        new Ingredient("onion",1),
        new Ingredient("corn",1),
        new Ingredient("sauce",1),
        new Ingredient("tomato",2),
      ]
    ),
  ];

  constructor(private shoppingListService : ShoppingListService) {}

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index:number){
    return this.recipes[index];
  } 

  addIngredientsToShoppingList(ingredients : Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
