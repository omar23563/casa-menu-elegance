import { Dish } from "@/types/menu";
import { Badge } from "@/components/ui/badge";

interface DishCardProps {
  dish: Dish;
}

const DishCard = ({ dish }: DishCardProps) => {
  // Check if dish is currently discounted
  const isDiscounted = dish.discount_price && 
    dish.discount_start && 
    dish.discount_end &&
    new Date() >= new Date(dish.discount_start) && 
    new Date() <= new Date(dish.discount_end);

  const currentPrice = isDiscounted ? dish.discount_price : dish.price;
  
  return (
    <div className="dish-card rounded-xl p-6 min-w-[300px] max-w-[320px] flex-shrink-0">
      {/* Header with name and badges */}
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-heading font-bold text-white leading-tight flex-1 mr-3">
          {dish.name}
        </h4>
        <div className="flex flex-col gap-1">
          {!dish.available && (
            <Badge variant="destructive" className="text-xs">
              Unavailable
            </Badge>
          )}
          {isDiscounted && (
            <Badge className="bg-brand-orange text-white text-xs">
              Sale
            </Badge>
          )}
        </div>
      </div>
      
      {/* Scrollable Description */}
      <div className="scrollable-description mb-5">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {dish.description || "A carefully crafted dish from our premium menu selection"}
        </p>
      </div>
      
      {/* Price and availability section */}
      <div className="flex justify-between items-end pt-3 border-t border-white/10">
        <div className="flex flex-col gap-1">
          {isDiscounted && dish.price && (
            <span className="price-original text-xs">
              {dish.price.toFixed(3)} D.T
            </span>
          )}
          <span className={`font-bold ${isDiscounted ? 'price-discount text-xl' : 'price-highlight'}`}>
            {Number(currentPrice).toFixed(3)} D.T
          </span>
        </div>
        
        {/* Availability indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {dish.available ? 'Available' : 'Sold Out'}
          </span>
          <div className={`
            w-3 h-3 rounded-full 
            ${dish.available ? 'bg-brand-green shadow-sm' : 'bg-destructive'}
          `} />
        </div>
      </div>
    </div>
  );
};

export default DishCard;