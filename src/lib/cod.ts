import type {
  AlibabaShipment,
  CountryProfile,
  Fees,
  Operations,
  PlProduct,
  PricingRules,
  ReorderAdvice,
  Settings,
  StabilityInput,
  StockEventKey,
  StockItem,
} from "./types";

export const GULF_COUNTRIES: CountryProfile[] = [
  {
    id: "KSA",
    nameAr: "السعودية",
    currency: "SAR",
    fxToUsd: 3.75,
    deliveredMin: 0.4,
    deliveredMax: 0.6,
    transitMin: 2,
    transitMax: 10,
    shippingPerConfirmed: 8,
    deliveryFee: 4.99,
    returnFee: 2.99,
    note: "قابل للتوسع فوق 200 طلب · اختبار سعر منفصل",
  },
  {
    id: "UAE",
    nameAr: "الإمارات",
    currency: "AED",
    fxToUsd: 3.67,
    deliveredMin: 0.55,
    deliveredMax: 0.7,
    transitMin: 2,
    transitMax: 5,
    shippingPerConfirmed: 6,
    deliveryFee: 5.99,
    returnFee: 4.99,
    note: "موصى به دائماً",
  },
  {
    id: "KW",
    nameAr: "الكويت",
    currency: "KWD",
    fxToUsd: 0.31,
    deliveredMin: 0.6,
    deliveredMax: 0.7,
    transitMin: 2,
    transitMax: 5,
    shippingPerConfirmed: 7,
    deliveryFee: 6.99,
    returnFee: 5.99,
    note: "موصى به دائماً",
  },
  {
    id: "QA",
    nameAr: "قطر",
    currency: "QAR",
    fxToUsd: 3.64,
    deliveredMin: 0.55,
    deliveredMax: 0.7,
    transitMin: 2,
    transitMax: 6,
    shippingPerConfirmed: 7,
    deliveryFee: 6.99,
    returnFee: 5.99,
    note: "تأكيد مرتفع · سوق صغير لكن قوي",
  },
  {
    id: "BH",
    nameAr: "البحرين",
    currency: "BHD",
    fxToUsd: 0.377,
    deliveredMin: 0.6,
    deliveredMax: 0.8,
    transitMin: 2,
    transitMax: 4,
    shippingPerConfirmed: 6,
    deliveryFee: 5.5,
    returnFee: 4.5,
    note: "موصى به دائماً",
  },
  {
    id: "OM",
    nameAr: "عُمان",
    currency: "OMR",
    fxToUsd: 0.385,
    deliveredMin: 0.55,
    deliveredMax: 0.65,
    transitMin: 2,
    transitMax: 5,
    shippingPerConfirmed: 7,
    deliveryFee: 6,
    returnFee: 5,
    note: "موصى به دائماً",
  },
];

export const DEFAULT_GULF_FEES: Fees = {
  leadFee: 0.5,
  confirmFee: 1,
  extraPerConfirm: 3.99,
  deliveredFee: 2,
  codPercent: 0.05,
};

export function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function realAdCost(testCost: number, costPct: number) {
  return testCost * (1 + costPct);
}

/** ورقة Stock Managments — Cost of Service من رسوم الإعدادات لا أرقام ثابتة */
export function calcStability(input: StabilityInput, fees: Fees = DEFAULT_GULF_FEES) {
  const q = input.quantity;
  const cr = input.confirmationRate;
  const dr = input.deliveredRate;
  const real = realAdCost(input.testCost, input.costPct);
  const delivered = q * cr * dr;
  const ads = q * real;
  const product = delivered * input.productCost;
  const priceUsd = input.fxToUsd > 0 ? input.sellingPriceLocal / input.fxToUsd : input.sellingPriceLocal;
  const altUsd = input.fxToUsd > 0 ? input.altPriceLocal / input.fxToUsd : input.altPriceLocal;
  const orders = q * cr;

  const scenario = (price: number) => {
    const sales = delivered * price;
    const service = costOfService(q, orders, delivered, sales, fees).total;
    const profit = sales - service - product - ads;
    const epd = delivered > 0 ? profit / delivered : 0;
    return {
      sales: round2(sales),
      service: round2(service),
      product: round2(product),
      ads: round2(ads),
      profit: round2(profit),
      epd: round2(epd),
      delivered: round2(delivered),
      priceUsd: round2(price),
    };
  };

  const oldP = scenario(priceUsd);
  const newP = scenario(altUsd);
  const breakevenDr = findBreakevenDelivered(input, priceUsd, fees);
  const stable = oldP.epd >= 8 && oldP.profit > 0 && input.deliveredRate >= 0.35;
  const competitive = newP.epd >= 5 && newP.profit > 0;

  return {
    realCost: round2(real),
    delivered,
    oldP,
    newP,
    breakevenDr: round2(breakevenDr),
    stable,
    competitive,
    status: stable ? "stability" : oldP.profit > 0 ? "fragile" : "loss",
  };
}

