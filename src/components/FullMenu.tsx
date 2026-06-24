import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FILTERS = [
  { id: 'all', label: 'All Items' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'pizza', label: 'Pizza & More' },
  { id: 'beverages', label: 'Drinks & Desserts' },
];

const MENU_CATEGORIES = [
  {
    id: "starters",
    title: "Starters & Small Plates",
    description: "Perfect bites to kick off your London food tour.",
    items: [
      { name: "Chicken Satay", price: "399", desc: "Skewered grilled chicken with creamy peanut dipping sauce" },
      { name: "Loaded Nachos", price: "449", desc: "Crispy tortilla chips with melted cheese, salsa, sour cream & jalapeños" },
      { name: "Cheese Fondue", price: "499", desc: "Rich melted cheese fondue served with bread & fresh veggies" },
      { name: "Garlic Bread", price: "249", desc: "Toasted bread with garlic butter, herbs & melted cheese" },
      { name: "Chicken Wings", price: "399", desc: "Crispy fried wings tossed in your choice of sauce" }
    ]
  },
  {
    id: "mains",
    title: "Mains & Global Bowls",
    description: "Hearty plates inspired by flavours from around the world.",
    items: [
      { name: "Gourmet Chicken Burger", price: "599", desc: "Grilled chicken patty with fresh greens, melted cheese & crispy fries" },
      { name: "Chicken Burrito Bowl", price: "549", desc: "Rice bowl with spiced chicken, beans, salsa, corn & guacamole" },
      { name: "Roasted Chicken in Mushroom Sauce", price: "649", desc: "Tender roasted chicken in rich, creamy mushroom sauce" },
      { name: "Butter Chicken", price: "499", desc: "Classic rich & creamy tomato gravy with tender chicken pieces" },
      { name: "Tandoori Chicken", price: "549", desc: "Whole chicken marinated in yoghurt & spices, grilled in tandoor" },
      { name: "Pasta Arrabiata", price: "449", desc: "Penne tossed in spicy tomato sauce with garlic & fresh herbs" }
    ]
  },
  {
    id: "pizza",
    title: "Pizza & More",
    description: "Wood-fired pizzas and comfort classics.",
    items: [
      { name: "Veggies Oomph Pizza", price: "549", desc: "Loaded with fresh seasonal vegetables & gooey mozzarella" },
      { name: "Chicken Pizza", price: "599", desc: "Topped with spiced chicken, bell peppers, onions & cheese" },
      { name: "French Fries", price: "199", desc: "Crispy golden fries seasoned with herbs — the perfect side" },
      { name: "Mojito", price: "249", desc: "Classic refreshing mint & lime cooler" }
    ]
  },
  {
    id: "beverages",
    title: "Drinks & Desserts",
    description: "Refreshing sips & sweet endings.",
    items: [
      { name: "Virgin Mojito", price: "249", desc: "Refreshing mint & lime with soda and a hint of sweetness" },
      { name: "Chocolate Brownie", price: "299", desc: "Warm fudgy brownie served with vanilla ice cream" },
      { name: "Ice Cream Sundae", price: "249", desc: "Layers of ice cream, chocolate sauce, nuts & whipped cream" },
      { name: "Cold Coffee", price: "199", desc: "Chilled blended coffee with milk & ice" }
    ]
  }
];

export function FullMenu() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = MENU_CATEGORIES.filter(cat => 
    activeFilter === 'all' || cat.id === activeFilter
  );

  return (
    <div className="bg-[#fcfbf9] w-full py-24 md:py-32 flex justify-center border-t border-neutral-100">
      <div className="w-[90%] md:w-[70%] max-w-5xl">
        
        <div className="text-center mb-10 md:mb-16 flex flex-col items-center">
           <span className="text-gold uppercase tracking-[0.25em] text-[11px] font-bold font-manrope">London Menu • Pune Prices</span>
           <h2 className="font-luxurious text-4xl md:text-[52px] text-black mt-3 mb-6">
             Full Menu
           </h2>
           <div className="w-16 h-[1px] bg-gold/50 mb-10" />

           <div className="flex flex-wrap justify-center gap-3">
             {FILTERS.map(filter => (
               <button
                 key={filter.id}
                 onClick={() => setActiveFilter(filter.id)}
                 className={`font-manrope text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                   activeFilter === filter.id 
                    ? 'bg-neutral-900 text-gold shadow-md' 
                    : 'bg-white text-neutral-500 border border-neutral-200 hover:border-gold/50 hover:text-neutral-900'
                 }`}
               >
                 {filter.label}
               </button>
             ))}
           </div>
        </div>

        <motion.div layout className="flex flex-col gap-20">
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div 
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-8 md:gap-16"
              >
                
                <div className="md:w-[35%] flex flex-col gap-2 shrink-0">
                  <motion.h3 layout className="font-luxurious text-2xl md:text-[28px] text-black">
                    {category.title}
                  </motion.h3>
                  <motion.p layout className="font-manrope text-sm text-neutral-500 leading-relaxed italic pr-4">
                    {category.description}
                  </motion.p>
                </div>

                <motion.div layout className="md:w-[65%] flex flex-col gap-8">
                  {category.items.map((item, itemIdx) => (
                    <motion.div key={itemIdx} layout className="flex flex-col">
                      <div className="flex justify-between items-baseline gap-4 w-full">
                        <h4 className="font-manrope font-bold text-[15px] text-neutral-900 tracking-wide uppercase">
                          {item.name}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative -top-1" />
                        {item.price && (
                          <span className="font-manrope font-bold text-[15px] text-gold shrink-0">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className="font-manrope text-[13px] text-neutral-500 mt-2 leading-relaxed max-w-[90%]">
                          {item.desc}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 pt-10 border-t border-neutral-200 text-center">
          <p className="font-manrope text-[10px] text-neutral-400 uppercase tracking-wider">
            ₹400–1,400 per person • Dine-in • Kerbside pickup • No-contact delivery • Reserve a table • Order online
          </p>
          <p className="font-manrope text-[11px] text-gold font-semibold mt-2">
            #11EastStreet • London in Pune 💂
          </p>
        </div>

      </div>
    </div>
  );
}
