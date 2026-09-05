import type { HelpBundle } from "./help-types";

export const opsHelp: HelpBundle = {
  ar: {
    "inv.page": {
      title: "دفتر المخزن",
      meaning:
        "هذا دفتر المستودع: شحال قطعة عندك، شحال تخرج في اليوم، ومتى لازم تعاود تطلب من الصين قبل ما يفرغ الرف.",
      example:
        "كريم وجه: 80 قطعة على الرف. يخرج 10 في اليوم. بعد 8 أيام الرف فاضي. الطلب من علي بابا ياخذ 12 يوم — اطلب قبل الصفر.",
    },
    "inv.name": {
      title: "اسم الصنف",
      meaning: "الاسم اللي تعرف بيه المنتج في المخزن.",
      example: "كريم وجه.",
    },
    "inv.sku": {
      title: "SKU",
      meaning: "رمز قصير للصنف. باش ما تخلطش بين علبتين متشابهين.",
      example: "CREAM-50ML.",
    },
    "inv.warehouse": {
      title: "المستودع",
      meaning: "وين مخزّنة البضاعة.",
      example: "الجزائر العاصمة، أو الرياض.",
    },
    "inv.qty": {
      title: "الكمية الآن",
      meaning: "شحال قطعة على الرف الآن. هذا اللي تقدر تبيعو اليوم.",
      example: "80 قطعة.",
    },
    "inv.daily": {
      title: "مبيعات في اليوم",
      meaning: "معدل القطع اللي تخرج كل يوم.",
      example: "10 في اليوم.",
    },
    "inv.lead": {
      title: "مدة الاستيراد",
      meaning: "من نهار ما تضغط طلب على علي بابا حتى توصل العلب للمستودع.",
      example: "12 يوم.",
    },
    "inv.buffer": {
      title: "أيام الأمان",
      meaning: "أيام زيادة باش ما توصلش للصفر. هامش أمان إذا البيع زاد أو الشحنة تأخرت.",
      example: "3 أيام.",
    },
    "inv.unitCost": {
      title: "تكلفة القطعة",
      meaning: "التكلفة الواصلة لقطعة واحدة: علي بابا + شحن + جمارك.",
      example: "كريم وجه وصل بـ 4.80 دولار للقطعة.",
    },
    "inv.daysLeft": {
      title: "أيام حتى الصفر",
      meaning: "شحال يوم باقي قبل ما يفرغ الرف. الكمية ÷ المبيعات اليومية.",
      example: "80 ÷ 10 = 8 أيام.",
    },
    "inv.zeroDay": {
      title: "يوم النفاد",
      meaning: "رقم اليوم وين الكمية توصل لصفر.",
      example: "80 قطعة و 10 في اليوم = النفاد يوم 8.",
    },
    "inv.need30": {
      title: "احتياج 30 يوم",
      meaning: "شحال قطعة تحتاج لشهر كامل بنفس الوتيرة.",
      example: "10 × 30 = 300 قطعة.",
    },
    "inv.orderBy": {
      title: "آخر يوم للطلب",
      meaning:
        "آخر يوم تقدر تطلب فيه وتوصل الشحنة قبل الصفر. إذا مدة الاستيراد 12 يوم وعندك 8 أيام باقية — فات الأوان.",
      example: "8 أيام باقية و الشحن 12 يوم = أنت متأخر. اطلب اليوم.",
    },
    "inv.advice": {
      title: "نصيحة الطلب",
      meaning:
        "كلمة واضحة: اطلب الآن (ما يكفي حتى توصل الشحنة)، خطّط هذا الأسبوع، المخزون يكفي، أو عندك زيادة — لا تطلب.",
      example:
        "كريم وجه 8 أيام باقية و الشحن 12 يوم = اطلب الآن. إذا عندك بزاف لأكثر من شهرين = مخزون زائد.",
    },
    "road.page": {
      title: "الطريق 32 يوم",
      meaning:
        "نفس صنف المخزن مرسوم كطريق 32 يوم. الأحمر = الرف فارغ. الذهبي/الأصفر = آخر يوم تقدر تطلب فيه.",
      example:
        "كريم وجه: الأعمدة تنقص كل يوم. العمود الأحمر = نفاد. الأصفر = اطلب قبل هذا اليوم.",
    },
    "road.timeline": {
      title: "شريط الأيام",
      meaning: "كل عمود = يوم. الطول = القطع الباقية. تشوف وين ينزل للصفر.",
      example: "يوم 1 عندك 80. إذا يخرج 10 في اليوم، يوم 8 يوصل للصفر.",
    },
    "road.calendar": {
      title: "تقويم الشهر",
      meaning: "نفس القصة على أيام الشهر الحقيقي. اليوم محدّد بالذهبي.",
      example: "إذا اليوم 5 سبتمبر والنفاد بعد 8 أيام، شوف المربع الأحمر في التقويم.",
    },
    "road.zero": {
      title: "يوم الصفر",
      meaning: "اليوم اللي الكمية توصل 0. من بعد ما عندكش باش تبيع.",
      example: "80 ÷ 10 في اليوم = يوم 8 أحمر.",
    },
    "road.orderDay": {
      title: "آخر يوم للطلب",
      meaning: "اليوم الأصفر: آخر فرصة تطلب من الصين وتوصل قبل ما يفرغ الرف.",
      example: "الشحن 12 يوم وما بقات غير 8 أيام — العلامة الصفراء فاتت. اطلب اليوم.",
    },
    "road.arrival": {
      title: "وصول الشحنة",
      meaning: "إذا طلبت اليوم من علي بابا، العلب توصل بعد مدة الاستيراد (إنتاج + شحن + جمارك).",
      example: "طلبت اليوم و المدة 12 يوم = الوصول حوالي يوم 13.",
    },
    "cf.page": {
      title: "الكاش ماشي الربح على الورقة",
      meaning:
        "الربح في صفحة الحسابات ماشي هو الفلوس في الدرج. هنا دخول فلوس حقيقية وخروج فلوس حقيقية. تحصيل COD = دخول. إعلانات، علي بابا، رواتب = خروج.",
      example:
        "الشيت يقول ربحت 100 دولار لأن 3 ناس استلموا. الموزّع يدفعلك الأسبوع الجاي. وعلي بابا والإعلانات دفعتها اليوم. الورقة خضراء والدرج فاضي. لهذا الصفحة موجودة.",
    },
    "cf.in": {
      title: "دخول",
      meaning: "فلوس دخلت للصندوق فعلاً.",
      example: "تحصيل COD من الموزّع: +9800 دولار.",
    },
    "cf.out": {
      title: "خروج",
      meaning: "فلوس خرجت من الصندوق فعلاً.",
      example: "إعلانات اليوم 200 دولار + علي بابا 50 دولار.",
    },
    "cf.net": {
      title: "صافي الكاش",
      meaning: "الدخول ناقص الخروج. هذا اللي في الدرج، ماشي ربح الشيت.",
      example: "دخل 100 وخرج 150 = الدرج −50.",
    },
    "cf.plGap": {
      title: "ربح الورقة مقابل الكاش",
      meaning:
        "رقم من الشيت (ربح الحسابات بعد التشغيل). قارنو مع صافي الكاش. الورقة تقدر تكون خضراء والدرج فاضي.",
      example: "الشيت +100 لأن 3 استلموا. الكاش −50 لأن علي بابا دفعتها الآن.",
    },
    "cf.label": {
      title: "البيان",
      meaning: "شنو هاذي الحركة بجملة قصيرة.",
      example: "تحصيل COD أسبوعي، أو شحنة علي بابا كريم وجه.",
    },
    "cf.amount": {
      title: "المبلغ",
      meaning: "الرقم اللي دخل أو خرج.",
      example: "150 دولار، أو 210000 دينار.",
    },
    "cf.date": {
      title: "التاريخ",
      meaning: "نهار الحركة.",
      example: "2026-09-05.",
    },
    "cf.type": {
      title: "نوع الحركة",
      meaning: "دخول = فلوس جات للصندوق. خروج = فلوس مشات.",
      example: "تحصيل COD = دخول. إعلانات = خروج.",
    },
    "cf.category": {
      title: "التصنيف",
      meaning: "سبب الحركة: تحصيل، إعلانات، بضاعة، شحن، تشغيل، أو أخرى.",
      example: "شحنة كريم وجه من علي بابا = بضاعة.",
    },
    "cf.currency": {
      title: "العملة",
      meaning: "دولار، دينار، أو ريال. الصفحة تجمعهم بالدولار للمقارنة.",
      example: "تحصيل الجزائر بالدينار، إعلانات ميتا بالدولار.",
    },
    "cf.cod": {
      title: "تحصيل COD",
      meaning: "الزبون دفع للمندوب، وأنت استلمت المبلغ (دخول).",
      example: "شركة التوصيل حوّلتلك 9800 دولار هذا الأسبوع.",
    },
    "cf.ads": {
      title: "إعلانات",
      meaning: "فلوس الإعلانات اللي دفعتها (خروج).",
      example: "فيسبوك/ميتا 200 دولار اليوم.",
    },
    "cf.product": {
      title: "بضاعة / علي بابا",
      meaning: "فلوس البضاعة اللي دفعتها للمورّد (خروج).",
      example: "طلبية كريم وجه 50 دولار اليوم.",
    },
    "cf.shipping": {
      title: "شحن وتوصيل",
      meaning: "تكلفة الشحن والتوصيل اللي دفعتها (خروج).",
      example: "شحن بحري أو رسوم الموزّع.",
    },
    "cf.ops": {
      title: "تشغيل ورواتب",
      meaning: "رواتب، كراء، إدارة — تشغيل المحل (خروج).",
      example: "رواتب الشهر 2300 دولار.",
    },
    "cf.other": {
      title: "أخرى",
      meaning: "حركة ما تدخلش في التصنيفات فوق.",
      example: "رسوم بنكية أو تصليح.",
    },
    "cf.byCat": {
      title: "المجموع حسب التصنيف",
      meaning: "كل نوع مع بعضه: شحال دخل أو خرج.",
      example: "COD +9800، إعلانات −4200، علي بابا −3100.",
    },
  },
  fr: {
    "inv.page": {
      title: "Le carnet d’entrepôt",
      meaning:
        "Combien de pièces tu as, à quelle vitesse elles partent, et quand commander en Chine avant que l’étagère soit vide.",
      example:
        "Crème visage : 80 pièces. 10 par jour. Vide dans 8 jours. AliBaba met 12 jours — commande avant zéro.",
    },
    "inv.name": {
      title: "Nom de l’article",
      meaning: "Le nom que tu donnes au produit dans le stock.",
      example: "Crème visage.",
    },
    "inv.sku": {
      title: "SKU",
      meaning: "Un code court. Pour ne pas mélanger deux boîtes qui se ressemblent.",
      example: "CREAM-50ML.",
    },
    "inv.warehouse": {
      title: "Entrepôt",
      meaning: "Où la marchandise est rangée.",
      example: "Alger, ou Riyad.",
    },
    "inv.qty": {
      title: "Quantité maintenant",
      meaning: "Combien de pièces sur l’étagère aujourd’hui.",
      example: "80 pièces.",
    },
    "inv.daily": {
      title: "Ventes par jour",
      meaning: "Moyenne des pièces qui partent chaque jour.",
      example: "10 par jour.",
    },
    "inv.lead": {
      title: "Délai d’import",
      meaning: "Du clic Commande sur AliBaba jusqu’aux cartons dans l’entrepôt.",
      example: "12 jours.",
    },
    "inv.buffer": {
      title: "Jours de sécurité",
      meaning: "Jours en plus pour ne jamais tomber à zéro si les ventes montent ou le bateau retarde.",
      example: "3 jours.",
    },
    "inv.unitCost": {
      title: "Coût d’une pièce",
      meaning: "Le coût arrivé d’une pièce : Chine + transport + douane.",
      example: "Crème visage arrivée à 4,80 $ la pièce.",
    },
    "inv.daysLeft": {
      title: "Jours jusqu’à zéro",
      meaning: "Combien de jours avant que l’étagère soit vide. Quantité ÷ ventes par jour.",
      example: "80 ÷ 10 = 8 jours.",
    },
    "inv.zeroDay": {
      title: "Jour de rupture",
      meaning: "Le numéro du jour où la quantité tombe à 0.",
      example: "80 pièces et 10 par jour = rupture jour 8.",
    },
    "inv.need30": {
      title: "Besoin 30 jours",
      meaning: "Combien de pièces pour un mois au même rythme.",
      example: "10 × 30 = 300 pièces.",
    },
    "inv.orderBy": {
      title: "Dernier jour pour commander",
      meaning:
        "Dernier jour où tu peux encore commander pour que la livraison arrive avant zéro. Délai 12 jours et 8 jours restants : tu es déjà en retard.",
      example: "8 jours de stock et 12 jours de délai = trop tard. Commande aujourd’hui.",
    },
    "inv.advice": {
      title: "Conseil de commande",
      meaning:
        "En clair : commande maintenant, prévois cette semaine, le stock suffit, ou trop de stock — ne commande pas.",
      example:
        "Crème visage : 8 jours restants et 12 jours de délai = commande maintenant. Plus de 2 mois de stock = trop.",
    },
    "road.page": {
      title: "Le chemin 32 jours",
      meaning:
        "Le même article de stock dessiné sur 32 jours. Rouge = vide. Or/jaune = dernier jour pour commander.",
      example:
        "Crème visage : les barres baissent chaque jour. Rouge = rupture. Jaune = commande avant ce jour.",
    },
    "road.timeline": {
      title: "Barres des jours",
      meaning: "Chaque barre = un jour. La hauteur = pièces restantes. Tu vois où ça tombe à zéro.",
      example: "Jour 1 : 80. Si 10 partent par jour, jour 8 = zéro.",
    },
    "road.calendar": {
      title: "Calendrier du mois",
      meaning: "La même histoire sur les vrais jours du mois. Aujourd’hui est entouré en or.",
      example: "Si on est le 5 septembre et la rupture dans 8 jours, cherche le carré rouge.",
    },
    "road.zero": {
      title: "Jour zéro",
      meaning: "Le jour où la quantité arrive à 0. Après, tu n’as plus rien à vendre.",
      example: "80 ÷ 10 par jour = jour 8 en rouge.",
    },
    "road.orderDay": {
      title: "Dernier jour pour commander",
      meaning: "Le jour jaune : dernière chance de commander en Chine et d’arriver avant rupture.",
      example: "Délai 12 jours et plus que 8 jours de stock — le jaune est déjà passé. Commande aujourd’hui.",
    },
    "road.arrival": {
      title: "Arrivée de la commande",
      meaning: "Si tu commandes aujourd’hui sur AliBaba, les cartons arrivent après le délai (prod + bateau + douane).",
      example: "Commande aujourd’hui, délai 12 jours = arrivée vers le jour 13.",
    },
    "cf.page": {
      title: "Le cash n’est pas le profit sur papier",
      meaning:
        "Le profit de la page Comptes n’est pas l’argent dans le tiroir. Ici : l’argent qui entre et qui sort vraiment. COD encaissé = entrée. Pubs, AliBaba, salaires = sortie.",
      example:
        "La feuille dit +100 $ parce que 3 clients ont reçu. Le livreur te paie la semaine prochaine. AliBaba et les pubs, tu les as payés aujourd’hui. Feuille verte, tiroir vide. C’est pour ça que cette page existe.",
    },
    "cf.in": {
      title: "Entrées",
      meaning: "L’argent qui est vraiment entré dans la caisse.",
      example: "COD du livreur : +9800 $.",
    },
    "cf.out": {
      title: "Sorties",
      meaning: "L’argent qui est vraiment sorti de la caisse.",
      example: "Pubs aujourd’hui 200 $ + AliBaba 50 $.",
    },
    "cf.net": {
      title: "Cash net",
      meaning: "Entrées moins sorties. C’est le tiroir, pas le profit de la feuille.",
      example: "100 $ entrés, 150 $ sortis = tiroir −50 $.",
    },
    "cf.plGap": {
      title: "Profit papier vs cash",
      meaning:
        "Un chiffre de la feuille (profit après charges). Compare-le au cash net. La feuille peut être verte et le tiroir vide.",
      example: "Feuille +100 $ (3 livraisons). Cash −50 $ parce qu’AliBaba est payé maintenant.",
    },
    "cf.label": {
      title: "Libellé",
      meaning: "Ce que c’est, en une courte phrase.",
      example: "COD de la semaine, ou commande AliBaba crème visage.",
    },
    "cf.amount": {
      title: "Montant",
      meaning: "Le chiffre qui entre ou qui sort.",
      example: "150 $, ou 210000 DA.",
    },
    "cf.date": {
      title: "Date",
      meaning: "Le jour du mouvement.",
      example: "2026-09-05.",
    },
    "cf.type": {
      title: "Type",
      meaning: "Entrée = l’argent arrive. Sortie = l’argent part.",
      example: "COD encaissé = entrée. Pubs = sortie.",
    },
    "cf.category": {
      title: "Catégorie",
      meaning: "Pourquoi : COD, pubs, marchandise, livraison, charges, ou autre.",
      example: "Commande crème visage AliBaba = marchandise.",
    },
    "cf.currency": {
      title: "Devise",
      meaning: "Dollar, dinar ou riyal. La page convertit en dollar pour comparer.",
      example: "COD Algérie en dinar, pubs Meta en dollar.",
    },
    "cf.cod": {
      title: "COD encaissé",
      meaning: "Le client a payé le livreur, et toi tu as reçu l’argent (entrée).",
      example: "Le transporteur t’a viré 9800 $ cette semaine.",
    },
    "cf.ads": {
      title: "Pubs",
      meaning: "L’argent pub que tu as payé (sortie).",
      example: "Facebook/Meta 200 $ aujourd’hui.",
    },
    "cf.product": {
      title: "Marchandise / AliBaba",
      meaning: "L’argent marchandise payé au fournisseur (sortie).",
      example: "Commande crème visage 50 $ aujourd’hui.",
    },
    "cf.shipping": {
      title: "Livraison",
      meaning: "Transport et livraison que tu as payés (sortie).",
      example: "Fret maritime ou frais du livreur.",
    },
    "cf.ops": {
      title: "Charges et salaires",
      meaning: "Salaires, loyer, gestion — faire tourner le local (sortie).",
      example: "Salaires du mois 2300 $.",
    },
    "cf.other": {
      title: "Autre",
      meaning: "Un mouvement qui n’entre pas dans les cases au-dessus.",
      example: "Frais bancaires ou une réparation.",
    },
    "cf.byCat": {
      title: "Totaux par catégorie",
      meaning: "Chaque type regroupé : combien est entré ou sorti.",
      example: "COD +9800, pubs −4200, AliBaba −3100.",
    },
  },
  en: {
    "inv.page": {
      title: "Warehouse notebook",
      meaning:
        "How many pieces you have, how fast they sell, and when to reorder from China before the shelf hits empty.",
      example:
        "Face cream: 80 on the shelf. 10 leave per day. Empty in 8 days. Alibaba takes 12 days — order before zero.",
    },
    "inv.name": {
      title: "Item name",
      meaning: "The name you use for this product in the warehouse.",
      example: "Face cream.",
    },
    "inv.sku": {
      title: "SKU",
      meaning: "A short code so you don’t mix two similar boxes.",
      example: "CREAM-50ML.",
    },
    "inv.warehouse": {
      title: "Warehouse",
      meaning: "Where the goods sit.",
      example: "Algiers, or Riyadh.",
    },
    "inv.qty": {
      title: "Quantity now",
      meaning: "How many pieces are on the shelf today.",
      example: "80 pieces.",
    },
    "inv.daily": {
      title: "Sales per day",
      meaning: "Average pieces leaving each day.",
      example: "10 per day.",
    },
    "inv.lead": {
      title: "Import lead time",
      meaning: "From clicking Order on Alibaba until the boxes are in the warehouse.",
      example: "12 days.",
    },
    "inv.buffer": {
      title: "Safety days",
      meaning: "Extra days so you never hit zero if sales jump or the shipment is late.",
      example: "3 days.",
    },
    "inv.unitCost": {
      title: "Cost per piece",
      meaning: "Landed cost of one piece: China + shipping + customs.",
      example: "Face cream landed at $4.80 a piece.",
    },
    "inv.daysLeft": {
      title: "Days until empty",
      meaning: "How many days before the shelf is empty. Quantity ÷ daily sales.",
      example: "80 ÷ 10 = 8 days.",
    },
    "inv.zeroDay": {
      title: "Zero day",
      meaning: "The calendar day number when quantity hits 0.",
      example: "80 pieces at 10 a day = empty on day 8.",
    },
    "inv.need30": {
      title: "Need for 30 days",
      meaning: "How many pieces you need for a month at this pace.",
      example: "10 × 30 = 300 pieces.",
    },
    "inv.orderBy": {
      title: "Last day to order",
      meaning:
        "Last day you can still order so the shipment arrives before zero. Lead 12 days and 8 days left: you are already late.",
      example: "8 days of stock and 12 days lead = late. Order today.",
    },
    "inv.advice": {
      title: "Reorder advice",
      meaning:
        "Plain words: order now, plan this week, stock is enough, or overstock — don’t order.",
      example:
        "Face cream: 8 days left and 12-day lead = order now. More than two months of stock = overstock.",
    },
    "road.page": {
      title: "The 32-day path",
      meaning:
        "The same stock item drawn as a 32-day path. Red = empty. Gold/yellow = last day to order.",
      example:
        "Face cream: bars shrink each day. Red bar = empty. Yellow = order before that day.",
    },
    "road.timeline": {
      title: "Day bars",
      meaning: "Each bar is a day. Height is pieces left. You see where it hits zero.",
      example: "Day 1: 80. If 10 leave per day, day 8 is zero.",
    },
    "road.calendar": {
      title: "Month calendar",
      meaning: "The same story on real calendar days. Today is outlined in gold.",
      example: "If today is 5 September and empty is in 8 days, look for the red square.",
    },
    "road.zero": {
      title: "Zero day",
      meaning: "The day quantity hits 0. After that you have nothing to sell.",
      example: "80 ÷ 10 a day = day 8 in red.",
    },
    "road.orderDay": {
      title: "Last day to order",
      meaning: "The yellow day: last chance to order from China and arrive before empty.",
      example: "Lead 12 days and only 8 days of stock — the yellow mark already passed. Order today.",
    },
    "road.arrival": {
      title: "Shipment arrival",
      meaning: "If you order today on Alibaba, boxes arrive after lead time (production + shipping + customs).",
      example: "Order today, lead 12 days = arrival around day 13.",
    },
    "cf.page": {
      title: "Cash is not paper profit",
      meaning:
        "Profit on the Accounts page is not money in the drawer. Here: real money in and out. COD collected = in. Ads, Alibaba, salaries = out.",
      example:
        "The sheet says you made $100 because 3 people received. The courier pays you next week. You already paid Alibaba and ads today. Sheet is green, drawer is empty. That’s why this page exists.",
    },
    "cf.in": {
      title: "In",
      meaning: "Money that actually entered the drawer.",
      example: "COD from the courier: +$9800.",
    },
    "cf.out": {
      title: "Out",
      meaning: "Money that actually left the drawer.",
      example: "Ads today $200 + Alibaba $50.",
    },
    "cf.net": {
      title: "Net cash",
      meaning: "In minus out. This is the drawer, not sheet profit.",
      example: "$100 in and $150 out = drawer −$50.",
    },
    "cf.plGap": {
      title: "Sheet profit vs cash",
      meaning:
        "A number from the sheet (profit after running costs). Compare it with net cash. The sheet can be green and the drawer empty.",
      example: "Sheet +$100 because 3 received. Cash −$50 because Alibaba was paid now.",
    },
    "cf.label": {
      title: "Label",
      meaning: "What this movement is, in a short line.",
      example: "Weekly COD collection, or Alibaba face-cream order.",
    },
    "cf.amount": {
      title: "Amount",
      meaning: "The number that came in or went out.",
      example: "$150, or 210000 DZD.",
    },
    "cf.date": {
      title: "Date",
      meaning: "The day of the movement.",
      example: "2026-09-05.",
    },
    "cf.type": {
      title: "Type",
      meaning: "In = money arrived. Out = money left.",
      example: "COD collected = in. Ads = out.",
    },
    "cf.category": {
      title: "Category",
      meaning: "Why: COD, ads, goods, shipping, running costs, or other.",
      example: "Face-cream order from Alibaba = goods.",
    },
    "cf.currency": {
      title: "Currency",
      meaning: "Dollar, dinar, or riyal. The page totals in dollars so you can compare.",
      example: "Algeria COD in dinar, Meta ads in dollars.",
    },
    "cf.cod": {
      title: "COD collected",
      meaning: "The customer paid the courier, and you received it (in).",
      example: "The courier sent you $9800 this week.",
    },
    "cf.ads": {
      title: "Ads",
      meaning: "Ad money you already paid (out).",
      example: "Facebook/Meta $200 today.",
    },
    "cf.product": {
      title: "Goods / Alibaba",
      meaning: "Goods money you paid the supplier (out).",
      example: "Face-cream order $50 today.",
    },
    "cf.shipping": {
      title: "Shipping",
      meaning: "Shipping and delivery you paid (out).",
      example: "Sea freight or courier fees.",
    },
    "cf.ops": {
      title: "Ops and salaries",
      meaning: "Salaries, rent, management — running the shop (out).",
      example: "This month’s salaries $2300.",
    },
    "cf.other": {
      title: "Other",
      meaning: "A movement that doesn’t fit the boxes above.",
      example: "Bank fees or a repair.",
    },
    "cf.byCat": {
      title: "Totals by category",
      meaning: "Each type grouped: how much in or out.",
      example: "COD +9800, ads −4200, Alibaba −3100.",
    },
  },
};
