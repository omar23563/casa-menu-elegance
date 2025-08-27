export interface Dish {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  discount_start: string | null;
  discount_end: string | null;
  available: boolean;
  category_id: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithDishes extends Category {
  dishes: Dish[];
}