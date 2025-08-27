import { CategoryWithDishes } from "@/types/menu";
import hotDrinksDefault from "@/assets/category-hot-drinks.jpg";

interface CategoryCardProps {
  category: CategoryWithDishes;
  onClick: () => void;
  isActive: boolean;
}

const CategoryCard = ({ category, onClick, isActive }: CategoryCardProps) => {
  // Use category image_url from database or fallback to default
  const imageUrl = category.image_url || hotDrinksDefault;
  
  return (
    <div 
      onClick={onClick}
      className={`
        relative group cursor-pointer rounded-xl overflow-hidden
        transform transition-all duration-300 hover:scale-105
        ${isActive ? 'ring-2 ring-primary' : ''}
      `}
    >
      {/* Background Image */}
      <div 
        className="h-48 md:h-56 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mb-2">
          {category.name}
        </h3>
        <p className="text-white/80 text-sm md:text-base">
          {category.description || `Explore our ${category.name.toLowerCase()} selection`}
        </p>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Active Indicator */}
      {isActive && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full shadow-lg" />
      )}
    </div>
  );
};

export default CategoryCard;