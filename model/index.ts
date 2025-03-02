export type MenuItemCategory = {
  id: number;
  name: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  rewardEnabled: boolean | null;
  rewardPrize: number | null;
  largeImageUrl: string | null;
  menu_items: MenuItem[]; // You might want to replace 'any[]' with the correct export type if you have more information about the structure.
};

export type Timing = {
  id: number;
  weekDay: string;
  openingTime: string;
  closingTime: string;
};

export type MenuCategory = {
  id: number;
  name: string;
  index: number;
  createdAt: string;
  updatedAt: string;
  rewardEnabled: boolean | null;
  rewardPrize: number | null;
  largeImageUrl: string | null;
  menu_items: MenuItem[];
};

export type Restaurant = {
  id: number;
  name: string;
  phoneNumber: string;
  estimatedDeliveryTime: string;
  largeImageUrl: string;
  thumbnailImageUrl: string;
  coverLargeImageUrl: string;
  coverThumbnailImageUrl: string;
  minimumOrderValue: number;
  category: string;
  status: string;
  rating: number | null;
  createdAt: string;
  updatedAt: string;
  pendingOrdersLimit: number;
  scheduleAvailable: boolean;
  isOpen: boolean;
  autoPrinting: boolean;
  allowPromotion: boolean;
  packagePrice: number;
  autoAccept: boolean;
  rewardEnabled: boolean;
  rewardStreak: number;
  daysDefaulter: null;
  menuUrl: string;
  timing: Timing[];
  menu_items_categories: MenuCategory[];
};

export type Option = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  status?: boolean;
  thumbnailImageUrl?: any;
  largeImageUrl?: any;
  quantity?: number;
};


export type OptionsCategory = {
  id: number;
  categoryName: string;
  index: number;
  isOptional: boolean;
  minOptions: number;
  maxOptions: number;
  options: Option[]; // Replace 'any[]' with the correct export type if you have more information about the structure.
};

export type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  largeImageUrl: string | null;
  thumbnailImageUrl: string | null;
  price: number;
  status: boolean;
  onSale: boolean;
  promotionalPrice: number;
  generic: boolean;
  createdAt: string;
  updatedAt: string;
  index: number | null;
  icon: string | null;
  promotionalType: string | null;
  isScheduled: boolean | null;
  code: string | null;
  stock: number | null;
  costPrice: number | null;
  unit: string | null;
  byWeight: boolean | null;
  ncm: string | null;
  optionsCategories: OptionsCategory[];
  menu_items_category: MenuItemCategory;
};