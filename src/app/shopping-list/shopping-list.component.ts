import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy{

  ingredients : Ingredient[];
  ingredientsChangedSubscription : Subscription;

  constructor(private shoppingListService:ShoppingListService) {}
  
  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  onEditItem(index:number){
      this.shoppingListService.startedEditing.next(index);
  }
}
