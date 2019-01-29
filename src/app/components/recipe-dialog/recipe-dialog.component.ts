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
}
