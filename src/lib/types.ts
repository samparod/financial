export type Region = "gulf" | "algeria";
export type GulfCountry = "KSA" | "UAE" | "KW" | "QA" | "BH" | "OM";
export type Currency = "USD" | "DZD" | "SAR" | "AED" | "KWD" | "QAR" | "BHD" | "OMR";

export type TestStatus =
  | "not_tested"
  | "testing"
  | "winner"
  | "loser"
  | "hold";

export type ShipmentStatus =
  | "draft"
  | "ordered"
  | "production"
  | "shipped"
  | "customs"
  | "arrived"
  | "in_stock";

export type ReorderAdvice = "order_now" | "plan" | "ok" | "overstock";

export interface CountryProfile {
  id: GulfCountry;
  nameAr: string;
  currency: Currency;
  fxToUsd: number;
  deliveredMin: number;
  deliveredMax: number;
  transitMin: number;
  transitMax: number;
  shippingPerConfirmed: number;
  deliveryFee: number;
  returnFee: number;
  note: string;
}

export interface Fees {
  leadFee: number;
  confirmFee: number;
  extraPerConfirm: number;
  deliveredFee: number;
  codPercent: number;
}

export interface Settings {
  usdToDzd: number;
  algeriaConfirm: number;
  algeriaDelivered: number;
  algeriaDeliveryDzd: number;
  algeriaReturnDzd: number;
  algeriaCallCenterDzd: number;
  gulfFees: Fees;
  algeriaFeesUsd: Fees;
}

export interface PlProduct {
  id: string;
  region: Region;
  name: string;
  productCost: number;
  leads: number;
  orders: number;
  delivered: number;
  totalSales: number;
  adsSpend: number;
  testSpend: number;
  adAccount: number;
  bonus: number;
  currency: Currency;
}

export interface Operations {
  region: Region;
  salaries: number;
  vatDuty: number;
  rent: number;
  utilities: number;
  management: number;
  extra: number;
  currency: Currency;
}

export interface StabilityInput {
  quantity: number;
  testCost: number;
  costPct: number;
  confirmationRate: number;
  deliveredRate: number;
  sellingPriceLocal: number;
  altPriceLocal: number;
  productCost: number;
  fxToUsd: number;
}

export interface StockItem {
  id: string;
  region: Region;
  country?: GulfCountry | "DZ";
  name: string;
  sku: string;
  qty: number;
  dailySales: number;
  leadTimeDays: number;
  bufferDays: number;
  unitCostUsd: number;
  sellingPrice: number;
  currency: Currency;
  warehouse: string;
  updatedAt: string;
}

export interface CashEntry {
  id: string;
  region: Region;
  date: string;
  type: "in" | "out";
  category: string;
  label: string;
  amount: number;
  currency: Currency;
  note?: string;
}

export interface AlibabaShipment {
  id: string;
  productName: string;
  supplier: string;
  alibabaUrl: string;
  chinaPrice: number;
  weightKg: number;
  seaRatePerKg: number;
  qty: number;
  customsPct: number;
  otherFees: number;
  region: Region;
  destination: string;
  status: ShipmentStatus;
  orderDate: string;
  productionDays: number;
  transitDays: number;
  note: string;
}

export interface WinningProduct {
  id: string;
  name: string;
  niche: string;
  region: Region;
  status: TestStatus;
  chinaPrice: number;
  sellingPrice: number;
  weightKg: number;
  wow: number;
  problem: number;
  competition: number;
  perceivedValue: number;
  scalability: number;
  availability: number;
  alibabaUrl: string;
  notes: string;
  testedAt?: string;
}

export interface AppState {
  settings: Settings;
  plProducts: PlProduct[];
  operations: Operations[];
  stability: Record<Region, StabilityInput>;
  stock: StockItem[];
  cash: CashEntry[];
  shipments: AlibabaShipment[];
  winners: WinningProduct[];
}
