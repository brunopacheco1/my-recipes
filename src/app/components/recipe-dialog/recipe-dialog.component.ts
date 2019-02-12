import { Component, Inject, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { RecipeFormViewModel } from "./recipe-form.view-model";

@Component({
  selector: "app-recipe-dialog",
  templateUrl: "./recipe-dialog.component.html",
  styleUrls: ["./recipe-dialog.component.scss"]
})
export class RecipeDialogComponent {
  viewModel = new RecipeFormViewModel();
  preparationStep: string;
  ingredient: string;
  public saveAction: EventEmitter<any> = new EventEmitter();
  public updateAction: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.viewModel.valid) {
      if (this.data.update) {
        this.updateAction.emit({ data: this.data.recipe });
      } else {
        this.saveAction.emit({ data: this.data.recipe });
      }
    }
  }

  addPreparationStep(): void {
    if (!!this.preparationStep) {
      this.data.recipe.preparationSteps =
        this.data.recipe.preparationSteps || [];
      this.data.recipe.preparationSteps.push(this.preparationStep);
      this.preparationStep = null;
    }
  }

  removePreparationStep(preparationStep: string): void {
    this.data.recipe.preparationSteps = this.data.recipe.preparationSteps.filter(
      el => el !== preparationStep
    );
  }

  addIngredient(): void {
    if (!!this.ingredient) {
      this.data.recipe.ingredients = this.data.recipe.ingredients || [];
      this.data.recipe.ingredients.push(this.ingredient);
      this.ingredient = null;
    }
  }

  removeIngredient(ingredient: string): void {
    this.data.recipe.ingredients = this.data.recipe.ingredients.filter(
      el => el !== ingredient
    );
  }
}