function findBreakevenDelivered(input: StabilityInput, priceUsd: number, fees: Fees) {
  for (let dr = 0.05; dr <= 1; dr += 0.01) {
    const clone = { ...input, deliveredRate: dr };
    const q = clone.quantity;
    const cr = clone.confirmationRate;
    const real = realAdCost(clone.testCost, clone.costPct);
    const delivered = q * cr * dr;
    const sales = delivered * priceUsd;
    const service = costOfService(q, q * cr, delivered, sales, fees).total;
    const profit = sales - service - delivered * clone.productCost - q * real;
    if (profit >= 0) return dr;
  }
  return 1;
}

export interface SimInput {
  leads: number;
  productCost: number;
  confirmationRate: number;
  deliveredRate: number;
  cpl: number;
  aov: number;
  shippingPerConfirmed: number;
  fees: Fees;
}

/** ورقة Simulation / S-KSA */
export function calcGulfSim(s: SimInput) {
  const confirmed = s.leads * s.confirmationRate;
  const delivered = s.leads * s.confirmationRate * s.deliveredRate;
  const sales = delivered * s.aov;
  const shipping = confirmed * s.shippingPerConfirmed;
  const callCenter =
    s.leads * s.fees.leadFee +
    confirmed * s.fees.confirmFee +
    delivered * s.fees.deliveredFee;
  const extra = confirmed * s.fees.extraPerConfirm;
  const cod = sales * s.fees.codPercent;
  const ads = s.leads * s.cpl;
  const productSold = delivered * s.productCost;
  const service = shipping + callCenter + extra + cod;
  const profit = sales - service - ads - productSold;
  const invest = ads + productSold;
  const epd = delivered > 0 ? profit / delivered : 0;
  const roi = invest > 0 ? profit / invest : 0;
  const margin = sales > 0 ? profit / sales : 0;
  return {
    confirmed: round2(confirmed),
    delivered: round2(delivered),
    sales: round2(sales),
    shipping: round2(shipping),
    callCenter: round2(callCenter + extra),
    cod: round2(cod),
    ads: round2(ads),
    productSold: round2(productSold),
    service: round2(service),
    profit: round2(profit),
    invest: round2(invest),
    epd: round2(epd),
    roi: round2(roi),
    margin: round2(margin),
  };
}

/** Algeria simulator — not Gulf: local DZD logistics + sheet Cost of Service (algeriaFeesUsd). */
export interface AlgeriaSimInput {
  leads: number;
  productCostDzd: number;
  sellPriceDzd: number;
  confirmationRate: number;
  deliveredRate: number;
  cplUsd: number;
  fxToDzd: number;
  deliveryDzd: number;
  returnDzd: number;
  callCenterDzdPerConfirm: number;
  fees: Fees;
}

export function calcAlgeriaSim(s: AlgeriaSimInput) {
  const fx = Math.max(s.fxToDzd, 1);
  const dzdToUsd = (dzd: number) => dzd / fx;
  const confirmed = s.leads * s.confirmationRate;
  const delivered = confirmed * s.deliveredRate;
  const sales = delivered * dzdToUsd(s.sellPriceDzd);
  const productSold = delivered * dzdToUsd(s.productCostDzd);
  const ads = s.leads * s.cplUsd;

  const localShipping =
    (delivered * s.deliveryDzd + (confirmed - delivered) * s.returnDzd) / fx;

  const feesWithCc: Fees = {
    ...s.fees,
    confirmFee: s.fees.confirmFee + dzdToUsd(s.callCenterDzdPerConfirm),
  };
  const cos = costOfService(s.leads, confirmed, delivered, sales, feesWithCc);
  const platformOps = cos.lead + cos.confirm + cos.delivered + cos.extra;
  const service = localShipping + cos.total;
  const profit = sales - service - ads - productSold;
  const invest = ads + productSold;
  const epd = delivered > 0 ? profit / delivered : 0;
  const roi = invest > 0 ? profit / invest : 0;
  const margin = sales > 0 ? profit / sales : 0;

  return {
    confirmed: round2(confirmed),
    delivered: round2(delivered),
    sales: round2(sales),
    shipping: round2(localShipping),
    callCenter: round2(platformOps),
    cod: cos.cod,
    ads: round2(ads),
    productSold: round2(productSold),
    service: round2(service),
    cos,
    profit: round2(profit),
    invest: round2(invest),
    epd: round2(epd),
    roi: round2(roi),
    margin: round2(margin),
  };
}

