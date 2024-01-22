import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{

  @ViewChild("f") shoppingListForm : NgForm;
  subscription : Subscription;
  editMode = false;
  editItemIndex : number;
  editedItem : Ingredient;

  constructor(private shoppingListService:ShoppingListService) {}
  
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        })
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  onAddItem(form:NgForm){
    const formData = form.value;
    let ingredient : Ingredient = new Ingredient(formData.name,formData.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editItemIndex,ingredient)
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
 
