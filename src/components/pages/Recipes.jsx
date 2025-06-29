import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Leaf, 
  Search, 
  Filter, 
  Heart,
  Star,
  Utensils,
  Globe,
  RefreshCw
} from 'lucide-react';

// Sample recipe data from the provided CSV - randomly selected recipes
const sampleRecipes = [
  {
    id: 1,
    name: "Thayir Semiya Recipe (Curd Semiya)",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Raksha_Kamat/Thayir_Curd_Semiya_recipe_Yogurt_Vermicelli_South_indian_Lunch_recipe-4.jpg",
    description: "Thayir Semiya or Curd Vermicelli is a quick dish which you can make for lunch. If you are bored of eating curd rice everyday, you can always make this Thayir semiya or curd semiya for a change. In South India, people consume curd everyday.",
    cuisine: "Indian",
    course: "Lunch",
    diet: "Vegetarian",
    prep_time: "35 M",
    ingredients: ["cup semiya vermicelli roasted", "curd dahi yogurt", "mustard seeds rai kadugu", "raw peanuts moongphali", "curry leaves"],
    rating: 4.5
  },
  {
    id: 2,
    name: "Chettinad Style Kara Kuzhambu Recipe",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/mkavya87-gmail.com/Chettinad_Style_Kara_Kuzhambu_Recipe_with_Potato_and_Brinjal_1_1600.jpg",
    description: "Chettinad Style Kara Kuzhambu Recipe with Potato and Brinjal is a finger licking good recipe made the Chettinad way.",
    cuisine: "South Indian",
    course: "Lunch",
    diet: "Vegetarian",
    prep_time: "75 M",
    ingredients: ["fresh coconut grated", "sambar powder", "curry leaves", "potatoes aloo cut", "brinjal baingan eggplant"],
    rating: 4.8
  },
  {
    id: 3,
    name: "Goan Chana Ros Recipe (White Peas Curry)",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Raksha_Kamat/Goan_Chana_Ross.jpg",
    description: "Goan Chana Ros is a vegetarian dish from Goan cuisine made with dried white peas (safed vatana). In Ros recipes, we add freshly grated coconut, instead of roasted coconut which is used for many other Goan dishes.",
    cuisine: "Goan",
    course: "Lunch",
    diet: "Vegetarian",
    prep_time: "530 M",
    ingredients: ["dried green peas vatana", "fresh coconut grated", "dry red chillies", "coriander dhania seeds", "tamarind"],
    rating: 4.3
  },
  {
    id: 4,
    name: "Minced Meat And Egg Croquettes Recipe",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Jyothi_Rajesh/Minced_Meat_and_Egg_Croquettes.jpg",
    description: "The croquette is usually cigar shaped or cylindrical. A fried cylindrical roll that has one of following stuffing minced meat, boiled eggs, fish, vegetables. Today I am sharing a croquette recipe that used minced meat as the main ingredient.",
    cuisine: "North Indian",
    course: "Appetizer",
    diet: "Non Vegetarian",
    prep_time: "55 M",
    ingredients: ["mutton minced", "whole eggs boiled", "onion finely chopped", "ginger garlic paste", "bread crumbs"],
    rating: 4.6
  },
  {
    id: 5,
    name: "Spicy Cabbage Rice Recipe",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Pooja_Thakur/Spicy_Cabbage_Rice.jpg",
    description: "Spicy Cabbage Rice takes very few ingredients to make and takes hardly 20 minutes to get prepared. This is a perfect recipe if you want to use your leftover rice and can be packed in your lunch box too.",
    cuisine: "Indian",
    course: "Lunch",
    diet: "Vegetarian",
    prep_time: "65 M",
    ingredients: ["cooked rice", "cabbage patta gobi", "cumin seeds jeera", "green chillies", "sambar powder"],
    rating: 4.2
  },
  {
    id: 6,
    name: "Dal Makhani Recipe Without Onion and Garlic",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Riya/Delicious_Dal_Makhani_Recipe_without_Onion_and_garlic_-1.jpg",
    description: "Dal Makhani or dal makhni is a popular dish originating from the Punjab region of the Indian Subcontinent. The primary ingredients in dal makhani are whole black lentil with red kidney beans, butter and cream.",
    cuisine: "North Indian",
    course: "Lunch",
    diet: "High Protein Vegetarian",
    prep_time: "55 M",
    ingredients: ["black urad dal whole", "rajma large kidney beans", "homemade tomato puree", "fresh cream", "butter salted"],
    rating: 4.7
  },
  {
    id: 7,
    name: "Peanut Curry Recipe",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Raksha_Kamat/Peanut_Curry.jpg",
    description: "Peanut Curry or Shengdanachi Amti is a Maharashtrian curry made especially during fasting days. This curry is usually served with varicha bhaat which is made using samo seeds.",
    cuisine: "Indian",
    course: "Lunch",
    diet: "High Protein Vegetarian",
    prep_time: "35 M",
    ingredients: ["raw peanuts moongphali", "fresh coconut grated", "green chillies", "jaggery grated", "kokum"],
    rating: 4.4
  },
  {
    id: 8,
    name: "Hyderabadi Bagara Baingan Recipe",
    image_url: "https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/Bagara_Baingan_Video_Recipe_3_1600.jpg",
    description: "Hyderabadi Bagara Baingan is a delicious preparation that is made from roasted brinjal/eggplant/ baingan. The base curry of the Bagara Baingan recipe is made from tamarind, peanuts and sesame seeds.",
    cuisine: "Hyderabadi",
    course: "Dinner",
    diet: "Vegetarian",
    prep_time: "55 M",
    ingredients: ["small brinjal baingan", "sesame seeds til", "roasted peanuts", "fresh coconut", "tamarind water"],
    rating: 4.9
  }
];

