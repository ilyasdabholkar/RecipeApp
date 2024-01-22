import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id:number;
  recipe:Recipe;
  
  constructor(private recipeService :RecipeService,private route:ActivatedRoute,private router:Router) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  
  onClickToShoppingList(ingredients : Ingredient[]){
    this.recipeService.addIngredientsToShoppingList(ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
