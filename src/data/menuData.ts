export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  available: boolean;
  isDiscounted: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  image: string;
  dishes: Dish[];
}

export const menuCategories: Category[] = [
  {
    id: "hot-drinks",
    name: "Hot Drinks",
    nameAr: "المشروبات الساخنة",
    description: "Premium coffee and hot beverages",
    image: "/src/assets/category-hot-drinks.jpg",
    dishes: [
      {
        id: "espresso",
        name: "Classic Espresso",
        description: "Rich, bold Italian espresso with perfect crema",
        price: 8.500,
        available: true,
        isDiscounted: false
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        description: "Smooth espresso with steamed milk and foam art",
        price: 12.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "latte",
        name: "Café Latte",
        description: "Creamy espresso with steamed milk and vanilla notes",
        price: 14.000,
        originalPrice: 16.000,
        available: true,
        isDiscounted: true
      },
      {
        id: "mocha",
        name: "Chocolate Mocha",
        description: "Rich espresso with chocolate syrup and whipped cream",
        price: 16.500,
        available: true,
        isDiscounted: false
      },
      {
        id: "turkish-coffee",
        name: "Turkish Coffee",
        description: "Traditional Turkish coffee with authentic preparation",
        price: 10.000,
        available: false,
        isDiscounted: false
      }
    ]
  },
  {
    id: "cold-drinks",
    name: "Cold Drinks",
    nameAr: "المشروبات الباردة",
    description: "Refreshing iced beverages and smoothies",
    image: "/src/assets/category-cold-drinks.jpg",
    dishes: [
      {
        id: "iced-coffee",
        name: "Iced Coffee",
        description: "Cold brew coffee served over ice with milk",
        price: 13.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "frappuccino",
        name: "Caramel Frappuccino",
        description: "Blended iced coffee with caramel and whipped cream",
        price: 18.000,
        originalPrice: 20.000,
        available: true,
        isDiscounted: true
      },
      {
        id: "fresh-juice",
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice",
        price: 12.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "smoothie",
        name: "Berry Smoothie",
        description: "Mixed berries with yogurt and honey",
        price: 15.500,
        available: true,
        isDiscounted: false
      }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    nameAr: "الحلويات",
    description: "Decadent sweets and pastries",
    image: "/src/assets/category-desserts.jpg",
    dishes: [
      {
        id: "tiramisu",
        name: "Classic Tiramisu",
        description: "Italian coffee-flavored dessert with mascarpone",
        price: 22.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "chocolate-cake",
        name: "Chocolate Fondant",
        description: "Warm chocolate cake with molten center",
        price: 25.000,
        originalPrice: 28.000,
        available: true,
        isDiscounted: true
      },
      {
        id: "cheesecake",
        name: "New York Cheesecake",
        description: "Creamy cheesecake with berry compote",
        price: 20.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "baklava",
        name: "Honey Baklava",
        description: "Traditional Middle Eastern pastry with nuts and honey",
        price: 18.000,
        available: true,
        isDiscounted: false
      }
    ]
  },
  {
    id: "main-dishes",
    name: "Main Dishes",
    nameAr: "الأطباق الرئيسية",
    description: "Hearty meals and gourmet entrées",
    image: "/src/assets/category-main-dishes.jpg",
    dishes: [
      {
        id: "pasta-carbonara",
        name: "Pasta Carbonara",
        description: "Creamy pasta with bacon, eggs, and parmesan cheese",
        price: 32.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "grilled-salmon",
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with seasonal vegetables",
        price: 45.000,
        originalPrice: 50.000,
        available: true,
        isDiscounted: true
      },
      {
        id: "caesar-salad",
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with classic Caesar dressing",
        price: 24.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "risotto",
        name: "Mushroom Risotto",
        description: "Creamy Arborio rice with wild mushrooms and truffle oil",
        price: 38.000,
        available: true,
        isDiscounted: false
      }
    ]
  },
  {
    id: "breakfast",
    name: "Breakfast & Light Meals",
    nameAr: "الإفطار والوجبات الخفيفة",
    description: "Fresh morning delights and light bites",
    image: "/src/assets/category-breakfast.jpg",
    dishes: [
      {
        id: "croissant",
        name: "Butter Croissant",
        description: "Flaky, buttery French croissant",
        price: 8.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "avocado-toast",
        name: "Avocado Toast",
        description: "Smashed avocado on sourdough with poached egg",
        price: 22.000,
        originalPrice: 25.000,
        available: true,
        isDiscounted: true
      },
      {
        id: "pancakes",
        name: "Fluffy Pancakes",
        description: "Stack of pancakes with maple syrup and berries",
        price: 26.000,
        available: true,
        isDiscounted: false
      },
      {
        id: "breakfast-sandwich",
        name: "Breakfast Sandwich",
        description: "Egg, cheese, and bacon on fresh brioche",
        price: 18.000,
        available: true,
        isDiscounted: false
      }
    ]
  }
];