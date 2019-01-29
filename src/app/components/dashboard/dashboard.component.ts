import { Component, OnInit } from "@angular/core";
import { DataSource } from "@angular/cdk/table";
import { Observable, BehaviorSubject } from "rxjs";
import { MatDialog, MatSnackBar } from "@angular/material";
import { RecipeDialogComponent } from "../recipe-dialog/recipe-dialog.component";
import { CollectionViewer } from "@angular/cdk/collections";
import { RecipesService } from "src/app/services/recipes.service";
import { Recipe } from "src/app/models/recipe.model";
import { AuthService } from "src/app/services/auth.service";

export class RecipeDataSource extends DataSource<Recipe> {
  private recipesSubject = new BehaviorSubject<Recipe[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private recipesService: RecipesService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.recipesSubject.complete();
    this.loadingSubject.complete();
  }

  public totalSize = 0;

  loadRecipes(pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);

    this.recipesService
      .listAll(this.totalSize + (pageIndex + 1) * pageSize)
      .subscribe(recipes => {
        this.totalSize = recipes.length;
        this.loadingSubject.next(false);
        this.recipesSubject.next(recipes);
      });
  }
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  displayedColumns = ["name", "update", "delete"];
  dataSource = new RecipeDataSource(this.recipesService);

  ngOnInit() {
    this.dataSource = new RecipeDataSource(this.recipesService);
  }

  constructor(
    private recipesService: RecipesService,
    public dialog: MatDialog,
    public auth: AuthService,
    public snackBar: MatSnackBar
  ) {}

  deleteRecipe(_id: string): void {
    if (this.hasPermissions) {
      this.recipesService.deleteRecipe(_id).subscribe(response => {
        this.loadPage();
      });
    }
  }

  openNewRecipeDialog(): void {
    if (this.hasPermissions) {
      const dialogRef = this.dialog.open(RecipeDialogComponent, {
        width: "600px",
        data: {
          title: "New Recipe",
          recipe: {
            description: "",
            imageUrl: "",
            ingredients: [],
            name: "",
            preparationSteps: [],
            likes: [],
            type: ""
          }
        }
      });
      dialogRef.componentInstance.saveAction.subscribe(result => {
        this.recipesService.addRecipe(result.data).subscribe(response => {
          console.log(response);
          this.loadPage();
          dialogRef.close();
        });
      });
    }
  }

  openUpdateRecipeDialog(recipe: Recipe): void {
    if (this.hasPermissions) {
      const dialogRef = this.dialog.open(RecipeDialogComponent, {
        width: "600px",
        data: {
          title: "Updating Recipe",
          recipe: {
            ...recipe
          },
          update: true
        }
      });
      dialogRef.componentInstance.updateAction.subscribe(result => {
        this.recipesService.updateRecipe(result.data).subscribe(response => {
          this.loadPage();
          dialogRef.close();
        });
      });
    }
  }

  ngAfterViewInit() {
    this.loadPage();
  }

  loadPage() {
    this.dataSource.loadRecipes();
  }

  get hasPermissions(): boolean {
    return this.auth.isAuthenticated();
  }
}
