export interface Recipe {
  _id: string;
  createdAt: firebase.firestore.Timestamp;
  description: string;
  imageUrl: string;
  ingredients: string[];
  likes: string[];
  name: string;
  ownerId: string;
  ownerName: string;
  preparationSteps: string[];
}
