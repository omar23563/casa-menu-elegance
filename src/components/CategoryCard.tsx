import { CategoryWithDishes } from "@/types/menu";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import hotDrinksDefault from "@/assets/category-hot-drinks.jpg";

interface CategoryCardProps {
  category: CategoryWithDishes;
  onClick: () => void;
  isExpanded: boolean;
}

const CategoryCard = ({ category, onClick, isExpanded }: CategoryCardProps) => {
  // Use category image_url from database or fallback to default
  const imageUrl = category.image_url || hotDrinksDefault;
  const dishCount = category.dishes.length;
  
  return (
    <div 
      onClick={onClick}
      className="category-card rounded-xl overflow-hidden cursor-pointer group"
    >
      <div className="relative">
        {/* Background Image */}
        <div 
          className="h-40 md:h-48 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        
        {/* Dish Count Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="badge-count text-xs px-3 py-1 rounded-full">
            {dishCount} Items
          </Badge>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div className="flex-1 mr-4">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2 leading-tight">
                {category.name}
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                {category.description || `Explore our premium ${category.name.toLowerCase()} selection`}
              </p>
            </div>
            
            {/* Expand/Collapse Arrow */}
            <div className="flex-shrink-0">
              <ChevronDown 
                className={`
                  w-6 h-6 text-brand-gold transition-transform duration-300
                  ${isExpanded ? 'rotate-180' : ''}
                `}
              />
            </div>
          </div>
        </div>
        
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Expanded Indicator */}
        {isExpanded && (
          <div className="absolute top-4 left-4">
            <div className="w-3 h-3 bg-brand-gold rounded-full shadow-lg animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;