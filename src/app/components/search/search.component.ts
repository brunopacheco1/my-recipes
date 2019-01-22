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
  searchInput: string;

  constructor(
    private authService: AuthService,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.search();
  }

  public toggleLike(recipe: Recipe): void {
    this.recipesService.toggleLike(recipe);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public search(): void {
    this.recipes$ = this.recipesService.getRecipes(this.searchInput);
  }
}
