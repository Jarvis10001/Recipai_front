import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ChefHat, 
  Sparkles,
  ArrowUp,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Recipes', href: '/recipes' },
        { name: 'AI Assistant', href: '/ai-assistant' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Press', href: '/press' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Community', href: '/community' },
        { name: 'FAQs', href: '/faqs' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-green-400/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-green-300/10 rounded-full animate-bounce"></div>
      <div className="absolute top-32 right-32 w-8 h-8 bg-green-500/10 rounded-full animate-pulse"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <div className="bg-gradient-to-r from-green-400 to-green-300 p-3 rounded-2xl shadow-lg">
                    <ChefHat className="w-6 h-6 text-green-900" />
                  </div>
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-300 rounded-full flex items-center justify-center"
                  >
                    <Sparkles size={10} className="text-green-900" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-100">
                    RecipAI
                  </h3>
                  <p className="text-green-300 text-sm">AI-Powered Cooking</p>
                </div>
              </motion.div>
              
              <p className="text-green-200 leading-relaxed max-w-sm text-base">
                Transform your cooking experience with AI-powered recipe generation. Reduce waste, save money, and discover delicious meals with ingredients you already have.
              </p>
              
              {/* Enhanced Contact Info */}
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center space-x-3 text-green-200 hover:text-green-100 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 bg-green-700/50 rounded-full flex items-center justify-center">
                    <Mail size={14} className="text-green-400" />
                  </div>
                  <span className="text-sm">support@recipai.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-green-200 hover:text-green-100 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 bg-green-700/50 rounded-full flex items-center justify-center">
                    <Phone size={14} className="text-green-400" />
                  </div>
                  <span className="text-sm">+1 (555) 123-4567</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 text-green-200 hover:text-green-100 transition-colors duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 bg-green-700/50 rounded-full flex items-center justify-center">
                    <MapPin size={14} className="text-green-400" />
                  </div>
                  <span className="text-sm">San Francisco, CA</span>
                </motion.div>
              </div>
              
              {/* Stats or achievements */}
              <div className="mt-6 pt-6 border-t border-green-700/30">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-300">50K+</div>
                    <div className="text-xs text-green-400">Happy Cooks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-300">100K+</div>
                    <div className="text-xs text-green-400">Recipes Generated</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-green-100 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="text-green-300 hover:text-green-100 transition-colors duration-300 text-sm hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Subscription */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 bg-gradient-to-r from-green-800/60 to-green-700/60 rounded-3xl border border-green-600/30 backdrop-blur-sm shadow-2xl"
          >
            <div className="text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center justify-center md:justify-start mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mr-3"
                  >
                    <Mail className="w-6 h-6 text-green-300" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-green-100">
                    Stay Updated with RecipAI
                  </h4>
                </div>
                <p className="text-green-300 text-lg">
                  Get the latest recipes, cooking tips, and AI features delivered to your inbox weekly.
                </p>
                <div className="flex items-center space-x-4 mt-3 justify-center md:justify-start">
                  <div className="flex items-center space-x-2 text-green-200 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Weekly recipes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-200 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Cooking tips</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-200 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>No spam</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:ml-8">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="px-5 py-4 rounded-xl bg-green-900/50 border-2 border-green-600/50 text-green-100 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 min-w-[280px] text-base"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-400 text-green-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                >
                  Subscribe Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-700/50 bg-green-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-green-300">
                <span className="text-sm">
                  &copy; {new Date().getFullYear()} RecipAI. Made with 
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={14} className="text-red-400 fill-current" />
                </motion.div>
                <span className="text-sm">for food lovers worldwide.</span>
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-6">
                <span className="text-green-300 text-sm hidden md:block">Follow us:</span>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: 'https://facebook.com/recipai', label: 'Facebook' },
                    { icon: Twitter, href: 'https://twitter.com/recipai', label: 'Twitter' },
                    { icon: Instagram, href: 'https://instagram.com/recipai', label: 'Instagram' },
                    { icon: Mail, href: 'mailto:support@recipai.com', label: 'Email' }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-green-800/50 rounded-full flex items-center justify-center text-green-300 hover:text-green-100 hover:bg-green-700/50 transition-all duration-300 border border-green-700/30"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Scroll to Top */}
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center text-green-900 shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
