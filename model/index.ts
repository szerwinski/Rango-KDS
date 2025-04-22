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
  blockPrinting: boolean | null;
  optionsCategories: OptionsCategory[];
  menu_items_category: MenuItemCategory;
};

export interface Cashier {
  id: number;
  name: string;
  phoneNumber: string;
  cpf: string;
  active: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  restaurant: Restaurant;
  accessList: Access[];
}

export interface Restaurant {
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
  rating: number;
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
  daysDefaulter: string | null;
  menuUrl: string | null;
  owingSince: string | null;
  invoice: string | null;
  semaphore: boolean;
  conditionalNfe: boolean;
  random: boolean;
  commission: number;
  couvert: number;
  whatsAppInstanceId: string;
  address: Address;
  billing: Billing;
  legal: Legal;
  fiscal: Fiscal;
  timing: Timing[];
  contractedServices: ContractedService[];
  acquirer: Acquirer;
  tef: Tef;
}

export interface Address {
  id: number;
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  address: string;
  number: number;
  complement: string | null;
  latitude: string | null;
  longitude: string | null;
  cityCode: string;
}

export interface Billing {
  id: number;
  bank: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  bankCode: string | null;
}

export interface Legal {
  id: number;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  inscricaoEstadual: string;
  regimeTributario: string;
  crt: number;
}

export interface Fiscal {
  id: number;
  nNF: string;
  idCSC: string;
  CSCprod: string;
  CSChomolog: string;
  nNFInvoice: string;
  serie: string | null;
}

export interface Timing {
  id: number;
  weekDay: string;
  openingTime: string;
  closingTime: string;
}

export interface ContractedService {
  id: number;
  service: string;
}

export interface Acquirer {
  id: number;
  accountId: string;
  apiToken: string;
  apiSandboxToken: string;
  currentPlan: string;
  commission: AcquirerCommission[];
}

export interface AcquirerCommission {
  id: number;
  feePercent: number;
  commissionPlan: string;
}

export interface Tef {
  id: number;
  paramAdcConfigura: string;
  paramAdcInicializa: string;
  codigoLoja: string | null;
  terminais: TefTerminal[];
}

export interface TefTerminal {
  id: number;
  idTerminal: string;
}

export interface Access {
  id: number;
  access: string;
}

export interface TableSale {
  id: number;
  createdAt: string;
  updatedAt: string;
  data: OrderItem[];
  status: string;
  xml: string;
  payment: Payment;
  cashier: Cashier;
  table: Table;
}

export interface Table {
  id: number;
  isTable: boolean;
  name: string;
}

export interface OrderItem {
  id: number;
  menu_item: MenuItem;
  ifoodPrice: number;
  note: string;
  quantity: number;
  options: Option[];
  status: string;
}

export interface Payment {
  total: number;
  subtotal: number;
  discount: number;
  commission: number;
  couvert: number;
  package: number;
  paymentList: PaymentList[];
}

export interface PaymentList {
  id: number;
  subtotal: number;
  paymentMethod: string;
  cardBrand?: string;
}
