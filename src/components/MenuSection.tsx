import { useState, useMemo } from "react";
import { Search, AlertCircle, Loader2 } from "lucide-react";
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterType>('all');

  // Filter categories and dishes based on search term
  const filteredCategories = useMemo(() => {
    return categories.map(category => {
      let dishes = category.dishes;
      
      // Apply search filter
      if (searchTerm) {
        dishes = dishes.filter(dish => 
          dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (dish.description && dish.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      
      return {
        ...category,
        dishes,
        originalDishCount: category.dishes.length
      };
    }).filter(category => 
      // Show category if it has dishes after filtering or matches search
      category.dishes.length > 0 || 
      (!searchTerm || category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [categories, searchTerm, filter]);

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
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

        {/* Accordion-style Categories */}
        <div className="animate-fade-in-up space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="w-full">
              {/* Category Card */}
              <CategoryCard
                category={category}
                onClick={() => handleCategoryToggle(category.id)}
                isExpanded={expandedCategories.has(category.id)}
              />
              
              {/* Expanded Dishes */}
              {expandedCategories.has(category.id) && category.dishes.length > 0 && (
                <div className="mt-6 animate-expand">
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {category.dishes.map((dish) => (
                      <DishCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* No dishes message when expanded but filtered out */}
              {expandedCategories.has(category.id) && category.dishes.length === 0 && (
                <div className="mt-6 p-6 text-center bg-card rounded-lg border border-border">
                  <p className="text-muted-foreground">
                    No dishes match your current filters in this category
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setFilter('all');
                    }}
                    className="mt-3"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          {/* No results message */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                No categories or dishes found matching your search
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilter('all');
                }}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;