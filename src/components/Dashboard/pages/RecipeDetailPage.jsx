import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const RecipeDetailPage = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [showSubstitutes, setShowSubstitutes] = useState(false);

  // API endpoint for any future calls
  const API_URL = 'https://recipaimodel.onrender.com';

  useEffect(() => {
    const storedRecipe = localStorage.getItem('selectedRecipe');
    if (storedRecipe) {
      setRecipe(JSON.parse(storedRecipe));
    } else {
      toast.error('No recipe selected');
      navigate('/dashboard/recipe-model');
    }
  }, [navigate]);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <i className="ri-loader-4-line text-4xl text-green-500 animate-spin mb-4"></i>
          <p className="text-green-700">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
        <button
          onClick={() => navigate('/dashboard/recipe-model')}
          className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors duration-300 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          <span>Back to Recipe Generator</span>
        </button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-green-900 mb-4">{recipe.name}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {recipe.cuisine && (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                  <i className="ri-global-line text-green-600"></i>
                  <span className="text-green-700 font-medium">{recipe.cuisine}</span>
                </div>
              )}
              {recipe.prep_time && (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                  <i className="ri-time-line text-green-600"></i>
                  <span className="text-green-700 font-medium">{recipe.prep_time}</span>
                </div>
              )}
              {recipe.diet && (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                  <i className="ri-leaf-line text-green-600"></i>
                  <span className="text-green-700 font-medium capitalize">{recipe.diet}</span>
                </div>
              )}
              {recipe.course && (
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg">
                  <i className="ri-restaurant-2-line text-green-600"></i>
                  <span className="text-green-700 font-medium capitalize">{recipe.course}</span>
                </div>
              )}
            </div>
          </div>
          
          {recipe.image_url && (
            <div className="w-full md:w-80">
              <img
                src={recipe.image_url}
                alt={recipe.name}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ingredients */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100/20">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <i className="ri-list-check-line"></i>
              Ingredients
            </h2>
            
            {recipe.translated_ingredients && recipe.translated_ingredients.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.translated_ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-800 capitalize">{ingredient}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No ingredients list available</p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100/20">
            <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
              <i className="ri-file-list-line"></i>
              Instructions
            </h2>
            
            {recipe.instructions_translated ? (
              <div className="prose max-w-none">
                <div className="text-green-800 leading-relaxed whitespace-pre-line">
                  {recipe.instructions_translated}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No instructions available</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Missing Ingredients */}
          {recipe.missing_ingredients && recipe.missing_ingredients.length > 0 && (
            <div className="bg-orange-50 rounded-2xl p-6 shadow-lg border border-orange-100/20">
              <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                <i className="ri-shopping-cart-line"></i>
                Missing Ingredients
              </h3>
              
              <div className="space-y-2">
                {recipe.missing_ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <i className="ri-alert-line text-orange-500"></i>
                    <span className="text-orange-800 capitalize">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Substitutes */}
          {recipe.suggested_substitutes && Object.keys(recipe.suggested_substitutes).length > 0 && (
            <div className="bg-blue-50 rounded-2xl p-6 shadow-lg border border-blue-100/20">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ri-exchange-line"></i>
                  Ingredient Substitutes
                </div>
                <button
                  onClick={() => setShowSubstitutes(!showSubstitutes)}
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <i className={`ri-${showSubstitutes ? 'eye-off' : 'eye'}-line`}></i>
                </button>
              </h3>
              
              <AnimatePresence>
                {showSubstitutes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {Object.entries(recipe.suggested_substitutes).map(([ingredient, substitute], index) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="font-semibold text-blue-900 mb-2 capitalize">
                          {ingredient}
                        </div>
                        <div className="text-blue-700 text-sm">
                          {substitute}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!showSubstitutes && (
                <p className="text-blue-700 text-sm">
                  Click the eye icon to view substitution suggestions
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="bg-green-50 rounded-2xl p-6 shadow-lg border border-green-100/20">
            <h3 className="text-xl font-bold text-green-900 mb-4">Recipe Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  // Add to favorites logic here
                  toast.success('Recipe added to favorites!');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300"
              >
                <i className="ri-heart-line"></i>
                Add to Favorites
              </button>
              
              <button
                onClick={() => {
                  // Share recipe logic here
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Recipe link copied to clipboard!');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300"
              >
                <i className="ri-share-line"></i>
                Share Recipe
              </button>
              
              <button
                onClick={() => {
                  // Print recipe logic here
                  window.print();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                <i className="ri-printer-line"></i>
                Print Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
