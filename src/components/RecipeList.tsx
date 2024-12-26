// /src/components/RecipeList.tsx
import React, { useState } from 'react';
import RecipeItem from './RecipeItem';
import { saveRecipeToDatabase } from '../services/firebase';

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  steps: string[];
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecipe, setNewRecipe] = useState({ title: '', ingredients: '', steps: '' });

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({ ...prev, [name]: value }));
  };

  // Add a new recipe
  const handleSaveRecipe = async () => {
    if (!newRecipe.title || !newRecipe.ingredients || !newRecipe.steps) {
      alert('Please fill in all fields!');
      return;
    }

    const ingredientsArray = newRecipe.ingredients.split('\n').map(item => item.trim());
    const stepsArray = newRecipe.steps.split('\n').map(item => item.trim());

    const newRecipeData = {
      id: recipes.length + 1,  // Or another method to generate the id
      title: newRecipe.title,
      ingredients: ingredientsArray,
      steps: stepsArray,
    };

    // Save the recipe to Firebase Realtime Database
    await saveRecipeToDatabase(newRecipeData);

    // Add the new recipe to local state
    setRecipes(prev => [
      ...prev,
      newRecipeData,
    ]);

    // Reset input fields
    setNewRecipe({ title: '', ingredients: '', steps: '' });
  };

  // Delete recipe handler
  const handleDelete = (id: number) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  // Edit recipe handler
  const handleEdit = (id: number) => {
    const recipeToEdit = recipes.find(recipe => recipe.id === id);
    if (recipeToEdit) {
      const newTitle = prompt('Edit Recipe Title:', recipeToEdit.title);
      if (newTitle) {
        setRecipes(
          recipes.map(recipe =>
            recipe.id === id ? { ...recipe, title: newTitle } : recipe
          )
        );
      }
    }
  };

  // Filter recipes based on search
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-list">
      <h1>Recipe Manager</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search Recipes..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          fontSize: '16px',
          width: '100%',
        }}
      />

      {/* Add Recipe Form */}
      <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #ccc' }}>
        <h2>Add New Recipe</h2>
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (separate by newline)"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          rows={5}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          name="steps"
          placeholder="Steps (separate by newline)"
          value={newRecipe.steps}
          onChange={handleInputChange}
          rows={5}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button onClick={handleSaveRecipe} style={{ padding: '10px', fontSize: '16px' }}>
          Save Recipe
        </button>
      </div>

      {/* Recipe Items */}
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map(recipe => (
          <RecipeItem
            key={recipe.id}
            recipe={recipe}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
