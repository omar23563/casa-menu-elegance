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
    <div className="card-elegant rounded-xl p-6 hover:scale-[1.02] transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-semibold text-white">{dish.name}</h4>
        <div className="flex items-center gap-2">
          {!dish.available && (
            <Badge variant="destructive" className="text-xs">
              Unavailable
            </Badge>
          )}
          {isDiscounted && (
            <Badge className="bg-primary text-white text-xs">
              Sale
            </Badge>
          )}
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {dish.description || "Delicious dish from our menu"}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {isDiscounted && dish.price && (
            <span className="price-original text-sm">
              {dish.price.toFixed(3)} D.T
            </span>
          )}
          <span className={`font-semibold ${isDiscounted ? 'price-discount text-lg' : 'text-white'}`}>
            {Number(currentPrice).toFixed(3)} D.T
          </span>
        </div>
        
        <div className={`
          w-3 h-3 rounded-full 
          ${dish.available ? 'bg-green-500' : 'bg-red-500'}
        `} />
      </div>
    </div>
  );
};

export default DishCard;