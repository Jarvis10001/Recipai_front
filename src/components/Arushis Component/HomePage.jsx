import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, 
  Search, 
  Stars, 
  Bot, 
  RefrigeratorIcon, 
  ShieldCheck, 
  Leaf,
  Utensils,
  SparklesIcon,
  Soup,
  Sandwich,
  Pizza,
  Clock,
  Flame,
  Heart,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Hero image placeholder - replace with your actual image
const heroImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

// Feature images
const featureImages = [
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
];

// Recipe images
const recipeImages = [
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80"
];

// Video placeholder - replace with your actual video
const demoVideo = "https://assets.mixkit.co/videos/preview/mixkit-woman-cooking-in-the-kitchen-4153-large.mp4";



const FeatureCard = ({ feature, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.6,
          delay: index * 0.2,
          type: "spring",
          stiffness: 100
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.3 }
      }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-100/50 group relative"
    >
      {/* Card Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      <div className="h-56 overflow-hidden relative">
        <motion.img 
          src={featureImages[index]} 
          alt={feature.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6">
          <div className="bg-green-600 p-4 rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm">
            {feature.icon}
          </div>
        </div>
        
        {/* Floating particles */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="absolute top-8 right-8 w-2 h-2 bg-green-300 rounded-full animate-pulse"
        ></motion.div>
      </div>
      
      <div className="p-8 relative z-10">
        <h3 className="text-2xl font-bold mb-4 text-green-900 group-hover:text-green-700 transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-base">
          {feature.description}
        </p>
        
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full mb-4"
        ></motion.div>
        
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-300 group/btn"
        >
          Learn more 
          <motion.div
            whileHover={{ x: 3 }}
            className="ml-2"
          >
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </motion.button>
      </div>
        {/* <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-green-400 font-medium"
        >
          Learn more <ArrowRight className="ml-2" size={16} />
        </motion.button> */}
    </motion.div>
  );
};

