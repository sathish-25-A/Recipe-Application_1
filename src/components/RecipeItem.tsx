import React from 'react';

interface RecipeProps {
  recipe: {
    id: number;
    title: string;
    ingredients: string[];
    steps: string[];
  };
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const RecipeItem: React.FC<RecipeProps> = ({ recipe, onDelete, onEdit }) => {
  return (
    <div className="recipe-item" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h2>{recipe.title}</h2>
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Steps:</h4>
      <ul>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <div className="buttons" style={{ marginTop: '10px' }}>
        <button onClick={() => onDelete(recipe.id)} style={{ marginRight: '10px' }}>
          Delete
        </button>
        <button onClick={() => onEdit(recipe.id)}>Edit</button>
      </div>
    </div>
  );
};

export default RecipeItem;
