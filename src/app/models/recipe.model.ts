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
    ownerId: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    preparationSteps: string[];
    imageUrl: string;
    likes: string[];
    createdAt: firebase.firestore.Timestamp;
}