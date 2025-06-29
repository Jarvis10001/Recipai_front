import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChefHat, Users, Calendar, BookOpen, Sparkles } from 'lucide-react';
import logo from "/src/assets/logo.png";

const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: <ChefHat size={18} /> },
    { name: 'Recipes', href: '/recipes', icon: <BookOpen size={18} /> },
    // { name: 'Calorie Tracker', href: '/tracker', icon: <Calendar size={18} /> },
    { name: 'Community', href: '/community', icon: <Users size={18} /> }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/90 shadow-xl backdrop-blur-xl border-b border-green-100' 
          : 'bg-transparent'
      }`}
    >      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <motion.div   
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {/* <img 
              src={logo} 
              alt="RecipAI Logo" 
              className="w-8 h-8 rounded-full border border-green-200 shadow-md" 
            /> */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [0, 0, 0],

                // scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full flex items-center justify-center"
            >
              <Sparkles size={8} className="text-white" />
            </motion.div>
          </motion.div>
          <div>
            <motion.span 
              className={`text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400 tracking-tight ${
                isScrolled ? 'text-green-700' : 'text-green-600'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              RecipAI
            </motion.span>
            <p className={`text-xs font-medium ${
              isScrolled ? 'text-green-600' : 'text-green-500'
            }`}>
              AI-Powered Cooking
            </p>
          </div>
        </motion.div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >              <Link
                to={item.href}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  isScrolled 
                    ? 'text-green-700 hover:text-green-900 hover:bg-green-50' 
                    : 'text-green-600 hover:text-green-800 hover:bg-white/20'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-1.5"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-3">          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'text-green-700 border border-green-200 hover:bg-green-50'
                  : 'text-green-600 border border-green-300 hover:bg-white/10'
              }`}
            >
              Login
            </motion.button>
          </Link>

          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 text-sm bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'text-green-700 hover:bg-green-50' 
                : 'text-green-600 hover:bg-white/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-green-100 shadow-lg"
          >            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2.5 px-3 py-2.5 text-green-700 hover:text-green-900 hover:bg-green-50 rounded-lg transition-all duration-300"
                  >
                    {item.icon}
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-3 border-t border-green-100 space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2.5 text-sm text-green-700 border border-green-200 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
                
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2.5 text-sm bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar2;
