// /src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, remove, get, push } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmKOpeIEnqj3mw5O6BPP6TTCr9BCZzSks",
  authDomain: "recipe-app-7f923.firebaseapp.com",
  databaseURL: "https://recipe-app-7f923-default-rtdb.firebaseio.com/",
  projectId: "recipe-app-7f923",
  storageBucket: "recipe-app-7f923.firebasestorage.app",
  messagingSenderId: "346831143214",
  appId: "1:346831143214:web:66b9a78095390f375c3abf",
  measurementId: "G-HZEEZ689YW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Save recipe to Firebase Realtime Database
export const saveRecipeToDatabase = async (recipe: any) => {
  const newRecipeRef = ref(db, 'recipes');
  const newRecipeKey = push(newRecipeRef).key; // Generates unique key
  await set(ref(db, 'recipes/' + newRecipeKey), recipe); // Set the recipe to that unique key
};

// Update recipe in Firebase Realtime Database
export const updateRecipeInDatabase = async (id: string, updatedRecipe: any) => {
  const recipeRef = ref(db, 'recipes/' + id);
  await update(recipeRef, updatedRecipe);
};

// Delete recipe from Firebase Realtime Database
export const deleteRecipeFromDatabase = async (id: string) => {
  const recipeRef = ref(db, 'recipes/' + id);
  await remove(recipeRef);
};

// Get recipes from Firebase Realtime Database
export const getRecipesFromDatabase = async () => {
  const snapshot = await get(ref(db, 'recipes'));
  return snapshot.val();
};