/** Excel: Lead×0.5 + Order×1 + Delivered×2 + Order×3.99 + Sales×5% */
export function costOfService(
  leads: number,
  orders: number,
  delivered: number,
  sales: number,
  fees: Fees
) {
  const lead = leads * fees.leadFee;
  const confirm = orders * fees.confirmFee;
  const extra = orders * fees.extraPerConfirm;
  const deliv = delivered * fees.deliveredFee;
  const cod = sales * fees.codPercent;
  return {
    lead: round2(lead),
    confirm: round2(confirm),
    extra: round2(extra),
    delivered: round2(deliv),
    cod: round2(cod),
    total: round2(lead + confirm + extra + deliv + cod),
  };
}

/** COD collected for the P&L row (manual totalSales or unit price × delivered). */
export function plCollectedSales(p: PlProduct) {
  const unit = p.sellPricePerDelivered ?? 0;
  if (unit > 0 && p.delivered > 0) return round2(unit * p.delivered);
  return p.totalSales;
}

/** Algeria sheet amounts are entered in DZD; Gulf in USD. */
export function plSalesUsd(p: PlProduct, fxToDzd: number, sheetInDzd = false) {
  return round2(plMoneyToUsd(plCollectedSales(p), fxToDzd, sheetInDzd));
}

export function stockValueAtCost(item: StockItem) {
  return round2(Math.max(0, item.qty) * Math.max(0, item.unitCostUsd));
}

/** Weighted-average unit cost when a new shipment lands on an existing SKU. */
export function weightedUnitCost(oldQty: number, oldUnit: number, addQty: number, addUnit: number) {
  const q0 = Math.max(0, oldQty);
  const q1 = Math.max(0, addQty);
  const total = q0 + q1;
  if (total <= 0) return round2(Math.max(0, addUnit));
  return round2((Math.max(0, oldUnit) * q0 + Math.max(0, addUnit) * q1) / total);
}

/** P&L linked stock: same unit cost as the sheet row (DZD on Algeria tab), not inventory page USD. */
export function plLinkedStockValueUsd(
  p: PlProduct,
  item: StockItem | undefined,
  fxToDzd: number,
  sheetInDzd: boolean
) {
  if (!item) return 0;
  const qty = Math.max(0, item.qty);
  const unit = Math.max(0, p.productCost);
  if (sheetInDzd && fxToDzd > 0) return round2((qty * unit) / fxToDzd);
  return round2(qty * unit);
}

function plMoneyToUsd(n: number, fxToDzd: number, sheetInDzd: boolean) {
  return sheetInDzd && fxToDzd > 0 ? n / fxToDzd : n;
}

export function calcPl(p: PlProduct, fees: Fees, fxToDzd = 0, sheetInDzd = false) {
  const dzd = (n: number) => plMoneyToUsd(n, fxToDzd, sheetInDzd);
  const salesLocal = plCollectedSales(p);
  const sales = dzd(salesLocal);
  const product = dzd(p.productCost) * p.delivered;
  const cos = costOfService(p.leads, p.orders, p.delivered, sales, fees);
  const service = cos.total;
  // Algeria sheet: sales & product cost in DZD; ads / test / ad account always USD (like the Excel sheet).
  const totalCost =
    p.adsSpend +
    p.testSpend +
    p.adAccount +
    product +
    service +
    dzd(p.bonus);
  const profit = sales - totalCost;
  const epo = p.orders > 0 ? profit / p.orders : 0;
  const epd = p.delivered > 0 ? profit / p.delivered : 0;
  const confirmRate = p.leads > 0 ? p.orders / p.leads : 0;
  const deliveredRate = p.orders > 0 ? p.delivered / p.orders : 0;
  return {
    product: round2(product),
    service: round2(service),
    cos,
    totalCost: round2(totalCost),
    profit: round2(profit),
    epo: round2(epo),
    epd: round2(epd),
    confirmRate,
    deliveredRate,
    adsPerOrder: p.orders > 0 ? round2(p.adsSpend / p.orders) : 0,
    testPerOrder: p.orders > 0 ? round2(p.testSpend / p.orders) : 0,
    adAccPerOrder: p.orders > 0 ? round2(p.adAccount / p.orders) : 0,
    productPerOrder: p.orders > 0 ? round2(product / p.orders) : 0,
    servicePerOrder: p.orders > 0 ? round2(service / p.orders) : 0,
  };
}

