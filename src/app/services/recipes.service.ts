import { Injectable } from '@angular/core';
import { Recipe, UnitOfMeasurement } from '../models/recipe.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  readonly DATA: Recipe[] = [{
    _id: 'sfdsfsdfsdf',
    name: 'Feijoada',
    description: 'Receita tradicional brasileira',
    ingredients: [{
      name: 'Feijão',
      quantity: 1,
      unitOfMeasurement: UnitOfMeasurement.KG
    }],
    ownerId: '234234234',
    preparationSteps: [
      'Cozinhar o feijão em panela de pressão'
    ]
  }]

  constructor() { }

  public getRecipes(): Observable<Recipe[]> {
    return of(this.DATA);
  }
}
