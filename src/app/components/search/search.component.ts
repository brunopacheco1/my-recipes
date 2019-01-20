import { Component, OnInit } from "@angular/core";
import { RecipesService } from "src/app/services/recipes.service";
import { Observable } from "rxjs";
import { Recipe } from "src/app/models/recipe.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(
    private authService: AuthService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.recipes$ = this.recipesService.getRecipes();
  }

  public toggleLike(recipe: Recipe): void {
    console.log(recipe);
    this.recipesService.toggleLike(recipe);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
