import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipesService } from "src/app/services/recipes.service";
import { Observable, Subscription } from "rxjs";
import { Recipe } from "src/app/models/recipe.model";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent implements OnInit, OnDestroy {
  id: string;
  recipe$: Observable<Recipe>;
  _paramSubscription$: Subscription;

  constructor(
    private authService: AuthService,
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._paramSubscription$ = this.route.params.subscribe(params => {
      this.id = params["id"];

      this.recipe$ = this.recipesService.getRecipe(this.id);
    });
  }

  ngOnDestroy() {
    this._paramSubscription$.unsubscribe();
  }

  public toggleLike(recipe: Recipe): void {
    this.recipesService.toggleLike(recipe);
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
