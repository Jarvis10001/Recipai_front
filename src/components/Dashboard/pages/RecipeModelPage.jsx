import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RecipeModelPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: 'grams',
    category: 'vegetables',
    expiryDate: ''
  });

  const categories = [
    { id: 'vegetables', name: 'Vegetables', icon: 'ri-plant-line' },
    { id: 'fruits', name: 'Fruits', icon: 'ri-apple-line' },
    { id: 'meat', name: 'Meat', icon: 'ri-meat-line' },
    { id: 'dairy', name: 'Dairy', icon: 'ri-cup-line' },
    { id: 'grains', name: 'Grains', icon: 'ri-seed-2-line' },
    { id: 'spices', name: 'Spices', icon: 'ri-flask-line' }
  ];

  const dietOptions = [
    { value: '', label: 'Any Diet' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'non-vegetarian', label: 'Non-Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'diabetic-friendly', label: 'Diabetic Friendly' },
    { value: 'high-protein', label: 'High Protein' }
  ];

  const handleAddIngredient = () => {
    if (newIngredient.name && newIngredient.quantity) {
      setIngredients([...ingredients, { ...newIngredient, id: Date.now() }]);
      setNewIngredient({
        name: '',
        quantity: '',
        unit: 'grams',
        category: 'vegetables',
        expiryDate: ''
      });
      toast.success('Ingredient added successfully!');
    } else {
      toast.error('Please enter ingredient name and quantity');
    }
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
    toast.success('Ingredient removed');
  };

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      toast.error('Please add some ingredients first!');
      return;
    }

    setIsLoading(true);
    setShowResults(false);
    
    try {
      // Extract ingredient names for the API
      const ingredientNames = ingredients.map(ing => ing.name.toLowerCase());
      
      // API endpoint - updated with actual Render URL
      const API_URL = 'https://recipaimodel.onrender.com';
      
      const payload = {
        user_ingredients: ingredientNames,
        user_diet: selectedDiet || null,
        debug: false
      };

      const response = await axios.post(`${API_URL}/recommend`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.recipes && response.data.recipes.length > 0) {
        setGeneratedRecipes(response.data.recipes);
        setShowResults(true);
        toast.success(`Found ${response.data.recipes.length} recipes!`);
      } else {
        toast.error('No recipes found with your ingredients');
        setGeneratedRecipes([]);
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error(error.response?.data?.detail || 'Error generating recipes. Please try again.');
      setGeneratedRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewRecipe = (recipe) => {
    // Store the selected recipe and navigate to a detailed view
    localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
    navigate('/dashboard/recipes/view');
  };

  // Filter ingredients based on category and search term
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (showResults) {
    return (
      <div className="space-y-6 bg-white">
        {/* Header with Back Button */}
        <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowResults(false)}
              className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors duration-300"
            >
              <i className="ri-arrow-left-line"></i>
              <span>Back to Ingredients</span>
            </button>
            <div className="flex items-center gap-2 text-green-700">
              <i className="ri-magic-line"></i>
              <span className="font-semibold">AI Generated Recipes</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Found {generatedRecipes.length} Recipe{generatedRecipes.length !== 1 ? 's' : ''}
          </h2>
          <p className="text-green-700">
            Based on your ingredients: {ingredients.map(ing => ing.name).join(', ')}
          </p>
        </div>

        {/* Recipe Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedRecipes.map((recipe, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Recipe Image */}
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-500 relative overflow-hidden">
                {recipe.image_url ? (
                  <img 
                    src={recipe.image_url} 
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <i className="ri-restaurant-line text-4xl text-white"></i>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
                  {recipe.cuisine || 'Global'}
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-2">{recipe.name}</h3>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-green-600">
                  {recipe.prep_time && (
                    <div className="flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      <span>{recipe.prep_time}</span>
                    </div>
                  )}
                  {recipe.diet && (
                    <div className="flex items-center gap-1">
                      <i className="ri-leaf-line"></i>
                      <span className="capitalize">{recipe.diet}</span>
                    </div>
                  )}
                  {recipe.course && (
                    <div className="flex items-center gap-1">
                      <i className="ri-restaurant-2-line"></i>
                      <span className="capitalize">{recipe.course}</span>
                    </div>
                  )}
                </div>

                {/* Missing Ingredients */}
                {recipe.missing_ingredients && recipe.missing_ingredients.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-orange-700 mb-2">Missing Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.missing_ingredients.slice(0, 3).map((ingredient, i) => (
                        <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs">
                          {ingredient}
                        </span>
                      ))}
                      {recipe.missing_ingredients.length > 3 && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs">
                          +{recipe.missing_ingredients.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Substitutes Available */}
                {recipe.suggested_substitutes && Object.keys(recipe.suggested_substitutes).length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                      <i className="ri-exchange-line"></i>
                      <span>Substitutes available</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleViewRecipe(recipe)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
                >
                  View Full Recipe
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - Add Ingredients */}
        <div className="flex-1 bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Recipe Model Generator
          </h2>
          <p className="text-green-700 mb-6">Add ingredients to generate custom recipes using AI</p>

          {/* Dietary Preference Selection */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Dietary Preferences</h3>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="w-full bg-white border border-green-200 rounded-lg px-3 py-2 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {dietOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Add New Ingredient Form */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Add Ingredients</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Ingredient name"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                className="bg-white border border-green-200 rounded-lg px-3 py-2 text-green-700 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newIngredient.quantity}
                onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                className="bg-white border border-green-200 rounded-lg px-3 py-2 text-green-700 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <select
                value={newIngredient.unit}
                onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                className="bg-white border border-green-200 rounded-lg px-3 py-2 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="grams">Grams</option>
                <option value="kg">Kilograms</option>
                <option value="ml">Milliliters</option>
                <option value="l">Liters</option>
                <option value="pieces">Pieces</option>
                <option value="cups">Cups</option>
                <option value="tbsp">Tablespoons</option>
                <option value="tsp">Teaspoons</option>
              </select>
              <button
                onClick={handleAddIngredient}
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
              >
                <i className="ri-add-line"></i>
                Add
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
                  }`}
                >
                  <i className={category.icon}></i>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIngredients.map(ingredient => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-green-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-green-700 font-medium capitalize">{ingredient.name}</h3>
                    <p className="text-green-600 text-sm">
                      {ingredient.quantity} {ingredient.unit}
                    </p>
                    <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs mt-2 capitalize">
                      {ingredient.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteIngredient(ingredient.id)}
                    className="text-red-400 hover:text-red-600 transition-colors duration-300 p-1"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Section - Search & Actions */}
        <div className="w-full md:w-80 space-y-6">
          {/* Search Section */}
          <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Search Ingredients</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-green-200 rounded-xl text-green-700 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-green-700"></i>
            </div>
          </div>

          {/* Generate Recipe Section */}
          <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
            <h3 className="text-lg font-semibold text-green-700 mb-4">Generate Recipe</h3>
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading || ingredients.length === 0}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                ingredients.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/30'
              }`}
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  <span>Generating Recipes...</span>
                </>
              ) : (
                <>
                  <i className="ri-magic-line"></i>
                  <span>Generate Recipes</span>
                </>
              )}
            </button>
            <div className="mt-4 space-y-2 text-sm text-green-700">
              <p>{ingredients.length === 0 ? 'Add ingredients to get started' : `${ingredients.length} ingredients available`}</p>
              {selectedDiet && (
                <p className="flex items-center gap-2">
                  <i className="ri-leaf-line"></i>
                  <span>Diet: {dietOptions.find(d => d.value === selectedDiet)?.label}</span>
                </p>
              )}
            </div>
          </div>

          {/* AI Features Info */}
          <div className="bg-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100/20">
            <h3 className="text-lg font-semibold text-blue-700 mb-4">AI Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <i className="ri-brain-line"></i>
                <span className="text-sm">Smart recipe recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <i className="ri-exchange-line"></i>
                <span className="text-sm">Ingredient substitution suggestions</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <i className="ri-search-eye-line"></i>
                <span className="text-sm">Missing ingredient identification</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <i className="ri-filter-line"></i>
                <span className="text-sm">Dietary preference filtering</span>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100/20">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">API Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Recipe API Ready</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Cosine Similarity Engine</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>TF-IDF Vectorization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModelPage;
