import type { HelpBundle } from "./help-types";

export const calcHelp: HelpBundle = {
  ar: {
    "calc.page": {
      title: "هاد الصفحة تجربة «شنو إلا» — قبل ما تكبر",
      meaning:
        "هاد آلة أسئلة. تجرب الكمية والسعر والنسب هنا، وتشوف واش كتربح قبل ما تزيل فلوس الإعلان. ما كاتسجلش المبيعات الحقيقية. المبيعات الحقيقية كاينة في صفحة الحسابات.",
      example:
        "كريم الوجه. قبل ما تصرف على 1000 لييد، تجرب هنا: 100 لييد، تكلفة التيست 4 دولار. تشوف الربح و EPD. إذا خسران هنا، ما تكبرش الإعلان.",
    },
    "calc.qty": {
      title: "Quantity — شحال لييد غادي تشري في التيست",
      meaning:
        "عدد الناس اللي ضغطوا الإعلان في هاد التجربة. مو المبيعات. مو التوصيلات. غير عدد اللييدات اللي غادي تشتري.",
      example: "تكتب 100. يعني غادي تجرب 100 لييد على كريم الوجه. مو 100 علبة مسلّمة.",
    },
    "calc.testCost": {
      title: "Test Cost — شحال قالت ميتا على لييد واحد",
      meaning:
        "الثمن اللي كايبان في Ads Manager للييد واحد. هادا رقم ميتا، مو الثمن الحقيقي. الثمن الحقيقي يتحسب بعد Cost %.",
      example: "كريم الوجه: ميتا تقول لييد واحد = 4 دولار. تكتب 4.",
    },
    "calc.costPct": {
      title: "Cost % — الزيادة فوق الإعلان. تكتب 0.3 مو 30",
      meaning:
        "هاد ماشي 30. تكتب 0.3. 0.3 يعني 30%. الزيادة فوق فلوس الإعلانات: وكالة، ضريبة، صرف الدولار. كيفاش تحسبها: (شنو خرج من البنك − شنو قالت ميتا) ÷ شنو قالت ميتا.",
      example:
        "ميتا قالت صرفتي 1000. البنك خرج 1300 لنفس الإعلانات (وكالة، ضريبة، صرف الدولار). الزيادة = 300. 300 ÷ 1000 = 0.3. تكتب 0.3. ما تكتبش 30.",
    },
    "calc.realCost": {
      title: "Real Cost — الثمن الحقيقي للييد. محسوب، ما تكتبوش",
      meaning:
        "شنو كايكلفك لييد واحد بصح. الصندوق كيتحسب وحدو. ما تدخلش رقم هنا. القانون: Test Cost + Test Cost × Cost %.",
      example: "4 + 4 × 0.3 = 5.2. الصندوق 5.2 محسوب. ما تلمسوش. 4 هو اللي كتبتي. 0.3 هي Cost %.",
    },
    "calc.cr": {
      title: "Confirmation Rate — شحال قالوا نعم",
      meaning:
        "من اللييدات، شحال أكدوا الطلب في التليفون. تكتب كسر عشري. 0.6 يعني 60%. ما تكتبش 60.",
      example: "كريم الوجه: 10 لييدات، 6 قالوا نعم. 6 ÷ 10 = 0.6. تكتب 0.6.",
    },
    "calc.dr": {
      title: "Delivered Rate — من اللي قالوا نعم، شحال استلموا ودفعوا",
      meaning:
        "هاد النسبة مو من كل اللييدات. من الناس اللي قالوا نعم فقط. شحال استلموا السلعة ودفعوا للمندوب. تكتب 0.5 مو 50.",
      example: "6 قالوا نعم، 3 استلموا ودفعوا. 3 ÷ 6 = 0.5. تكتب 0.5. ما تكتبش 50.",
    },
    "calc.price": {
      title: "Selling Price — سعر البيع الحالي",
      meaning:
        "شنو كاتبيع به القطعة دابا. بالريال إذا الخليج، بالدينار إذا الجزائر. التطبيق يحوّلو للدولار وحدو.",
      example: "كريم الوجه في السعودية بـ 89 ريال. تكتب 89. في الجزائر تكتب السعر بالدينار.",
    },
    "calc.alt": {
      title: "New Price — سعر أرخص باش تجرب المنافسة",
      meaning:
        "سعر جديد، عادة أرخص. الجدول الثاني يوريك واش ما زال كتربح إذا نقصتي السعر. ما كيبدّلش السعر الحقيقي في الحسابات.",
      example: "دابا 89 ريال. تجرب 79. إذا الجدول الجديد ما زال فيه ربح، تقدر تنقص السعر وتنافس.",
    },
    "calc.pcost": {
      title: "Product Cost — ثمن القطعة الواصلة من الصين",
      meaning:
        "شنو كلفاتك علبة واحدة بعد ما وصلت. ثمن علي بابا + الشحن حتى بابك. بالدولار. مو سعر البيع.",
      example: "كريم الوجه واصل بـ 6.8 دولار للعلبة. تكتب 6.8.",
    },
    "calc.be": {
      title: "Breakeven — أقل توصيل باش ما تخسرش",
      meaning:
        "أقل نسبة توصيل (من اللي أكدوا) باش الربح يولي صفر. تحت هاد النسبة تخسر. الهدف: الرقم يبقى حوالي 35% أو أقل. أخضر = مازال مزيان من 35%.",
      example:
        "إذا الصندوق يقول 32%، يعني من 32% توصيل ما تخسرش. مزيان. إذا يقول 50%، خاصك بزاف توصيل باش ما تخسرش — المنتج ثقيل.",
    },
    "calc.compete": {
      title: "Possibility to compete — إذا نقصتي السعر، ما زال ربح؟",
      meaning:
        "يشوف جدول السعر الجديد. إذا نقصتي لـ New Price وما زال كاين ربح، تقدر تنافس. إذا ولّى خسران، ما تنقصش.",
      example: "سعر جديد 79 ريال. إذا العلم أخضر، ما زال كتربح. إذا أصفر، السعر الجديد خطر.",
    },
    "calc.stable": {
      title: "Stability — المنتج ثابت ولا هش؟",
      meaning:
        "Stability يعني ثلاثة ديال الشروط مع بعض: EPD على الأقل 8 دولار، ونسبة التوصيل على الأقل 35% (تكتب 0.35)، والربح أكبر من صفر. إلا ما كملوش: Fragile أو Loss.",
      example:
        "كريم الوجه: EPD = 9 دولار، التوصيل 0.5، الربح زايد → Stability. لو EPD = 4 دولار حتى لو كاين ربح صغير → Fragile. لو الربح تحت صفر → Loss.",
    },
    "calc.stock30": {
      title: "Stock for 30 days — شحال تشري لشهر",
      meaning:
        "عدد القطع اللي تشري لـ 30 يوم، حسب وتيرة التسليم ديال هاد التيست. ما هوش المخزون الحالي. رقم تقريبي للطلب الجاي.",
      example:
        "التيست سلّم 3 علب كريم في أسبوع. 3 × (30 ÷ 7) ≈ 13 علبة. تشري حوالي 13 لشهر. زيد شوية احتياط إذا بغيتي.",
    },
    "calc.sales": {
      title: "Sales — الفلوس اللي دخلت من التوصيل",
      meaning:
        "المبيعات = عدد المسلَّمين × سعر البيع بالدولار. مو عدد اللييدات. غير اللي استلموا ودفعوا. الجدولين: السعر القديم والسعر الجديد.",
      example: "3 مسلَّمين × 53 دولار ≈ 159 دولار مبيعات. إذا السعر الجديد 45 دولار: 3 × 45 = 135 دولار.",
    },
    "calc.service": {
      title: "Service Cost — الكول سنتر ورسوم التوصيل. مو الإعلان، مو المنتج",
      meaning:
        "تكلفة الخدمة: تليفونات التأكيد + رسوم شركة التوصيل والدفع عند الاستلام. هادا ما هوش ثمن الكريم، وما هوش فلوس فيسبوك.",
      example:
        "كريم الوجه: الكول سنتر ياخذ على المكالمات، وشركة COD تاخذ على التوصيل ونسبة من البيع. المجموع يظهر هنا. الإعلان والمنتج في سطور وحدهم.",
    },
    "calc.product": {
      title: "Product — ثمن العلب اللي تسالوا",
      meaning: "تكلفة السلعة = عدد المسلَّمين × ثمن القطعة الواصلة. اللييدات اللي ما تسالوش ما كايتحسبوش هنا.",
      example: "3 علب تسالوا × 6.8 دولار = 20.4 دولار. هادا ثمن الكريم، مو الإعلان.",
    },
    "calc.ads": {
      title: "Ads — فلوس الإعلان كاملة",
      meaning: "الإعلانات = الكمية × Real Cost. كل اللييدات، حتى اللي ما أكّدوش. الثمن الحقيقي، مو رقم ميتا بوحدو.",
      example: "100 لييد × 5.2 دولار = 520 دولار إعلان. 5.2 هو Real Cost، مو 4.",
    },
    "calc.profit": {
      title: "Profit — شحال بقى بعد كلشي",
      meaning: "الربح = المبيعات − الخدمة − المنتج − الإعلان. إذا سالب، خسران. هادا قبل مصاريف المكتب.",
      example: "مبيعات 159 − خدمة − 20.4 منتج − الإعلان. اللي يبقى هو الربح. إذا صفر أو تحت، ما تكبرش.",
    },
    "calc.epd": {
      title: "EPD — شحال يبقى على كل توصيلة نجحت",
      meaning:
        "EPD = الربح ÷ عدد المسلَّمين. شحال يبقى لك على كل علبة وصلت وتخلّصات. الهدف 8 دولار أو أكثر. تحت 8 المنتج هش.",
      example: "ربح 30 دولار ÷ 3 مسلَّمين = 10 دولار EPD. فوق 8 → مزيان. لو 12 ÷ 3 = 4 دولار → تحت الهدف.",
    },
    "sim.page": {
      title: "هاد الصفحة تقترح سعر البيع من ثمن الصين",
      meaning:
        "آلة تقترح شحال تبيع به، من تكلفة الصين والشحن والإعلان. ما كاتسجلش في شيت الحسابات. غير اقتراح. تقدر تبدّل الأرقام وتشوف السعر بالدولار والريال والدينار.",
      example:
        "كريم الوجه: الصين 5 دولار، الوزن 0.2 كغ. الصفحة تحسب السعر المقترح بالدولار، وبعدين بالريال والدينار.",
    },
    "sim.china": {
      title: "سعر الصين — ثمن العلبة عند المورّد",
      meaning: "شنو كايطلب علي بابا على قطعة واحدة، قبل الشحن. بالدولار. مو السعر الواصل، ومو سعر البيع.",
      example: "كريم الوجه عند المورّد بـ 5 دولار. تكتب 5.",
    },
    "sim.weight": {
      title: "الوزن — شحال كاتوزن العلبة",
      meaning: "وزن القطعة بالكيلو. باش نحسبو الشحن. علبة صغيرة رقم صغير.",
      example: "كريم الوجه 200 غرام = 0.2 كغ. تكتب 0.2. ما تكتبش 200.",
    },
    "sim.rate": {
      title: "شحن للكيلو — ثمن الشحن لكل كغ",
      meaning: "شحال كاتخلّص على كل كيلو من الصين حتى بابك. بالدولار لكل كغ.",
      example: "الشحن 9 دولار للكيلو. تكتب 9. علبة 0.2 كغ: 0.2 × 9 = 1.8 دولار شحن على العلبة.",
    },
    "sim.dr": {
      title: "Delivered Rate — شحال من اللي أكدوا غادي يوصل",
      meaning:
        "نفس فكرة الآلة الحاسبة. من الناس اللي قالوا نعم، شحال يستلموا ويدخلوا. تكتب 0.55 يعني 55%. ما تكتبش 55. التوصيل الفاشل يثقّل الشحن في الحساب.",
      example: "6 قالوا نعم، تقريبا 3 يستلموا → حوالي 0.5. هنا تقدر تكتب 0.55 إذا السوق أحسن.",
    },
    "sim.cpl": {
      title: "CPL — شحال كاتخلّص على لييد واحد",
      meaning: "Cost Per Lead: ثمن اللييد من الإعلان. بالدولار. تقريبي من Ads Manager.",
      example: "كريم الوجه: لييد بـ 4 دولار. تكتب 4.",
    },
    "sim.profit": {
      title: "ربح مستهدف — شحال بغيتي تبقى على العلبة",
      meaning:
        "هاد مو الربح الحقيقي بعد البيع. هادا الرقم اللي بغيتي يبقى لك في السعر المقترح. الصفحة تزيدو داخل سعر البيع.",
      example: "بغيتي 20 دولار ربح في كل علبة كريم. تكتب 20. السعر المقترح يطلع باش يغطّي هاد 20.",
    },
    "sim.sarFx": {
      title: "SAR / USD — شحال ريال في دولار واحد",
      meaning: "سعر صرف الريال. باش نحوّلو سعر البيع من دولار لريال سعودي. ما يبدّلش الحساب بالدولار.",
      example: "1 دولار = 3.75 ريال. تكتب 3.75. سعر 53 دولار ≈ 199 ريال.",
    },
    "sim.dzdFx": {
      title: "DZD / USD — شحال دينار في دولار واحد",
      meaning: "سعر صرف الدينار الجزائري. باش نحوّلو سعر البيع من دولار لدينار. الدولار يبقى الحساب الأصلي.",
      example: "1 دولار = 245 دينار. تكتب 245. سعر 53 دولار ≈ 13 000 دينار.",
    },
    "sim.landed": {
      title: "تكلفة واصلة — الصين + الشحن على العلبة",
      meaning: "شنو كلفاتك العلبة و هي عندك. الصين + (الوزن × ثمن الكيلو). محسوب. ما تكتبوش.",
      example: "5 + 0.2 × 9 = 5 + 1.8 = 6.8 دولار واصلة. هادا ثمن الكريم عندك، قبل الإعلان والكول سنتر.",
    },
    "sim.shippingCalc": {
      title: "شحن محسوب — 11 ÷ نسبة التوصيل",
      meaning:
        "الشحن يتثقّل لأن جزء من الطرود ما كايوصلوش. القانون: 11 ÷ نسبة التوصيل. توصيل ضعيف = شحن أثقل في السعر.",
      example: "نسبة التوصيل 0.55. 11 ÷ 0.55 ≈ 20 دولار شحن محسوب لكل مسلَّم. لو التوصيل 0.35، الشحن يولي أثقل.",
    },
    "sim.adsPerDel": {
      title: "إعلانات لكل مسلَّم — CPL × 3 تقريبا",
      meaning:
        "تقدير خشن: شحال إعلان كايقع على كل قطعة تسالْت. القانون: CPL × 3. مو رقم ميتا بوحدو. كاين لييدات ما كايتحولوش لتوصيل.",
      example: "CPL = 4. 4 × 3 = 12 دولار إعلان تقريبا على كل كريم مسلَّم.",
    },
    "sim.cod5": {
      title: "COD 5% — حصة شركة التوصيل من سعر البيع",
      meaning:
        "شركة الدفع عند الاستلام تاخذ تقريبا 5% من سعر البيع. الصندوق محسوب من السعر المقترح. ما تكتبوش.",
      example: "سعر مقترح 80 دولار. 5% = 4 دولار لشركة COD. هادا من سعر البيع، مو من ثمن الصين.",
    },
    "sim.priceUsd": {
      title: "سعر البيع بالدولار — الاقتراح النهائي",
      meaning:
        "السعر المقترح بالدولار: التكلفة الواصلة + الشحن المحسوب + الكول سنتر + الإعلان لكل مسلَّم + الربح المستهدف، وبعدين يزيدو 5% COD. هادا اقتراح. تقدر تدورّو.",
      example: "كريم الوجه يطلع مثلا 80 دولار. هادا ما تبيعش به في أدس. تحوّلو لريال أو دينار تحت.",
    },
    "sim.sar": {
      title: "السعودية — نفس السعر بالريال",
      meaning: "سعر البيع بالدولار × صرف الريال. مقرّب لعشرة ريال باش ساهل للزبون.",
      example: "80 دولار × 3.75 ≈ 300 ريال. الصفحة تقرّب لعشرة: تقدر تبيع 299 أو 289.",
    },
    "sim.dzd": {
      title: "الجزائر — نفس السعر بالدينار",
      meaning: "سعر البيع بالدولار × صرف الدينار. نفس الفلوس، عملة الجزائر.",
      example: "80 دولار × 245 ≈ 19 600 دينار. تقدر تدورّ لرقم ساهل في السوق.",
    },
    "sim.margin": {
      title: "فرق السعر — شحال فوق ثمن العلبة",
      meaning:
        "الفرق بين سعر البيع والتكلفة الواصلة، بالنسبة لسعر البيع. هذا ماشي ربح — ما يطرحش الإعلان ولا الشحن ولا الكول سنتر ولا COD. الربح الصافي هو الرقم المستهدف اللي كتبتو فوق.",
      example: "بيع 80 دولار، واصلة 6.8. الهامش كبير على الورق. بعد الإعلان والشحن المحسوب، الربح هو الرقم المستهدف اللي كتبتي.",
    },
  },
  fr: {
    "calc.page": {
      title: "Cette page est une machine « et si… » — avant de scaler",
      meaning:
        "Vous testez la quantité, le prix et les taux ici. Vous voyez si vous gagnez avant de mettre plus d’argent sur les pubs. Elle n’enregistre pas les vraies ventes. Les vraies ventes sont dans Comptes.",
      example:
        "Crème visage. Avant 1000 leads, vous testez ici : 100 leads, test cost 4 $. Vous lisez le profit et l’EPD. Si vous perdez ici, n’augmentez pas les pubs.",
    },
    "calc.qty": {
      title: "Quantity — combien de leads dans le test",
      meaning:
        "Le nombre de personnes qui ont cliqué sur la pub dans ce test. Ce n’est pas les ventes. Ce n’est pas les livraisons. Seulement les leads que vous allez acheter.",
      example: "Vous tapez 100. Ça veut dire 100 leads sur la crème visage. Pas 100 boîtes livrées.",
    },
    "calc.testCost": {
      title: "Test Cost — ce que Meta dit pour un lead",
      meaning:
        "Le prix d’un lead dans Ads Manager. C’est le chiffre Meta, pas le vrai coût. Le vrai coût se calcule après Cost %.",
      example: "Crème visage : Meta dit 4 $ par lead. Vous tapez 4.",
    },
    "calc.costPct": {
      title: "Cost % — le surplus. Vous tapez 0.3, pas 30",
      meaning:
        "Vous ne tapez pas 30. Vous tapez 0.3. 0.3 = 30 %. C’est l’extra au-dessus des pubs : agence, taxe, change du dollar. Calcul : (sortie banque − montant Meta) ÷ montant Meta.",
      example:
        "Meta dit 1000. La banque a sorti 1300 pour ces pubs (agence, taxe, change). Extra = 300. 300 ÷ 1000 = 0.3. Vous tapez 0.3. Pas 30.",
    },
    "calc.realCost": {
      title: "Real Cost — le vrai prix d’un lead. Calculé, ne pas taper",
      meaning:
        "Ce qu’un lead vous coûte vraiment. La case se calcule toute seule. Vous n’écrivez rien dedans. Formule : Test Cost + Test Cost × Cost %.",
      example: "4 + 4 × 0.3 = 5.2. La case 5.2 est calculée. Ne la touchez pas. 4 est le test. 0.3 est le Cost %.",
    },
    "calc.cr": {
      title: "Confirmation Rate — combien ont dit oui",
      meaning:
        "Parmi les leads, combien ont confirmé au téléphone. Vous tapez un décimal. 0.6 = 60 %. Ne tapez pas 60.",
      example: "Crème visage : 10 leads, 6 ont dit oui. 6 ÷ 10 = 0.6. Vous tapez 0.6.",
    },
    "calc.dr": {
      title: "Delivered Rate — parmi ceux qui ont dit oui, combien ont reçu et payé",
      meaning:
        "Ce n’est pas sur tous les leads. Seulement sur les gens qui ont dit oui. Combien ont reçu le colis et payé le livreur. Tapez 0.5, pas 50.",
      example: "6 ont dit oui, 3 ont reçu et payé. 3 ÷ 6 = 0.5. Vous tapez 0.5. Pas 50.",
    },
    "calc.price": {
      title: "Selling Price — le prix de vente actuel",
      meaning:
        "Le prix actuel d’une pièce. En riyals pour le Golfe, en dinars pour l’Algérie. L’appli convertit en dollar toute seule.",
      example: "Crème visage en Arabie à 89 SAR. Vous tapez 89. En Algérie, vous tapez le prix en dinar.",
    },
    "calc.alt": {
      title: "New Price — un prix plus bas pour tester la concurrence",
      meaning:
        "Un nouveau prix, souvent plus bas. Le deuxième tableau dit si vous gagnez encore. Ça ne change pas le vrai prix dans Comptes.",
      example: "Aujourd’hui 89 SAR. Vous testez 79. Si le nouveau tableau a encore du profit, vous pouvez baisser et concurrencer.",
    },
    "calc.pcost": {
      title: "Product Cost — le coût d’une pièce arrivée de Chine",
      meaning:
        "Ce qu’une boîte vous a coûté une fois arrivée. Prix Alibaba + transport jusqu’à chez vous. En dollar. Ce n’est pas le prix de vente.",
      example: "Crème visage arrivée à 6.8 $ la boîte. Vous tapez 6.8.",
    },
    "calc.be": {
      title: "Breakeven — le plus bas taux livré pour ne pas perdre",
      meaning:
        "Le plus petit taux de livraison (parmi les confirmés) où le profit devient zéro. En dessous, vous perdez. Objectif : rester vers 35 % ou moins. Vert = encore OK autour de 35 %.",
      example:
        "Si la case dit 32 %, dès 32 % livré vous ne perdez pas. Bien. Si elle dit 50 %, il faut trop de livraisons pour ne pas perdre — produit lourd.",
    },
    "calc.compete": {
      title: "Possibility to compete — si vous baissez le prix, encore du profit ?",
      meaning:
        "Ça regarde le tableau du nouveau prix. Si vous passez à New Price et il reste du profit, vous pouvez concurrencer. Si ça devient perte, ne baissez pas.",
      example: "Nouveau prix 79 SAR. Drapeau vert = vous gagnez encore. Jaune = le nouveau prix est risqué.",
    },
    "calc.stable": {
      title: "Stability — le produit est solide ou fragile ?",
      meaning:
        "Stability = trois conditions ensemble : EPD au moins 8 $, taux livré au moins 35 % (tapez 0.35), et profit > 0. Sinon : Fragile ou Loss.",
      example:
        "Crème visage : EPD = 9 $, livré 0.5, profit positif → Stability. Si EPD = 4 $ même avec un petit profit → Fragile. Si profit sous zéro → Loss.",
    },
    "calc.stock30": {
      title: "Stock for 30 days — combien acheter pour un mois",
      meaning:
        "Le nombre de pièces à acheter pour 30 jours, d’après le rythme de livraison de ce test. Ce n’est pas le stock actuel. Un chiffre approximatif pour la prochaine commande.",
      example:
        "Le test a livré 3 crèmes en une semaine. 3 × (30 ÷ 7) ≈ 13 boîtes. Vous achetez environ 13 pour le mois. Ajoutez un peu de marge si vous voulez.",
    },
    "calc.sales": {
      title: "Sales — l’argent entré des livraisons",
      meaning:
        "Ventes = nombre livré × prix de vente en dollar. Pas le nombre de leads. Seulement ceux qui ont reçu et payé. Deux tableaux : ancien prix et nouveau prix.",
      example: "3 livrés × 53 $ ≈ 159 $ de ventes. Au nouveau prix 45 $ : 3 × 45 = 135 $.",
    },
    "calc.service": {
      title: "Service Cost — call center et frais COD. Pas les pubs, pas le produit",
      meaning:
        "Le coût du service : appels de confirmation + frais de la société de livraison et paiement à la livraison. Ce n’est pas le prix de la crème. Ce n’est pas Facebook.",
      example:
        "Crème visage : le call center prend sur les appels, la société COD prend sur la livraison et un % de la vente. Le total est ici. Pubs et produit sont sur d’autres lignes.",
    },
    "calc.product": {
      title: "Product — le coût des boîtes livrées",
      meaning: "Coût produit = nombre livré × coût d’une pièce arrivée. Les leads non livrés ne sont pas comptés ici.",
      example: "3 boîtes livrées × 6.8 $ = 20.4 $. C’est le coût de la crème, pas des pubs.",
    },
    "calc.ads": {
      title: "Ads — tout l’argent pubs",
      meaning: "Pubs = quantité × Real Cost. Tous les leads, même ceux qui n’ont pas confirmé. Le vrai coût, pas le chiffre Meta tout seul.",
      example: "100 leads × 5.2 $ = 520 $ de pubs. 5.2 est le Real Cost, pas 4.",
    },
    "calc.profit": {
      title: "Profit — ce qui reste après tout",
      meaning: "Profit = ventes − service − produit − pubs. Si c’est négatif, vous perdez. C’est avant les frais de bureau.",
      example: "Ventes 159 − service − 20.4 produit − pubs. Ce qui reste est le profit. Si zéro ou moins, ne scalez pas.",
    },
    "calc.epd": {
      title: "EPD — ce qui reste par livraison réussie",
      meaning:
        "EPD = profit ÷ nombre livré. Ce qui vous reste sur chaque boîte reçue et payée. Objectif : 8 $ ou plus. Sous 8 $, le produit est fragile.",
      example: "Profit 30 $ ÷ 3 livrés = 10 $ EPD. Au-dessus de 8 → bien. Si 12 ÷ 3 = 4 $ → sous l’objectif.",
    },
    "sim.page": {
      title: "Cette page propose un prix de vente à partir du coût Chine",
      meaning:
        "Une machine qui propose à quel prix vendre, à partir du coût Chine, du transport et des pubs. Elle n’écrit rien dans Comptes. C’est une suggestion. Vous changez les chiffres et vous voyez dollar, riyal et dinar.",
      example:
        "Crème visage : Chine 5 $, poids 0.2 kg. La page calcule le prix proposé en dollar, puis en riyal et en dinar.",
    },
    "sim.china": {
      title: "Prix Chine — le prix chez le fournisseur",
      meaning: "Ce qu’Alibaba demande pour une pièce, avant le transport. En dollar. Pas le coût arrivé. Pas le prix de vente.",
      example: "Crème visage chez le fournisseur à 5 $. Vous tapez 5.",
    },
    "sim.weight": {
      title: "Poids — combien pèse la boîte",
      meaning: "Le poids d’une pièce en kilo. Pour calculer le transport. Petite boîte = petit chiffre.",
      example: "Crème visage 200 g = 0.2 kg. Vous tapez 0.2. Pas 200.",
    },
    "sim.rate": {
      title: "Transport par kilo — le prix du kilo",
      meaning: "Ce que vous payez par kilo de la Chine jusqu’à chez vous. En dollar par kg.",
      example: "Transport 9 $ / kg. Vous tapez 9. Boîte 0.2 kg : 0.2 × 9 = 1.8 $ de transport sur la boîte.",
    },
    "sim.dr": {
      title: "Delivered Rate — parmi les oui, combien arrivent",
      meaning:
        "Même idée que la calculatrice. Parmi ceux qui ont dit oui, combien reçoivent et paient. Tapez 0.55 = 55 %. Pas 55. Les échecs de livraison rendent le transport plus lourd dans le calcul.",
      example: "6 ont dit oui, environ 3 reçoivent → vers 0.5. Ici vous pouvez taper 0.55 si le marché est meilleur.",
    },
    "sim.cpl": {
      title: "CPL — ce qu’un lead vous coûte",
      meaning: "Cost Per Lead : le prix d’un lead pub. En dollar. Un à-peu-près d’Ads Manager.",
      example: "Crème visage : un lead à 4 $. Vous tapez 4.",
    },
    "sim.profit": {
      title: "Profit cible — combien vous voulez garder sur la boîte",
      meaning:
        "Ce n’est pas le vrai profit après vente. C’est le montant que vous voulez mettre dans le prix proposé. La page l’ajoute dans le prix de vente.",
      example: "Vous voulez 20 $ de profit par crème. Vous tapez 20. Le prix proposé monte pour couvrir ces 20 $.",
    },
    "sim.sarFx": {
      title: "SAR / USD — combien de riyals pour 1 dollar",
      meaning: "Le taux riyal. Pour convertir le prix de vente du dollar vers le riyal saoudien. Ça ne change pas le compte en dollar.",
      example: "1 $ = 3.75 SAR. Vous tapez 3.75. Prix 53 $ ≈ 199 SAR.",
    },
    "sim.dzdFx": {
      title: "DZD / USD — combien de dinars pour 1 dollar",
      meaning: "Le taux dinar algérien. Pour convertir le prix de vente du dollar vers le dinar. Le dollar reste le compte de base.",
      example: "1 $ = 245 DA. Vous tapez 245. Prix 53 $ ≈ 13 000 DA.",
    },
    "sim.landed": {
      title: "Coût arrivé — Chine + transport sur la boîte",
      meaning: "Ce que la boîte vous a coûté une fois chez vous. Chine + (poids × prix du kilo). Calculé. Ne pas taper.",
      example: "5 + 0.2 × 9 = 5 + 1.8 = 6.8 $ arrivé. C’est le coût de la crème chez vous, avant pubs et call center.",
    },
    "sim.shippingCalc": {
      title: "Transport calculé — 11 ÷ taux livré",
      meaning:
        "Le transport devient plus lourd parce qu’une partie des colis n’arrive pas. Formule : 11 ÷ taux livré. Moins de livraisons = transport plus cher dans le prix.",
      example: "Taux livré 0.55. 11 ÷ 0.55 ≈ 20 $ de transport calculé par livré. À 0.35, le transport est plus lourd.",
    },
    "sim.adsPerDel": {
      title: "Pubs par livré — CPL × 3 environ",
      meaning:
        "Une estimation simple : combien de pubs tombent sur chaque pièce livrée. Formule : CPL × 3. Pas le chiffre Meta tout seul. Il y a des leads qui ne deviennent pas une livraison.",
      example: "CPL = 4. 4 × 3 = 12 $ de pubs environ sur chaque crème livrée.",
    },
    "sim.cod5": {
      title: "COD 5 % — la part de la société COD sur le prix de vente",
      meaning:
        "La société paiement à la livraison prend environ 5 % du prix de vente. La case est calculée à partir du prix proposé. Ne pas taper.",
      example: "Prix proposé 80 $. 5 % = 4 $ pour la société COD. Ça vient du prix de vente, pas du prix Chine.",
    },
    "sim.priceUsd": {
      title: "Prix de vente en $ — la suggestion finale",
      meaning:
        "Le prix proposé en dollar : coût arrivé + transport calculé + call center + pubs par livré + profit cible, puis +5 % COD. C’est une suggestion. Vous pouvez l’arrondir.",
      example: "Crème visage sort par exemple à 80 $. Vous ne vendez pas en dollar dans les pubs. Convertissez en riyal ou dinar en dessous.",
    },
    "sim.sar": {
      title: "Arabie — le même prix en riyal",
      meaning: "Prix de vente en dollar × taux riyal. Arrondi à 10 riyals pour que ce soit simple pour le client.",
      example: "80 $ × 3.75 ≈ 300 SAR. La page arrondit à 10 : vous pouvez vendre 299 ou 289.",
    },
    "sim.dzd": {
      title: "Algérie — le même prix en dinar",
      meaning: "Prix de vente en dollar × taux dinar. Le même argent, monnaie Algérie.",
      example: "80 $ × 245 ≈ 19 600 DA. Vous pouvez arrondir à un chiffre simple du marché.",
    },
    "sim.margin": {
      title: "Écart de prix — combien au-dessus de la boîte",
      meaning:
        "L’écart entre le prix de vente et le coût arrivé, par rapport au prix de vente. Ce n’est pas un profit : ni pubs, ni transport, ni call center, ni COD ne sont déduits. Le profit net est le chiffre cible saisi plus haut.",
      example: "Vente 80 $, arrivé 6.8. La marge papier est grande. Après pubs et transport calculé, le profit est le chiffre cible que vous avez tapé.",
    },
  },
  en: {
    "calc.page": {
      title: "This page is a WHAT IF machine — before you scale",
      meaning:
        "You try quantity, price and rates here. You see if you win before you put more money on ads. It does not record real sales. Real sales live in Accounts.",
      example:
        "Face cream. Before you buy 1000 leads, try here: 100 leads, test cost $4. Read profit and EPD. If you lose here, do not scale ads.",
    },
    "calc.qty": {
      title: "Quantity — how many leads you will buy in the test",
      meaning:
        "How many people clicked the ad in this test. Not sales. Not deliveries. Only the leads you will buy.",
      example: "Type 100. That means 100 leads for face cream. Not 100 boxes delivered.",
    },
    "calc.testCost": {
      title: "Test Cost — what Ads Manager says one lead costs",
      meaning:
        "The price of one lead in Ads Manager. That is Meta’s number, not the true cost. True cost is calculated after Cost %.",
      example: "Face cream: Meta says one lead = $4. Type 4.",
    },
    "calc.costPct": {
      title: "Cost % — extra on top of ads. Type 0.3, not 30",
      meaning:
        "Do not type 30. Type 0.3. 0.3 means 30%. Extra on top of ads: agency, tax, dollar exchange. How to get it: (bank − Ads Manager) ÷ Ads Manager.",
      example:
        "Meta says you spent 1000. Your bank shows 1300 left for those ads (agency, tax, dollar exchange). Extra = 300. 300 / 1000 = 0.3. Type 0.3. Not 30.",
    },
    "calc.realCost": {
      title: "Real Cost — true cost per lead. Calculated, do not type it",
      meaning:
        "What one lead really costs you. This box is calculated. Do not type in it. Formula: Test Cost + Test Cost × Cost %.",
      example: "4 + 4 × 0.3 = 5.2. The 5.2 box is calculated. Do not touch it. 4 is what you typed. 0.3 is Cost %.",
    },
    "calc.cr": {
      title: "Confirmation Rate — how many said yes",
      meaning:
        "Of the leads, how many confirmed the order on the phone. Type a decimal. 0.6 means 60%. Do not type 60.",
      example: "Face cream: 10 leads, 6 said yes. 6 / 10 = 0.6. Type 0.6.",
    },
    "calc.dr": {
      title: "Delivered Rate — of the people who said yes, how many received and paid",
      meaning:
        "This is not out of all leads. Only out of people who said yes. How many received the product and paid the courier. Type 0.5, not 50.",
      example: "6 said yes, 3 received and paid. 3 / 6 = 0.5. Type 0.5. Not 50.",
    },
    "calc.price": {
      title: "Selling Price — current selling price",
      meaning:
        "What you sell one piece for now. SAR for the Gulf, DZD for Algeria. The app converts to USD by itself.",
      example: "Face cream in Saudi at 89 SAR. Type 89. In Algeria, type the price in dinar.",
    },
    "calc.alt": {
      title: "New Price — a cheaper price to test if you can still win",
      meaning:
        "A new price, usually cheaper. The second table shows if you still profit. It does not change the real price in Accounts.",
      example: "Now 89 SAR. Try 79. If the new table still has profit, you can drop the price and compete.",
    },
    "calc.pcost": {
      title: "Product Cost — cost of one piece from Alibaba, landed",
      meaning:
        "What one box cost you after it arrived. Alibaba price + shipping to your door. In USD. Not the selling price.",
      example: "Face cream landed at $6.8 per box. Type 6.8.",
    },
    "calc.be": {
      title: "Breakeven — lowest delivered % before you lose",
      meaning:
        "The lowest delivered rate (of people who said yes) where profit becomes zero. Below this % you lose. Goal: still OK around 35%. Green = still fine from 35%.",
      example:
        "If this box shows 32%, from 32% delivered you do not lose. Good. If it shows 50%, you need too many deliveries to not lose — heavy product.",
    },
    "calc.compete": {
      title: "Possibility to compete — if you drop to New Price, still profit?",
      meaning:
        "It looks at the New Price table. If you drop the price and still make profit, you can compete. If it turns to loss, do not drop.",
      example: "New price 79 SAR. Green flag = you still win. Yellow = the new price is risky.",
    },
    "calc.stable": {
      title: "Stability — solid product or fragile?",
      meaning:
        "Stability means all three: EPD at least $8, delivered rate at least 35% (type 0.35), and profit > 0. Else Fragile or Loss.",
      example:
        "Face cream: EPD = $9, delivered 0.5, profit positive → Stability. If EPD = $4 even with a small profit → Fragile. If profit under zero → Loss.",
    },
    "calc.stock30": {
      title: "Stock for 30 days — pieces to buy for a month",
      meaning:
        "How many pieces to buy for 30 days, based on this test’s daily delivered pace. Not your current stock. A rough number for the next order.",
      example:
        "The test delivered 3 creams in a week. 3 × (30 / 7) ≈ 13 boxes. Buy about 13 for the month. Add a little extra if you want.",
    },
    "calc.sales": {
      title: "Sales — money in from delivered orders",
      meaning:
        "Sales = delivered × selling price in USD. Not the number of leads. Only people who received and paid. Two tables: old price and new price.",
      example: "3 delivered × $53 ≈ $159 sales. At a new price of $45: 3 × 45 = $135.",
    },
    "calc.service": {
      title: "Service Cost — call center + COD fees. Not ads, not product",
      meaning:
        "Service cost: confirmation calls + courier and cash-on-delivery fees. This is not the cream cost. This is not Facebook money.",
      example:
        "Face cream: call center charges for calls, COD company charges for delivery and a cut of the sale. The total is here. Ads and product have their own lines.",
    },
    "calc.product": {
      title: "Product — cost of the boxes that got delivered",
      meaning: "Product cost = delivered × landed cost of one piece. Leads that did not get delivered are not counted here.",
      example: "3 boxes delivered × $6.8 = $20.4. That is the cream cost, not ads.",
    },
    "calc.ads": {
      title: "Ads — all ad money",
      meaning: "Ads = quantity × Real Cost. Every lead, even people who did not confirm. True cost, not Meta’s number alone.",
      example: "100 leads × $5.2 = $520 ads. 5.2 is Real Cost, not 4.",
    },
    "calc.profit": {
      title: "Profit — what is left after everything",
      meaning: "Profit = sales − service − product − ads. If negative, you lose. This is before office costs.",
      example: "Sales 159 − service − 20.4 product − ads. What remains is profit. If zero or below, do not scale.",
    },
    "calc.epd": {
      title: "EPD — what is left per successful delivery",
      meaning:
        "EPD = profit / delivered pieces. How much you keep on each box that arrived and was paid. Target $8 or more. Under $8 the product is fragile.",
      example: "Profit $30 / 3 delivered = $10 EPD. Above $8 → good. If 12 / 3 = $4 → below target.",
    },
    "sim.page": {
      title: "This page suggests a selling price from China cost",
      meaning:
        "A machine that suggests what to sell at, from China cost, shipping and ads. It does not write into the Accounts sheet. Only a suggestion. Change the numbers and see USD, SAR and DZD.",
      example:
        "Face cream: China $5, weight 0.2 kg. The page calculates a suggested price in dollars, then in riyal and dinar.",
    },
    "sim.china": {
      title: "China price — cost of one piece at the supplier",
      meaning: "What Alibaba charges for one piece, before shipping. In USD. Not landed cost. Not selling price.",
      example: "Face cream at the supplier is $5. Type 5.",
    },
    "sim.weight": {
      title: "Weight — how heavy one box is",
      meaning: "Weight of one piece in kilograms. Used to calculate shipping. Small box = small number.",
      example: "Face cream 200 g = 0.2 kg. Type 0.2. Do not type 200.",
    },
    "sim.rate": {
      title: "Shipping per kg — cost of one kilogram",
      meaning: "What you pay per kilo from China to your door. In USD per kg.",
      example: "Shipping $9 per kg. Type 9. A 0.2 kg box: 0.2 × 9 = $1.8 shipping on the box.",
    },
    "sim.dr": {
      title: "Delivered Rate — of the yes, how many arrive",
      meaning:
        "Same idea as the calculator. Of people who said yes, how many receive and pay. Type 0.55 for 55%. Not 55. Failed deliveries make shipping heavier in this math.",
      example: "6 said yes, about 3 receive → around 0.5. Here you can type 0.55 if the market is better.",
    },
    "sim.cpl": {
      title: "CPL — what one lead costs",
      meaning: "Cost Per Lead: ad cost of one lead. In USD. A rough number from Ads Manager.",
      example: "Face cream: one lead at $4. Type 4.",
    },
    "sim.profit": {
      title: "Target profit — how much you want to keep per box",
      meaning:
        "This is not real profit after a sale. This is the amount you want baked into the suggested price. The page adds it into selling price.",
      example: "You want $20 profit on each cream. Type 20. Suggested price goes up to cover that $20.",
    },
    "sim.sarFx": {
      title: "SAR / USD — how many riyals in one dollar",
      meaning: "Riyal exchange rate. Turns selling price from USD into Saudi riyal. It does not change the dollar math.",
      example: "$1 = 3.75 SAR. Type 3.75. Price $53 ≈ 199 SAR.",
    },
    "sim.dzdFx": {
      title: "DZD / USD — how many dinars in one dollar",
      meaning: "Algerian dinar exchange rate. Turns selling price from USD into dinar. The dollar stays the real count.",
      example: "$1 = 245 DZD. Type 245. Price $53 ≈ 13,000 DZD.",
    },
    "sim.landed": {
      title: "Landed cost — China + shipping on the box",
      meaning: "What the box cost you once it is with you. China + (weight × rate per kg). Calculated. Do not type it.",
      example: "5 + 0.2 × 9 = 5 + 1.8 = $6.8 landed. That is cream cost at your door, before ads and call center.",
    },
    "sim.shippingCalc": {
      title: "Calculated shipping — 11 / delivered rate",
      meaning:
        "Shipping gets heavier because some parcels fail. Formula: 11 / delivered rate. Weaker delivery = heavier shipping inside the price.",
      example: "Delivered rate 0.55. 11 / 0.55 ≈ $20 calculated shipping per delivered. At 0.35, shipping is heavier.",
    },
    "sim.adsPerDel": {
      title: "Ads per delivered — CPL × 3 (rough)",
      meaning:
        "A rough estimate: how much ad money sits on each delivered piece. Formula: CPL × 3. Not Meta’s number alone. Some leads never become a delivery.",
      example: "CPL = 4. 4 × 3 = $12 ads roughly on each cream delivered.",
    },
    "sim.cod5": {
      title: "COD 5% — what the COD company takes from selling price",
      meaning:
        "The cash-on-delivery company takes about 5% of selling price. This box is calculated from the suggested price. Do not type it.",
      example: "Suggested price $80. 5% = $4 for the COD company. That comes from selling price, not from China cost.",
    },
    "sim.priceUsd": {
      title: "Selling price in $ — the final suggestion",
      meaning:
        "Suggested USD price: landed + calculated shipping + call center + ads per delivered + target profit, then +5% COD. It is a suggestion. You can round it.",
      example: "Face cream comes out around $80. You do not sell in dollars in ads. Convert to riyal or dinar below.",
    },
    "sim.sar": {
      title: "Saudi — the same price in riyal",
      meaning: "Selling price in USD × riyal rate. Rounded to 10 riyals so it is easy for the customer.",
      example: "$80 × 3.75 ≈ 300 SAR. The page rounds to 10: you can sell 299 or 289.",
    },
    "sim.dzd": {
      title: "Algeria — the same price in dinar",
      meaning: "Selling price in USD × dinar rate. Same money, Algeria currency.",
      example: "$80 × 245 ≈ 19,600 DZD. You can round to a simple market number.",
    },
    "sim.margin": {
      title: "Price gap — how much above box cost",
      meaning:
        "The gap between selling price and landed cost, as a share of selling price. This is not profit: ads, shipping, call center and COD are all still unsubtracted. Net profit is the target figure you typed above.",
      example: "Sell $80, landed $6.8. Paper margin looks big. After ads and calculated shipping, profit is the target number you typed.",
    },
  },
};