const RecipeCard = ({ recipe, index }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100/50 group relative"
    >
      {/* Card Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={recipe.image_url}
          alt={recipe.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Cuisine Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            {recipe.cuisine}
          </span>
        </div>
        
        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <Heart 
            size={20} 
            className={`${isLiked ? 'text-red-500 fill-current' : 'text-white'} transition-colors duration-300`} 
          />
        </motion.button>
        
        {/* Diet Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <Leaf size={14} className="text-green-300" />
            <span className="text-white text-sm font-medium">{recipe.diet}</span>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {recipe.course}
          </span>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span className="text-gray-600 font-medium">{recipe.rating}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
          {recipe.name}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {recipe.description}
        </p>
        
        {/* Recipe Meta */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock size={14} className="text-green-500" />
            <span>{recipe.prep_time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ChefHat size={14} className="text-green-500" />
            <span>{recipe.ingredients?.length || 5}+ ingredients</span>
          </div>
        </div>
        
        {/* Ingredients Preview */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Key Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients?.slice(0, 3).map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-xs"
              >
                {ingredient.length > 20 ? `${ingredient.substring(0, 20)}...` : ingredient}
              </span>
            ))}
            {recipe.ingredients?.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          View Recipe
        </motion.button>
      </div>
    </motion.div>
  );
};

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Get unique cuisines and diets
  const cuisines = [...new Set(sampleRecipes.map(recipe => recipe.cuisine))];
  const diets = [...new Set(sampleRecipes.map(recipe => recipe.diet))];

  useEffect(() => {
    // Simulate loading and randomly shuffle recipes
    const loadRecipes = () => {
      setIsLoading(true);
      setTimeout(() => {
        const shuffled = [...sampleRecipes].sort(() => Math.random() - 0.5);
        setRecipes(shuffled);
        setFilteredRecipes(shuffled);
        setIsLoading(false);
      }, 1000);
    };
    
    loadRecipes();
  }, []);

  useEffect(() => {
    let filtered = recipes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by cuisine
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(recipe => recipe.cuisine === selectedCuisine);
    }

    // Filter by diet
    if (selectedDiet !== 'all') {
      filtered = filtered.filter(recipe => recipe.diet === selectedDiet);
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, selectedCuisine, selectedDiet, recipes]);

  const refreshRecipes = () => {
    const shuffled = [...sampleRecipes].sort(() => Math.random() - 0.5);
    setRecipes(shuffled);
    setFilteredRecipes(shuffled);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center mb-6"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mr-4"
            >
              <Utensils className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              Discover Amazing Recipes
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our curated collection of delicious recipes from around the world. 
            From traditional Indian dishes to international cuisines, find your next favorite meal here.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 text-green-100"
          >
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Multiple Cuisines</span>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5" />
              <span>All Diet Types</span>
            </div>
            <div className="flex items-center space-x-2">
              <ChefHat className="w-5 h-5" />
              <span>Easy to Follow</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-green-100"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes, cuisines, or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-300"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
              >
                <option value="all">All Cuisines</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
              
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white"
              >
                <option value="all">All Diets</option>
                {diets.map(diet => (
                  <option key={diet} value={diet}>{diet}</option>
                ))}
              </select>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshRecipes}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300 flex items-center space-x-2"
              >
                <RefreshCw size={18} />
                <span>Shuffle</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-gray-600 text-lg">
            Found <span className="font-bold text-green-600">{filteredRecipes.length}</span> amazing recipes for you
          </p>
        </motion.div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No recipes found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCuisine('all');
                setSelectedDiet('all');
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Recipes;