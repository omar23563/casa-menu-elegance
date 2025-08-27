import { useState, useMemo } from "react";
import { Search, Filter, X, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CategoryCard from "./CategoryCard";
import DishCard from "./DishCard";
import { useMenuData } from "@/hooks/useMenuData";
import { CategoryWithDishes, Dish } from "@/types/menu";

type FilterType = 'all' | 'available' | 'discounted';

const MenuSection = () => {
  const { categories, loading, error, refetch } = useMenuData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const selectedCategoryData = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)
    : null;

  const filteredDishes = useMemo(() => {
    if (!selectedCategoryData) return [];
    
    let dishes = selectedCategoryData.dishes;
    
    // Apply search filter
    if (searchTerm) {
      dishes = dishes.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dish.description && dish.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply availability/discount filter
    switch (filter) {
      case 'available':
        dishes = dishes.filter(dish => dish.available);
        break;
      case 'discounted':
        dishes = dishes.filter(dish => {
          return dish.discount_price && 
            dish.discount_start && 
            dish.discount_end &&
            new Date() >= new Date(dish.discount_start) && 
            new Date() <= new Date(dish.discount_end);
        });
        break;
      default:
        break;
    }
    
    return dishes;
  }, [selectedCategoryData, searchTerm, filter]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchTerm("");
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm("");
    setFilter('all');
  };

  // Show loading state
  if (loading) {
    return (
      <section id="menu-section" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Menu
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Loading our carefully curated menu...
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading menu...</span>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="menu-section" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Menu
            </h2>
          </div>
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refetch}
                className="ml-2"
              >
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  // Show empty state if no categories
  if (categories.length === 0) {
    return (
      <section id="menu-section" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Our Menu
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our menu is being prepared. Please check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu-section" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of premium coffee, delicious food, and exquisite desserts
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 animate-slide-in-right">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dishes or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'available' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('available')}
              >
                Available
              </Button>
              <Button
                variant={filter === 'discounted' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('discounted')}
              >
                Discounted
              </Button>
            </div>
          </div>
        </div>

        {/* Category View */}
        {!selectedCategory && (
          <div className="animate-fade-in-up">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategorySelect(category.id)}
                  isActive={false}
                />
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((category) => (
                  <div key={category.id} className="flex-shrink-0 w-80">
                    <CategoryCard
                      category={category}
                      onClick={() => handleCategorySelect(category.id)}
                      isActive={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dishes View */}
        {selectedCategory && selectedCategoryData && (
          <div className="animate-fade-in-up">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <Button 
                variant="outline" 
                onClick={handleBackToCategories}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Back to Categories
              </Button>
              <div>
                <h3 className="text-2xl font-heading font-semibold text-white">
                  {selectedCategoryData.name}
                </h3>
                <p className="text-muted-foreground">
                  {selectedCategoryData.description}
                </p>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary">
                {filteredDishes.length} dishes found
              </Badge>
              {searchTerm && (
                <Badge variant="outline">
                  Searching: "{searchTerm}"
                </Badge>
              )}
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>

            {/* No Results */}
            {filteredDishes.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  No dishes found matching your criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilter('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;