import type { HelpBundle } from "./help-types";

export const homeHelp: HelpBundle = {
  ar: {
    "home.page": {
      title: "هاد الشاشة تلخص المحل — ما تكتبش هنا",
      meaning:
        "هاد الصفحة مثل تلفزيون. تعرض النتيجة فقط. ما تدخلش أرقام البيزنس هنا. الأرقام تجي من شيت الحسابات، والآلة الحاسبة، والمخزون. إذا شفت رقم غالط، صلّحه في الصفحة الأصلية مو هنا.",
      example:
        "كريم الوجه: 10 ناس ضغطوا الإعلان = 10 Leads. 6 قالوا نعم في التليفون = 6 Orders. 3 استلموا ودفعوا للمندوب = 3 Delivered. السعر تقريبا 200 ريال ≈ 53 دولار للواحدة → المبيعات ≈ 159 دولار. تكلفة المنتج 7 دولار × 3 = 21 دولار. الإعلان 4 دولار لكل Lead → 40 دولار. الزيادة الحقيقية 30% تخلي التكلفة 5.2 دولار لكل Lead. هاد الملخص يظهر فوق. أنت ما تكتب هادشي هنا.",
    },
    "home.gulfNet": {
      title: "صافي الخليج — شحال بقى في الجيب",
      meaning:
        "صافي الخليج = ربح منتجات الخليج ناقص مصاريف المكتب (رواتب، كراء، كهرباء). ربح المنتجات يجي من الشيت. مصاريف المكتب تجي من التشغيل. الرقم الأخضر يعني بقات فلوس. الأحمر يعني المصاريف أكلت الربح.",
      example:
        "منتجات الخليج ربحت 500 دولار. الكراء والرواتب 200 دولار. 500 − 200 = 300 دولار باقية. هادا هو صافي الخليج. ما هوش المبيعات. المبيعات أكبر، والصافي هو اللي يبقى بعد كل المصاريف.",
    },
    "home.dzNet": {
      title: "صافي الجزائر — بالدولار والدينار",
      meaning:
        "نفس الفكرة تاع الخليج، لكن للمحل في الجزائر. ربح المنتجات ناقص مصاريف المكتب (رواتب وكراء). الرقم يظهر بالدولار، وتحته بالدينار حسب سعر الصرف في الإعدادات. إذا بدّلت سعر الصرف، الدينار يتبدّل والدولار يبقى هو الحساب الأصلي.",
      example:
        "ربح منتجات الجزائر 500 دولار. الكراء والرواتب 200 دولار. الصافي 300 دولار. إذا الدولار = 250 دينار، يظهر تحتها 75 000 دينار. نفس الفلوس، عملتين. ما تدخلش 250 هنا — سعر الصرف يجي من الإعدادات.",
    },
    "home.epd": {
      title: "EPD — الفلوس الباقية لكل توصيلة نجحت",
      meaning:
        "EPD يعني Earn Per Delivery: شحال يبقى لك على كل طلب وصل ودفع الزبون. مو على كل ضغطة إعلان، ومو على كل مكالمة. فقط التوصيلات الناجحة. الهدف تقريبا 8 دولار أو أكثر. تحت 8 الدولار المحل هش: أسبوع توصيل ضعيف يمسحك.",
      example:
        "كريم الوجه: ربحت 30 دولار بعد كل المصاريف. 3 ناس استلموا ودفعوا. 30 ÷ 3 = 10 دولار EPD. هادا فوق الهدف 8 دولار. لو ربحت 12 دولار على 3 توصيلات، EPD = 4 دولار — تحت الهدف، حتى لو كاين ربح صغير.",
    },
    "home.alerts": {
      title: "تنبيهات المخزون — منتجات قربوا يخلصوا",
      meaning:
        "الرقم هو عدد المنتجات اللي المخزون تاعهم غادي يخلص قبل ما توصل شحنة علي بابا الجاية. إذا كاين تنبيه، روح للمخزون واطلب قبل ما تقعد بلا سلعة. صفر يعني عندك وقت.",
      example:
        "عندك 80 علبة كريم. تبيع 10 في اليوم. المخزون يخلص في 8 أيام. الاستيراد من علي بابا ياخذ 12 يوم. 8 أقل من 12 → الطلب لازم اليوم، وإلا المحل يوقف بلا كريم.",
    },
    "home.stockDecision": {
      title: "قرار المخزون الآن — أطلب ولا استنى؟",
      meaning:
        "هاد القائمة تقولك شنو تعمل اليوم لكل منتج: اطلب الآن، أو خطط للطلب، أو المخزون كافٍ. الحساب بسيط: القطع الموجودة ÷ المبيعات اليومية = أيام حتى يخلص. قارن هاد الرقم بمدة الاستيراد. إذا الأيام أقل من مدة الشحن، اطلب.",
      example:
        "كريم الوجه: 80 قطعة، تبيع 10 في اليوم → يخلص بعد 8 أيام. الشحن من علي بابا 12 يوم. 8 أقل من 12 → «اطلب الآن». لو عندك 200 قطعة: 200 ÷ 10 = 20 يوم. 20 أكبر من 12 → عندك وقت، خطط للطلب وما تستعجلش اليوم.",
    },
    "home.stabilityIndex": {
      title: "مؤشر الاستقرار — المحل ثابت ولا هش؟",
      meaning:
        "Stability يعني المحل يقدر يكمل: كاين ربح، وEPD على الأقل 8 دولار لكل توصيلة نجحت، ونسبة التوصيل على الأقل 0.35 (يعني 35% من الطلبات توصل — اكتب 0.35 مو 35). Fragile يعني كاين ربح صغير، لكن أسبوع توصيل ضعيف يخسرك. التعادل هو أقل نسبة توصيل باش ما تخسرش. قابلية خفض السعر: إذا نقصت السعر وما زلت رابح، تقدر تنافس.",
      example:
        "كريم الوجه: 6 طلبات، 3 وصلوا. نسبة التوصيل 3 ÷ 6 = 0.5 (50% — اكتب 0.5). الربح 30 دولار ÷ 3 توصيلات = 10 دولار EPD. 10 فوق 8 و 0.5 فوق 0.35 → Stability. لو التعادل من 0.35 توصيل، يعني إذا أقل من 35% وصلوا تبدأ تخسر. خفض السعر: إذا بعد التخفيض EPD ما زال حوالي 5 دولار أو أكثر، تقدر تنقص السعر وتنافس.",
    },
  },
  fr: {
    "home.page": {
      title: "Cet écran résume le magasin — vous ne tapez rien ici",
      meaning:
        "Cette page est comme une télévision. Elle montre le résultat seulement. Vous ne tapez pas les chiffres du business ici. Les chiffres viennent de la feuille Comptes, de la calculatrice, et du stock. Si un chiffre est faux, corrigez-le sur la page d’origine, pas ici.",
      example:
        "Crème visage : 10 personnes ont cliqué = 10 Leads. 6 ont dit oui au téléphone = 6 Orders. 3 ont reçu et payé le livreur = 3 Delivered. Prix ~200 SAR ≈ 53 $ → ventes ≈ 159 $. Coût produit 7 $ × 3 = 21 $. Pubs : 4 $ par Lead → 40 $. Avec +30 % réel, ça fait 5,2 $ par Lead. Ce résumé s’affiche en haut. Vous n’écrivez rien ici.",
    },
    "home.gulfNet": {
      title: "Net Golfe — ce qui reste dans la poche",
      meaning:
        "Net Golfe = profit des produits du Golfe moins les frais du bureau (salaires, loyer, électricité). Le profit vient de la feuille. Les frais viennent des opérations. Vert = il reste de l’argent. Rouge = les frais ont mangé le profit.",
      example:
        "Les produits du Golfe ont gagné 500 $. Loyer et salaires = 200 $. 500 − 200 = 300 $ restants. C’est le net Golfe. Ce n’est pas le chiffre des ventes. Les ventes sont plus grandes. Le net, c’est ce qui reste après toutes les charges.",
    },
    "home.dzNet": {
      title: "Net Algérie — en dollar et en dinar",
      meaning:
        "Même idée que le Golfe, pour le magasin en Algérie. Profit des produits moins les frais du bureau (salaires et loyer). Le chiffre s’affiche en dollar, et en dessous en dinar avec le taux de change des réglages. Si vous changez le taux, le dinar bouge. Le dollar reste le compte de base.",
      example:
        "Profit Algérie 500 $. Loyer et salaires 200 $. Net = 300 $. Si 1 $ = 250 DA, vous voyez 75 000 DA en dessous. Même argent, deux monnaies. Ne tapez pas 250 ici — le taux vient des réglages.",
    },
    "home.epd": {
      title: "EPD — l’argent restant par livraison réussie",
      meaning:
        "EPD = Earn Per Delivery : ce qui vous reste pour chaque commande reçue et payée. Pas par clic. Pas par appel. Seulement les livraisons réussies. Objectif : environ 8 $ ou plus. Sous 8 $, le magasin est fragile : une mauvaise semaine de livraisons vous efface.",
      example:
        "Crème visage : 30 $ de profit après toutes les charges. 3 clients ont reçu et payé. 30 ÷ 3 = 10 $ EPD. C’est au-dessus de l’objectif 8 $. Si vous gagnez 12 $ sur 3 livraisons, EPD = 4 $ — sous l’objectif, même s’il reste un petit profit.",
    },
    "home.alerts": {
      title: "Alertes stock — produits bientôt vides",
      meaning:
        "Ce chiffre compte les produits dont le stock va finir avant l’arrivée du prochain colis Alibaba. S’il y a une alerte, allez au stock et commandez avant de rester sans marchandise. Zéro = vous avez encore du temps.",
      example:
        "Vous avez 80 crèmes. Vous vendez 10 par jour. Le stock finit dans 8 jours. L’import Alibaba prend 12 jours. 8 est plus petit que 12 → il faut commander aujourd’hui, sinon le magasin s’arrête sans crème.",
    },
    "home.stockDecision": {
      title: "Décision stock maintenant — commander ou attendre ?",
      meaning:
        "Cette liste dit quoi faire aujourd’hui pour chaque produit : commander maintenant, planifier, ou stock suffisant. Calcul simple : pièces en stock ÷ ventes par jour = jours avant rupture. Comparez ce nombre au délai d’import. Si les jours sont plus petits que le délai, commandez.",
      example:
        "Crème visage : 80 pièces, 10 ventes par jour → vide dans 8 jours. Livraison Alibaba = 12 jours. 8 < 12 → « commander maintenant ». Si vous avez 200 pièces : 200 ÷ 10 = 20 jours. 20 > 12 → vous avez le temps. Planifiez. Pas la panique aujourd’hui.",
    },
    "home.stabilityIndex": {
      title: "Indice de stabilité — solide ou fragile ?",
      meaning:
        "Stability = le magasin peut continuer : il y a du profit, EPD au moins 8 $ par livraison réussie, et taux de livraison au moins 0,35 (35 % des commandes arrivent — tapez 0,35, pas 35). Fragile = petit profit, mais une mauvaise semaine de livraisons vous fait perdre. Le seuil d’équilibre est le plus bas taux de livraison pour ne pas perdre. Baisse de prix : si vous baissez et vous gagnez encore, vous pouvez concurrencer.",
      example:
        "Crème visage : 6 commandes, 3 livrées. Taux = 3 ÷ 6 = 0,5 (50 % — tapez 0,5). Profit 30 $ ÷ 3 livraisons = 10 $ EPD. 10 > 8 et 0,5 > 0,35 → Stability. Si l’équilibre est à 0,35, en dessous de 35 % livré vous commencez à perdre. Baisse de prix : si après la baisse l’EPD reste vers 5 $ ou plus, vous pouvez baisser et rester concurrentiel.",
    },
  },
  en: {
    "home.page": {
      title: "This screen summarizes the shop — you do not type here",
      meaning:
        "This page is like a TV. It only shows the result. You do not type business numbers here. Numbers come from the Accounts sheet, the calculator, and inventory. If a number looks wrong, fix it on the original page, not here.",
      example:
        "Face cream: 10 people clicked the ad = 10 Leads. 6 said yes on the phone = 6 Orders. 3 received and paid the courier = 3 Delivered. Selling price ~200 SAR ≈ $53 each → sales ≈ $159. Product cost $7 × 3 = $21. Ads: $4 per lead → $40. Real extra 30% makes it $5.2 per lead. This summary shows at the top. You do not type any of this here.",
    },
    "home.gulfNet": {
      title: "Gulf net — what is left in the pocket",
      meaning:
        "Gulf net = profit from Gulf products minus office costs (salaries, rent, electricity). Product profit comes from the sheet. Office costs come from operations. Green means money is left. Red means costs ate the profit.",
      example:
        "Gulf products made $500 profit. Rent and salaries are $200. $500 − $200 = $300 left. That is Gulf net. It is not sales. Sales are bigger. Net is what stays after every cost.",
    },
    "home.dzNet": {
      title: "Algeria net — in dollars and dinar",
      meaning:
        "Same idea as the Gulf, for the Algeria shop. Product profit minus office costs (salaries and rent). The number is in dollars, and under it in dinar using the exchange rate in Settings. If you change the rate, the dinar changes. The dollar is the real count.",
      example:
        "Algeria product profit $500. Rent and salaries $200. Net = $300. If $1 = 250 DZD, you see 75,000 DZD under it. Same money, two currencies. Do not type 250 here — the rate comes from Settings.",
    },
    "home.epd": {
      title: "EPD — money left per successful delivery",
      meaning:
        "EPD means Earn Per Delivery: how much you keep on each order that arrived and the customer paid. Not per click. Not per phone call. Only successful deliveries. Target is about $8 or more. Under $8 the shop is fragile: one weak delivery week wipes you.",
      example:
        "Face cream: $30 profit after all costs. 3 people received and paid. $30 ÷ 3 = $10 EPD. That is above the $8 target. If you make $12 profit on 3 deliveries, EPD = $4 — below target, even if there is a small profit.",
    },
    "home.alerts": {
      title: "Stock alerts — products that will run out",
      meaning:
        "This number counts products whose stock will finish before the next Alibaba shipment arrives. If there is an alert, go to inventory and order before you sit with empty shelves. Zero means you still have time.",
      example:
        "You have 80 face creams. You sell 10 per day. Stock is empty in 8 days. Alibaba import takes 12 days. 8 is less than 12 → order today, or the shop stops with no cream.",
    },
    "home.stockDecision": {
      title: "Stock decision now — order or wait?",
      meaning:
        "This list tells you what to do today for each product: order now, plan the order, or stock is enough. Simple math: pieces in stock ÷ daily sales = days until empty. Compare that to import time. If days are less than shipping time, order.",
      example:
        "Face cream: 80 pieces, sell 10 per day → empty in 8 days. Alibaba shipping is 12 days. 8 < 12 → “order now”. If you have 200 pieces: 200 ÷ 10 = 20 days. 20 > 12 → you have time. Plan the order. No rush today.",
    },
    "home.stabilityIndex": {
      title: "Stability index — solid or fragile?",
      meaning:
        "Stability means the shop can keep going: there is profit, EPD is at least $8 per successful delivery, and the delivery rate is at least 0.35 (35% of orders arrive — type 0.35, not 35). Fragile means a small profit, but one weak delivery week makes you lose. Breakeven is the lowest delivery rate where you stop losing. Price cut: if you lower the price and still make money, you can compete.",
      example:
        "Face cream: 6 orders, 3 delivered. Rate = 3 ÷ 6 = 0.5 (50% — type 0.5). Profit $30 ÷ 3 deliveries = $10 EPD. $10 is above $8 and 0.5 is above 0.35 → Stability. If breakeven is 0.35 delivery, below 35% delivered you start losing. Price cut: if after the cut EPD stays around $5 or more, you can lower the price and still compete.",
    },
  },
};