export function opsTotal(o: Operations) {
  return o.salaries + o.vatDuty + o.rent + o.utilities + o.management + o.extra;
}

export function stockPath(item: StockItem) {
  const daily = Math.max(item.dailySales, 0.0001);
  const daysLeft = item.qty / daily;
  const stockZeroDay = Math.max(1, Math.ceil(daysLeft));
  const needFor30 = daily * 30;
  const cover30 = item.qty - needFor30;
  const orderByDay = Math.floor(daysLeft - item.leadTimeDays - item.bufferDays);
  const arrivalIfOrderToday = item.leadTimeDays;
  let advice: ReorderAdvice = "ok";
  if (item.qty <= 0) advice = "order_now";
  else if (daysLeft <= item.leadTimeDays + item.bufferDays) advice = "order_now";
  else if (daysLeft <= item.leadTimeDays + item.bufferDays + 7) advice = "plan";
  else if (daysLeft > 60 && item.qty > needFor30 * 1.8) advice = "overstock";
  // The horizon stretches far enough to show every marked event, but stays
  // within 32..90 days so the timeline keeps a readable density.
  const lastEventDay = Math.max(stockZeroDay, arrivalIfOrderToday + 1, orderByDay);
  const horizon = Math.min(90, Math.max(32, lastEventDay + 4));
  const days: { day: number; remaining: number; event?: StockEventKey }[] = [];
  for (let d = 1; d <= horizon; d++) {
    const remaining = Math.max(0, round2(item.qty - daily * d));
    let event: StockEventKey | undefined;
    if (d === 1) event = "road.evToday";
    if (d === stockZeroDay) event = "road.evZero";
    if (d === Math.max(1, orderByDay) && advice !== "ok") event = event || "road.evOrderLast";
    if (d === arrivalIfOrderToday + 1) event = event || "road.evArrive";
    days.push({ day: d, remaining, event });
  }
  return {
    daysLeft: round2(daysLeft),
    stockZeroDay,
    needFor30: round2(needFor30),
    cover30: round2(cover30),
    orderByDay,
    advice,
    horizon,
    days,
  };
}

/** سعر علي بابا الواصل: الصين + الوزن × سعر الشحن (الورقة: G13+(G14*9)) */
export function landedCost(s: AlibabaShipment) {
  const shipping = s.weightKg * s.seaRatePerKg * s.qty;
  const goods = s.chinaPrice * s.qty;
  const customs = (goods + shipping) * s.customsPct;
  const total = goods + shipping + customs + s.otherFees;
  const perUnit = s.qty > 0 ? total / s.qty : 0;
  const eta = addDays(s.orderDate, s.productionDays + s.transitDays);
  return {
    goods: round2(goods),
    shipping: round2(shipping),
    customs: round2(customs),
    total: round2(total),
    perUnit: round2(perUnit),
    eta,
  };
}

export function addDays(iso: string, days: number) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const DEFAULT_PRICING: PricingRules = {
  shippingBaseUsd: 11,
  callCenterUsd: 3.5,
  adsPerDeliveredMultiple: 3,
  codPercent: 0.05,
  targetProfitUsd: 20,
};

/**
 * Fills sub-objects that older saved states never had, without touching values
 * the user already set. Persisted settings replace the defaults wholesale, so a
 * missing key would otherwise read as undefined and break every price.
 */
export function migrateSettings(saved: Partial<Settings> | undefined, base: Settings): Settings {
  return {
    ...base,
    ...saved,
    gulfFees: { ...base.gulfFees, ...saved?.gulfFees },
    algeriaFeesUsd: { ...base.algeriaFeesUsd, ...saved?.algeriaFeesUsd },
    pricing: { ...DEFAULT_PRICING, ...saved?.pricing },
  };
}

export function sellingPriceUsd(
  productCost: number,
  deliveredRate: number,
  cpl: number,
  profit?: number,
  rules: PricingRules = DEFAULT_PRICING
) {
  const shipping = rules.shippingBaseUsd * (1 / Math.max(deliveredRate, 0.2));
  const adsPerDelivered = cpl * rules.adsPerDeliveredMultiple;
  const target = profit ?? rules.targetProfitUsd;
  const sub = productCost + shipping + rules.callCenterUsd + adsPerDelivered + target;
  const price = sub / (1 - rules.codPercent);
  return round2(price);
}

export function algeriaDual(amountUsd: number, usdToDzd: number) {
  return { usd: round2(amountUsd), dzd: round2(amountUsd * usdToDzd) };
}
