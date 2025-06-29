import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChefHat, 
  Sparkles, 
  ArrowRight,
  Clock,
  Star,
  Target
} from 'lucide-react';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  const user = JSON.parse(localStorage.getItem('user')) || {};

  const [quickActions] = useState([
    { 
      title: 'Find Recipes', 
      icon: 'ri-search-line',
      desc: 'Discover recipes with available ingredients',
      path: '/dashboard/ingredients',
      color: 'from-green-400 to-green-500',
      stats: '2.3K+ recipes'
    },
    {
      title: 'Recipe Model',
      icon: 'ri-magic-line',
      desc: 'Generate custom recipes using AI',
      path: '/dashboard/recipe-model',
      color: 'from-emerald-400 to-emerald-500',
      stats: 'AI Powered'
    },
    {   
      title: 'Track Meals',
      icon: 'ri-calendar-check-line',
      desc: 'Log your daily food intake',
      path: '/dashboard/nutrition',
      color: 'from-teal-400 to-teal-500',
      stats: 'Daily tracking'
    }
  ]);

  const [featuredRecipes] = useState([
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
      cookTime: "25 min",
      difficulty: "Easy",
      rating: 4.8,
      calories: 420,
      type: "Lunch"
    },
    {
      id: 2,
      name: "Creamy Mushroom Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=200&fit=crop",
      cookTime: "35 min",
      difficulty: "Medium",
      rating: 4.6,
      calories: 380,
      type: "Dinner"
    },
    {
      id: 3,
      name: "Avocado Toast Supreme",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop",
      cookTime: "10 min",
      difficulty: "Easy",
      rating: 4.7,
      calories: 290,
      type: "Breakfast"
    }
  ]);

  // Time-based greeting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const hour = now.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/30 min-h-screen p-1"
    >
      {/* Welcome Section */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden"
      >
        <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 rounded-3xl p-8 shadow-2xl border border-green-400/20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_white_2px,_transparent_2px)] bg-[length:60px_60px]"></div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <ChefHat className="w-8 h-8 text-white" />
          </motion.div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <motion.h1 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-bold text-white mb-2"
                >
                  {greeting}, {user.firstName || 'Chef'}!
                </motion.h1>
                <motion.p 
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-green-100 text-lg"
                >
                  Ready to create something delicious today?
                </motion.p>
              </div>
              
              <div className="text-center text-white">
                <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
                <div className="text-green-200 text-sm">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20 group text-left"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${action.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-green-900 font-bold text-lg mb-2 group-hover:text-green-700 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-green-600 text-sm mb-3 leading-relaxed">
                    {action.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-500 font-medium">{action.stats}</span>
                    <ArrowRight className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Recipes Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-3xl p-8 shadow-xl border border-green-100/50"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">Featured Recipes</h3>
            <p className="text-green-600">Trending recipes you might love</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/recipes/suggestions')}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-300"
          >
            <span className="text-sm font-medium">View all</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{recipe.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-white font-bold text-lg mb-1">{recipe.name}</h4>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <span>{recipe.calories} cal</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    recipe.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-xs text-green-600 font-medium">{recipe.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Simple Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Getting Started */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-3xl p-8 shadow-xl border border-green-100/50"
        >
          <h4 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-green-600" />
            Getting Started
          </h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                1
              </div>
              <div>
                <h5 className="font-semibold text-green-900">Add Your Ingredients</h5>
                <p className="text-green-600 text-sm">Start by listing what you have in your pantry</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                2
              </div>
              <div>
                <h5 className="font-semibold text-green-900">Generate Recipes</h5>
                <p className="text-green-600 text-sm">Let AI create personalized recipes for you</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-800 font-bold text-sm">
                3
              </div>
              <div>
                <h5 className="font-semibold text-green-900">Cook & Enjoy</h5>
                <p className="text-green-600 text-sm">Follow step-by-step instructions and enjoy your meal</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Features */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-3xl p-8 shadow-xl border border-green-100/50"
        >
          <h4 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-green-600" />
            AI Features
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-green-700">
              <i className="ri-brain-line text-xl"></i>
              <span>Smart recipe generation based on available ingredients</span>
            </div>
            <div className="flex items-center gap-3 text-green-700">
              <i className="ri-exchange-line text-xl"></i>
              <span>Ingredient substitution suggestions</span>
            </div>
            <div className="flex items-center gap-3 text-green-700">
              <i className="ri-search-eye-line text-xl"></i>
              <span>Missing ingredient identification</span>
            </div>
            <div className="flex items-center gap-3 text-green-700">
              <i className="ri-filter-line text-xl"></i>
              <span>Dietary preference filtering</span>
            </div>
            <div className="flex items-center gap-3 text-green-700">
              <i className="ri-time-line text-xl"></i>
              <span>Cooking time estimation</span>
            </div>
            <div className="flex items-center gap-3 text-green-700">
              <i className="ri-nutrition-line text-xl"></i>
              <span>Nutritional analysis</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;