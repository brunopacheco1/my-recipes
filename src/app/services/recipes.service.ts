import { Injectable } from "@angular/core";
import { Recipe, UnitOfMeasurement, Ingredient } from "../models/recipe.model";
import { Observable, of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  private readonly collection = "recipes";
  private readonly ingredientsCollection = "ingredients";

  constructor(
    private authService: AuthService,
    private database: AngularFirestore
  ) {}

  public getRecipes(): Observable<Recipe[]> {
    return this.database.collection<Recipe>(this.collection).valueChanges();
  }

  public getRecipe(_id: string): Observable<Recipe> {
    return this.database
      .collection(this.collection)
      .doc<Recipe>(_id)
      .valueChanges();
  }

  public getIngredients(_id: string): Observable<Ingredient[]> {
    return this.database
      .collection(this.collection)
      .doc(_id)
      .collection<Ingredient>(this.ingredientsCollection)
      .valueChanges();
  }

  public toggleLike(recipe: Recipe): void {
    if (!this.authService.isAuthenticated()) return;

    if (!recipe.likes) {
      recipe.likes = [];
    }

    if (recipe.likes.indexOf(this.authService.getUserUid()) !== -1) {
      recipe.likes = recipe.likes.filter(
        uid => uid !== this.authService.getUserUid()
      );
    } else {
      recipe.likes = [...recipe.likes, this.authService.getUserUid()];
    }

    this.database
      .collection<Recipe>(this.collection)
      .doc(recipe._id)
      .update(recipe);
  }
}