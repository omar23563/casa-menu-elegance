import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Category, Dish, CategoryWithDishes } from "@/types/menu";

export const useMenuData = () => {
  const [categories, setCategories] = useState<CategoryWithDishes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('order_index', { ascending: true });

      if (categoriesError) throw categoriesError;

      // Fetch dishes
      const { data: dishesData, error: dishesError } = await supabase
        .from('dishes')
        .select('*')
        .order('order_index', { ascending: true });

      if (dishesError) throw dishesError;

      // Combine categories with their dishes
      const categoriesWithDishes: CategoryWithDishes[] = (categoriesData || []).map(category => ({
        ...category,
        dishes: (dishesData || []).filter(dish => dish.category_id === category.id)
      }));

      setCategories(categoriesWithDishes);
    } catch (err) {
      console.error('Error fetching menu data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch menu data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchMenuData();
  };

  return {
    categories,
    loading,
    error,
    refetch
  };
};