import { Component, Inject, EventEmitter } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-recipe-dialog",
  templateUrl: "./recipe-dialog.component.html",
  styleUrls: ["./recipe-dialog.component.scss"]
})
export class RecipeDialogComponent {
  public saveAction: EventEmitter<any> = new EventEmitter();
  public updateAction: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {}

  onSubmit(): void {}
}