const StatItem = ({ stat, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { 
          duration: 0.6,
          delay: index * 0.2,
          type: "spring",
          stiffness: 100
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      className="text-center p-4"
    >
      <motion.p            className="text-5xl font-bold mb-2 text-white"
            whileHover={{ scale: 1.1 }}
          >
            {stat.value}
          </motion.p>
          <p className="text-green-200">{stat.label}</p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-green-400 mt-4 rounded-full"
          />
    </motion.div>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const featureCards = [
    {
      icon: <RefrigeratorIcon className="w-6 h-6 text-green-200" />,
      title: "Pantry-Powered Recipes",
      description: "Transform your available ingredients into delicious meals with AI-powered recommendations that reduce food waste and save you money."
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-200" />,
      title: "Dietary Flexibility",
      description: "Customize recipes based on dietary preferences, allergies, and health goals. Vegan, keto, gluten-free - we've got you covered."
    },
    {
      icon: <Bot className="w-6 h-6 text-green-200" />,
      title: "AI Recipe Assistant",
      description: "Get instant cooking suggestions, step-by-step guidance, and troubleshooting help from our intelligent chatbot."
    }
  ];

  

  const stats = [
    { value: "95%", label: "User Satisfaction" },
    { value: "40%", label: "Food Waste Reduced" },
    { value: "10K+", label: "Recipes Generated" },
    { value: "24/7", label: "AI Assistance" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      quote: "RecipAI has transformed my kitchen! As a working mother, I used to struggle with meal planning. Now I can create delicious meals from whatever I have at home.",
      gender: "women",
      id: 45
    },
    {
      name: "Rahul Patel",
      location: "Bangalore",
      rating: 4,
      quote: "The AI suggestions are amazing! I've discovered so many new recipes I would never have thought of. My only wish is for more regional Indian cuisine options.",
      gender: "men",
      id: 32
    },
    {
      name: "Ananya Gupta",
      location: "Delhi",
      rating: 4,
      quote: "This app has helped me reduce my grocery bill by 25%. The portion sizing recommendations are perfect for my small family.",
      gender: "women",
      id: 28
    },
    ...[
      { name: "Amit Verma", location: "Hyderabad" },
      { name: "Sneha Kapoor", location: "Pune" },
      { name: "Vikram Singh", location: "Chennai" },
      { name: "Neha Joshi", location: "Kolkata" },
      { name: "Suresh Reddy", location: "Jaipur" },
      { name: "Pooja Desai", location: "Ahmedabad" },
      { name: "Rohan Mehta", location: "Lucknow" },
      { name: "Divya Nair", location: "Chandigarh" },
      { name: "Arjun Malhotra", location: "Bhopal" },
      { name: "Kavita Shah", location: "Nagpur" }
    ].map((user, i) => ({
      name: user.name,
      location: user.location,
      rating: Math.floor(Math.random() * 2) + 4,
      quote: "This is a fantastic app! It has changed the way I cook and plan meals.",
      gender: i % 2 === 0 ? "men" : "women",
      id: i + 60
    }))
  ];
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-900 overflow-hidden">
      {/* Enhanced Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-green-200/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-green-300/15 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-to-r from-green-200/15 to-green-300/15 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-8 h-8 bg-green-400/20 rounded-full animate-bounce"></div>
        
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.4 + 0.3
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 360],
              transition: {
                duration: Math.random() * 25 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
            className="absolute text-green-300/30 opacity-40"
            style={{
              fontSize: `${Math.random() * 14 + 8}px`
            }}
          >
            {i % 3 === 0 ? <Utensils /> : i % 3 === 1 ? <ChefHat /> : <Leaf />}
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex flex-col justify-center items-center pt-20 pb-16 px-4"
      >
        {/* Hero Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-transparent to-green-100/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1
                }}
                className="mb-8"
              >
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-green-200 rounded-full border border-green-300/30 shadow-lg backdrop-blur-sm">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="mr-3"
                  >
                    <SparklesIcon className="w-5 h-5 text-green-600" />
                  </motion.div>
                  <span className="text-green-800 font-semibold">AI-Powered Recipe Generation</span>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl lg:text-8xl font-black mb-8 leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-green-600 to-green-500">
                  RecipAI
                </span>
              </motion.h1>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl lg:text-5xl font-extrabold text-green-900 mb-6"
              >
                Transform Ingredients Into{' '}
                <span className="relative inline-block">
                  <span className="text-green-600">Culinary Magic</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  />
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-700 text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl"
              >
                Discover personalized recipes using ingredients you already have. Reduce waste, save money, and enjoy cooking with our intelligent culinary assistant that learns your preferences.
              </motion.p>

              {/* Get Started Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 mb-10 justify-center lg:justify-start"
              >
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    px-10 py-5 
                    bg-gradient-to-r from-green-600 to-green-500
                    text-white font-bold text-lg
                    rounded-full shadow-2xl
                    hover:shadow-green-500/25
                    transition-all duration-300
                    border-2 border-green-500
                    relative overflow-hidden
                    group
                  "
                >
                  <span className="relative z-10">Get Started - It's Free!</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    px-10 py-5
                    bg-white/90 backdrop-blur-sm
                    border-2 border-green-600
                    text-green-700 font-bold text-lg
                    rounded-full shadow-xl
                    hover:shadow-2xl hover:bg-green-50
                    transition-all duration-300
                  "
                >
                  Watch Demo
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - Enhanced Hero Image */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 backdrop-blur-sm">
                  <img
                    src={heroImage}
                    alt="Delicious food prepared with RecipAI"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent"></div>
                  
                  {/* Enhanced Floating Recipe Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-green-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <ChefHat className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-900">Recipe Found!</p>
                        <p className="text-xs text-green-600">Pasta Primavera</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-green-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <Leaf className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-900">Zero Waste</p>
                        <p className="text-xs text-green-600">100% ingredients used</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Enhanced Decorative elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-green-400 to-green-300 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-green-300 to-green-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Features Section */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#22c55e_1px,_transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-green-900 mb-6">
              Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">RecipAI</span> Stands Out
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-xl lg:text-2xl leading-relaxed">
              Our AI-powered platform revolutionizes how you cook, reduce food waste, and enjoy personalized culinary experiences tailored to your taste and lifestyle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {featureCards.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Section */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-green-600 to-green-500 py-24 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_white_2px,_transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Trusted by Food Enthusiasts Worldwide
            </h2>
            <p className="text-green-100 text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              Join thousands of home cooks who have transformed their kitchens with AI-powered recipe generation
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <StatItem key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-20 overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          What Our <span className="text-green-600">Users Say</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Don't just take our word for it - hear from home cooks who transformed their kitchen experience.
        </p>
      </div>

      <motion.div 
        className="flex space-x-8 p-4"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[300px] border border-green-100"
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                  size={16} 
                  fill={i < testimonial.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-green-200 mr-4 overflow-hidden">
                <img 
                  src={`https://randomuser.me/api/portraits/${testimonial.gender}/${testimonial.id}.jpg`} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-green-900">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-green-600">
                  {testimonial.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>

      {/* Enhanced Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              bg-gradient-to-r 
              from-green-600 
              to-green-500 
              text-white 
              rounded-3xl 
              p-16 lg:p-20
              text-center 
              shadow-3xl 
              relative
              overflow-hidden
              max-w-5xl
              mx-auto
            "
          >
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_white_3px,_transparent_3px)] bg-[length:80px_80px]"></div>
            </div>
            
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl lg:text-6xl font-bold mb-8"
              >
                Ready to Transform Your Kitchen?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-2xl mb-12 max-w-3xl mx-auto text-green-100 leading-relaxed"
              >
                Join thousands of home cooks who are reducing food waste, saving money, and discovering new favorite recipes with our AI-powered culinary assistant.
              </motion.p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    bg-white 
                    text-green-600 
                    px-12 
                    py-5 
                    rounded-full 
                    font-bold 
                    shadow-2xl
                    hover:shadow-3xl
                    transition 
                    duration-300
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >
                  Get Started - It's Free!
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    bg-transparent
                    border-3
                    border-white
                    text-white
                    px-12
                    py-5
                    rounded-full
                    font-bold
                    shadow-xl
                    hover:bg-white/10
                    transition
                    duration-300
                    text-xl
                  "
                >
                  Watch Demo
                </motion.button>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap justify-center items-center gap-8 text-green-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                  <span>Setup in 2 minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                  <span>Cancel anytime</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;