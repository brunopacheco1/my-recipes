import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
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

  public getRecipes(query: string = ""): Observable<Recipe[]> {
    return this.database
      .collection<Recipe>(this.collection, ref =>
        ref
          .orderBy("name")
          .startAt(query)
          .endAt(query + "\uf8ff")
          .limit(10)
      )
      .valueChanges();
  }

  public listAll(pageSize: number): Observable<Recipe[]> {
    return this.database
      .collection<Recipe>(this.collection, ref =>
        ref
          .where("ownerId", "==", this.authService.getUserUid())
          .orderBy("name")
          .limit(pageSize)
      )
      .valueChanges();
  }

  public getRecipe(_id: string): Observable<Recipe> {
    return this.database
      .collection(this.collection)
      .doc<Recipe>(_id)
      .valueChanges();
  }

  public deleteRecipe(_id: string): Observable<void> {
    return of();
  }

  public addRecipe(recipe: Recipe): Observable<void> {
    return of();
  }

  public updateRecipe(recipe: Recipe): Observable<void> {
    return of();
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
