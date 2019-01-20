export enum UnitOfMeasurement {
  CUPS,
  ML,
  G,
  KG
}

export interface Ingredient {
  name: string;
  quantity: number;
  unitOfMeasurement: UnitOfMeasurement;
}

export interface Recipe {
  _id: string;
  createdAt: firebase.firestore.Timestamp;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  likes: string[];
  name: string;
  ownerId: string;
  preparationSteps: string[];
}
