import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Observable, of } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AuthService } from "./auth.service";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  private readonly collectionName = "recipes";
  private collection: AngularFirestoreCollection<Recipe>;

  constructor(
    private authService: AuthService,
    private database: AngularFirestore
  ) {
    this.collection = this.database.collection<Recipe>(this.collectionName);
  }

  public getRecipes(query: string = ""): Observable<Recipe[]> {
    return this.database
      .collection<Recipe>(this.collectionName, ref =>
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
      .collection<Recipe>(this.collectionName, ref =>
        ref
          .where("ownerId", "==", this.authService.getUserUid())
          .orderBy("name")
          .limit(pageSize)
      )
      .valueChanges();
  }

  public getRecipe(_id: string): Observable<Recipe> {
    return this.collection.doc<Recipe>(_id).valueChanges();
  }

  public deleteRecipe(_id: string): Observable<string> {
    if (!this.authService.isAuthenticated()) return of(_id);
    this.collection.doc<Recipe>(_id).delete();
    return of(_id);
  }

  public addRecipe(recipe: Recipe): Observable<Recipe> {
    if (!this.authService.isAuthenticated()) return of(recipe);
    recipe.createdAt = firebase.firestore.Timestamp.now();
    recipe.ownerId = this.authService.getUserUid();
    recipe.ownerName = this.authService.getUsername();
    recipe._id = this.database.createId();
    this.collection.doc(recipe._id).set(recipe);
    return of(recipe);
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    if (!this.authService.isAuthenticated()) return of(recipe);
    this.collection.doc(recipe._id).update(recipe);
    return of(recipe);
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

    this.collection.doc(recipe._id).update(recipe);
  }
}
