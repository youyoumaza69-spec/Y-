export type CategoryId = 
  | 'all'
  | 'pizzas'
  | 'tacos'
  | 'roules'
  | 'burgers'
  | 'assiettes'
  | 'gratinages'
  | 'texmex'
  | 'pizzas_promos'
  | 'desserts'
  | 'enfants';

export interface PizzaSizeOption {
  id: 'senior' | 'familiale' | 'geante';
  name: string;
  size: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  priceSeul: number;
  priceMenu?: number;
  image: string;
  tags?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  options?: {
    meatsCount?: number;
    allowGratinage?: boolean;
    meatChoices?: string[];
    sauceChoices?: string[];
    pizzaSizes?: PizzaSizeOption[];
  };
}

export interface SelectedItemOption {
  type: 'seul' | 'menu';
  selectedPizzaSize?: PizzaSizeOption;
  selectedMeats: string[];
  selectedSauces: string[];
  gratinageOption?: string; // e.g., 'Chèvre Miel'
  extraCheese?: boolean;
  extraEgg?: boolean;
  extraMeat?: boolean;
  selectedDrink?: string;
  specialInstructions?: string;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  option: SelectedItemOption;
  unitPrice: number;
  quantity: number;
}

export interface DaySchedule {
  dayName: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ...
  openTime: string; // e.g. "11:30"
  closeTime: string; // e.g. "22:30"
  isClosed?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}
