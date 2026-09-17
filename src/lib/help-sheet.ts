import type { HelpBundle } from "./help-types";

export const sheetHelp: HelpBundle = {
  ar: {
    "sheet.page": {
      title: "واش هي ورقة الحسابات؟",
      meaning:
        "هذه الصفحة كيما دفتر إكسيل. الخانات البيضاء: أنت تكتب الأرقام. الخانات الزرقاء: البرنامج يحسبها وحدو. الربح هنا ربح ورقي (على الورق) — مشي الفلوس لي في الدرج. الكاش صفحة أخرى.",
      example:
        "1) كريم وجه: تكتب 10 ليدات، 6 طلبات، 3 توصيلات، مبيعات 159 دولار. 2) الأزرق يطلع تكلفة الخدمة والربح. 3) إذا الرقم بالسالب، خسرت على الورق هذا الشهر.",
    },
    "sheet.productCost": {
      title: "تكلفة القطعة الواحدة",
      meaning:
        "ثمن قطعة وحدة وصلت للزبون، بعد الشحن من علي بابا (التكلفة الواصلة). مشي ثمن الكرتون كامل ولا الشحنة كلها.",
      example: "1) كريم وجه يكلّفك 7 دولار للقطعة المسلّمة. 2) وصلو 3؟ تكلفة البضاعة = 7×3 = 21 دولار. 3) ما تكتبش ثمن الـ 1000 قطعة لي شريتيهم دفعة واحدة.",
    },
    "sheet.lead": {
      title: "ليد — الناس لي جاو من الإعلان",
      meaning:
        "Lead معناها شخص شاف الإعلان وكليكا أو خلا رقمه. مازال ما شرى. هذا أول رقم في القمع.",
      example: "1) كريم وجه: 10 ليدات هاذ الأسبوع. 2) من العشرة، جزء يقول آه في التليفون، والباقي لا. 3) كل ليد غالي إذا الإعلان غالي.",
    },
    "sheet.order": {
      title: "طلب مؤكّد — قال آه في التليفون",
      meaning:
        "Order = الزبون قال نعم للكول سنتر. طلب مؤكّد، مشي توصيل بعد. البعض يرجع الطرد ولا يرفض الكوريي.",
      example: "1) من 10 ليدات، 6 قالو آه. 2) تكتب 6 هنا. 3) 6 من 10 = 0.6 معناها 60% تأكيد.",
    },
    "sheet.delivered": {
      title: "مسلّم — وصل وخلّص",
      meaning:
        "Delivered = الكوريي وصل والطرد عند الزبون ودفع (COD). المرتجع والرفض ما يتعدّوش هنا.",
      example: "1) من 6 طلبات، 3 توصّلو وخلصو. 2) تكتب 3. 3) الثلاثة هم لي يجيبو الفلوس.",
    },
    "sheet.sales": {
      title: "المبيعات — الفلوس لي خلّص الزبون",
      meaning:
        "Total Sales = المبلغ لي دفعوه الزبائن (تحصيل الدفع عند الاستلام). تكتب الفلوس، مشي عدد القطع.",
      example: "1) 3 توصيلات × حوالي 53 دولار = 159 دولار. 2) تكتب 159 مشي 3. 3) إذا السعر 53 والوصلات 3، الناتج هو المبيعات.",
    },
    "sheet.codCollected": {
      title: "تحصيل COD — نفس رقم المبيعات",
      meaning:
        "Total COD Collected = نفس المبيعات: واش الكوريي جمع من الزبون عند الباب. خانة زرقاء محسوبة من اللي كتبتو فوق.",
      example: "1) كتبت مبيعات 159؟ التحصيل يظهر 159. 2) كريم وجه: 3×53 = 159 دولار. 3) إذا اختلف الرقم، راجع المبيعات لي دخلتها.",
    },
    "sheet.ads": {
      title: "مصروف الإعلانات",
      meaning:
        "Ads Spend = واش صرفت على ميتا أو قوقل في نفس الفترة. الإعلان الرئيسي، مشي تجارب صغيرة (التجارب سطر وحدو).",
      example: "1) 10 ليدات × 4 دولار لكل ليد = 40 دولار إعلان. 2) تكتب 40. 3) في جدول لكل طلب، يظهر الإعلان مقسوم على عدد الطلبات.",
    },
    "sheet.test": {
      title: "مصروف التجارب",
      meaning:
        "Test Spend = حملات تجربة زيادة: إعلان جديد، جمهور جديد، منتج جديد. فوق مصروف الإعلان العادي.",
      example: "1) جربت إعلان جديد بـ 20 دولار. 2) تكتب 20 هنا، والإعلان العادي يبقى في سطر الإعلانات. 3) إذا ما عندكش تجارب، خلّي 0.",
    },
    "sheet.adAccount": {
      title: "رسوم حساب الإعلان",
      meaning:
        "Ad Account = مصاريف أخرى على حساب الإعلان: تعبئة، عمولة وكالة، رسوم ما هيش داخل رقم الإعلانات.",
      example: "1) وكالة خدات 15 دولار هذا الشهر. 2) تكتب 15. 3) إذا التعبئة تظهر أصلاً في Ads Spend، ما تعاودش تحسبها هنا.",
    },
    "sheet.productLine": {
      title: "تكلفة البضاعة المسلّمة",
      meaning:
        "Product = تكلفة القطعة × عدد المسلّم. يحسبها البرنامج. تحسب غير اللي وصل، مشي اللي في المخزن.",
      example: "1) 7 دولار × 3 مسلّم = 21 دولار. 2) الخانة زرقاء: ما تكتبش. 3) إذا المسلّم 0، تكلفة البضاعة 0.",
    },
    "sheet.leadFee": {
      title: "رسوم الليد (خدمة)",
      meaning:
        "قطعة من تكلفة الخدمة: كل ليد × سعر الليد في الإعدادات (غالباً 0.50 دولار). للكول سنتر، مشي للإعلان.",
      example: "1) 10 ليدات × 0.50 = 5 دولار. 2) الرقم يجي من الإعدادات. 3) يتبدّل إذا غيّرت الرسوم هناك.",
    },
    "sheet.confirmFee": {
      title: "رسوم التأكيد (خدمة)",
      meaning: "قطعة من تكلفة الخدمة: كل طلب مؤكّد × رسوم التأكيد (غالباً 1 دولار) لي الكول سنتر.",
      example: "1) 6 طلبات × 1.00 = 6 دولار. 2) خانة زرقاء. 3) المرتجع بعد التأكيد يبقى محسوب كتأكيد.",
    },
    "sheet.deliverFee": {
      title: "رسوم التوصيل الناجح (خدمة)",
      meaning: "قطعة من تكلفة الخدمة: كل مسلّم × رسوم التوصيل (غالباً 2 دولار).",
      example: "1) 3 مسلّم × 2.00 = 6 دولار. 2) غير اللي وصل وخلص. 3) المرتجع ما يدخلش هنا.",
    },
    "sheet.extraFee": {
      title: "رسوم إضافية على التأكيد",
      meaning: "قطعة من تكلفة الخدمة: كل طلب مؤكّد × رسم إضافي (غالباً 3.99 دولار) حسب عقد الكول سنتر / COD.",
      example: "1) 6 طلبات × 3.99 ≈ 24 دولار. 2) زرقاء من الإعدادات. 3) إذا الرسم 0 في الإعدادات، السطر يطلع 0.",
    },
    "sheet.codFee": {
      title: "عمولة COD على المبيعات",
      meaning:
        "قطعة من تكلفة الخدمة: نسبة من المبيعات (غالباً 5%) لي شركة الدفع عند الاستلام. مشي ثمن المنتج.",
      example: "1) 5% من 159 ≈ 8 دولار (0.05×159). 2) كل ما تزيد المبيعات تزيد العمولة. 3) النسبة من الإعدادات.",
    },
    "sheet.serviceCost": {
      title: "تكلفة الخدمة كاملة",
      meaning:
        "Service Cost = مجموع رسوم الليد + التأكيد + التوصيل + الإضافي + عمولة COD. هذا الكول سنتر وشركة COD. مشي المنتج، ومشي الإعلانات.",
      example: "1) مثال كريم الوجه: 5 + 6 + 6 + 24 + 8 ≈ 49 دولار خدمة. 2) الأزرق يجمعها. 3) الإعلان و7×3 بضاعة يتحسبو في أسطر أخرى.",
    },
    "sheet.bonus": {
      title: "بونوص — مصروف زيادة تبي تحسبه",
      meaning: "Bonus = حاجة زيادة بغيت تدخلها في التكلفة: إنفلونسر، هدية، مسابقة. اختياري.",
      example: "1) دفعت 30 دولار لإنفلونسر على الكريم. 2) تكتب 30. 3) إذا والو، خلّي 0.",
    },
    "sheet.totalCos": {
      title: "التكلفة الإجمالية",
      meaning:
        "Total Cost = إعلانات + تجارب + حساب إعلان + بضاعة مسلّمة + تكلفة الخدمة + البونوص. كل ما خرج على هاذ المنتج.",
      example: "1) 40 إعلان + 0 تجارب + 0 حساب + 21 بضاعة + خدمة + 0 بونوص. 2) الأزرق يجمع. 3) الربح = المبيعات ناقص هذا المجموع.",
    },
    "sheet.profits": {
      title: "الربح الورقي",
      meaning:
        "Profits = المبيعات ناقص التكلفة الإجمالية. إذا سالب، خسرت على الورق. هذا مشي صافي الشهر بعد المكتب.",
      example: "1) مبيعات 159 ناقص التكاليف = الربح (أو الخسارة). 2) الأخضر ربح، الأحمر خسارة. 3) صافي المكتب تحت في خانة التشغيل.",
    },
    "sheet.epo": {
      title: "EPO — الربح على كل طلب مؤكّد",
      meaning:
        "Earn Per Order = الربح ÷ عدد الطلبات المؤكّدة. مفيد، لكن الطلب المؤكّد ماشي كلّو يوصل.",
      example: "1) إذا الربح 30 دولار والطلبات 6: 30÷6 = 5 دولار لكل طلب. 2) الرقم المهم أكثر هو EPD تحت. 3) إذا الطلبات 0، يظهر صفر.",
    },
    "sheet.epd": {
      title: "EPD — الربح على كل توصيلة (المهم)",
      meaning:
        "Earn Per Delivery = الربح ÷ عدد المسلّم. هذا الرقم اللي تقرر بيه: كل توصيلة ناجحة رجعتلك شحال؟",
      example: "1) ربح ÷ 3 مسلّم. 2) إذا الربح 30: 30÷3 = 10 دولار لكل توصيلة. 3) تحت 0 معناها كل وصول يخسّرك.",
    },
    "sheet.ops": {
      title: "تشغيل المكتب — شهري",
      meaning:
        "Operations = مصاريف المكتب هذا الشهر: رواتب، كراء، ضوء... تتحسب حتى لو بعت صفر. مشي تكلفة المنتج.",
      example: "1) رواتب + كراء + فاتورة = تشغيل. 2) تكتبهم هنا مرة في الشهر. 3) الصافي = ربح المنتجات ناقص هذا.",
    },
    "sheet.salaries": {
      title: "الرواتب",
      meaning: "Salaries = أجور الفريق هذا الشهر (تأكيد، مخزن، مساعدة) ما عدا اللي حاطّو في رواتب الإدارة.",
      example: "1) موظفين بـ 40 دولار هذا الشهر. 2) تكتب 40. 3) إذا نتا وحدك وما تخلّصش روحك، تقدر تخلّي 0 أو تكتب مبلغ لنفسك.",
    },
    "sheet.vat": {
      title: "ضريبة ورسوم جمرك",
      meaning: "VAT & Duty = ضريبة القيمة المضافة والجمارك على الفترة، إذا كتخلّصهم كمصروف مكتب.",
      example: "1) جمارك أو ضريبة 10 دولار. 2) تكتب 10. 3) تكلفة القطعة من علي بابا تبقى في Product Cost، مشي هنا.",
    },
    "sheet.rent": {
      title: "كراء المكتب",
      meaning: "Rent = كراء المحل أو المكتب هذا الشهر. حتى لو ما بعت والو، الكراء ماشي.",
      example: "1) الكراء 25 دولار. 2) تكتب 25. 3) إذا تخدم من الدار، خلّي 0.",
    },
    "sheet.utilities": {
      title: "فواتير — ضوء، نت، ماء",
      meaning: "Utilities = فواتير المكتب: كهرباء، إنترنت، ماء، تليفون المكتب.",
      example: "1) نت + ضوء = 8 دولار. 2) تكتب 8. 3) فاتورة الإعلان مشي هنا — الإعلان في Ads Spend.",
    },
    "sheet.mgmt": {
      title: "رواتب الإدارة",
      meaning: "Management salaries = أجرك نتا أو المدير، منفصل على رواتب الفريق.",
      example: "1) خرجت لنفسك 20 دولار هذا الشهر. 2) تكتب 20. 3) إذا ما تخلّصش روحك بعد، خلّي 0.",
    },
    "sheet.extra": {
      title: "تشغيل آخر",
      meaning: "أي مصروف مكتب ما لقاش خانة: تنقل، أدوات، صيانة. مشي بونوص المنتج فوق.",
      example: "1) طاكسي للمخزن 5 دولار. 2) تكتب 5. 3) هدية إنفلونسر على منتج معيّن = Bonus في الجدول، مشي هنا.",
    },
    "sheet.opsTotal": {
      title: "مجموع التشغيل",
      meaning: "Total Operations = رواتب + ضريبة + كراء + فواتير + إدارة + أخرى. كل المكتب هذا الشهر.",
      example: "1) 40+10+25+8+20+5 = 108 مثلاً. 2) البرنامج يجمع. 3) هذا الرقم يتطرح من ربح المنتجات.",
    },
    "sheet.costPerOp": {
      title: "تكلفة التشغيل لكل طلب",
      meaning: "Cost Per Operation = مجموع المكتب ÷ عدد الطلبات المؤكّدة. شحال المكتب يكلّف على كل أوردر.",
      example: "1) مكتب 80 دولار و 6 طلبات: 80÷6 ≈ 13 دولار لكل طلب. 2) إذا الطلبات 0، يظهر 0. 3) يساعدك تشوف إذا المكتب ثقيل على المبيعات.",
    },
    "sheet.net": {
      title: "الصافي بعد المكتب",
      meaning:
        "Net = ربح المنتجات (الورقي) ناقص تشغيل المكتب. اللي بقى هاذ الشهر بعد ما تخلّص الكراء والرواتب.",
      example: "1) ربح منتجات 100 ناقص مكتب 80 = 20 باقية. 2) إذا المكتب أكبر من الربح، الشهر بالسالب. 3) في الجزائر يظهر أيضاً بالدينار.",
    },
    "gulf.page": {
      title: "واش هي ملعب الخليج؟",
      meaning:
        "هنا تجربة: «إذا صيفط 1000 ليد للسعودية ولا الإمارات، شكون يربح؟» الأرقام هنا ما تبدّلش ورقة الحسابات. غير محاكاة.",
      example:
        "1) حط 1000 ليد، تكلفة 7 دولار، تأكيد 0.6 (يعني 60%). 2) بدّل الدولة فوق وشوف الربح و EPD. 3) الجدول تحت يقارن الدول بنفس المدخلات.",
    },
    "gulf.leads": {
      title: "عدد الليدات في التجربة",
      meaning: "شحال شخص من الإعلان تحط في المحاكاة. رقم تجريبي، مشي لي في ورقة الحسابات.",
      example: "1) 1000 ليد للسعودية. 2) نفس الـ 1000 تقدر تقارنهم بالإمارات في الجدول. 3) كريم الوجه الأصلي كان 10 — هنا تكبر الرقم باش تشوف الحجم.",
    },
    "gulf.productCost": {
      title: "تكلفة القطعة بالدولار",
      meaning: "نفس فكرة الورقة: ثمن قطعة وحدة مسلّمة (علي بابا واصلة)، بالدولار.",
      example: "1) كريم وجه: 7 دولار. 2) تكتب 7. 3) البرنامج يضربها غير في المسلّم، مشي في كل الليدات.",
    },
    "gulf.cr": {
      title: "نسبة التأكيد (Confirmation)",
      meaning:
        "Confirmation Rate: من كل ليد، شحال قال آه في التليفون. اكتب كسر: 0.6 مشي 60.",
      example: "1) 10 ليدات، 6 قالو آه. 2) 0.6 معناها 60%. 3) إذا تكتب 60، الحساب يغلط بزاف.",
    },
    "gulf.dr": {
      title: "نسبة التوصيل (Delivered Rate)",
      meaning:
        "من الطلبات المؤكّدة، شحال وصل وخلص. المرتجع ما يدخلش. اكتب 0.5 إذا نصّهم يوصل.",
      example: "1) 6 مؤكّدين، 3 وصلو: 0.5 معناها 50%. 2) كل دولة عندها مجال توصيل مختلف — الزر فوق يحدّث رقم تقريبي. 3) 0.55 معناها 55%.",
    },
    "gulf.cpl": {
      title: "تكلفة الليد (CPL)",
      meaning: "CPL / CPP = شحال تخلّص الإعلان باش تجيب شخص واحد (ليد). بالدولار.",
      example: "1) كريم وجه: 4 دولار لكل ليد. 2) 10 ليدات × 4 = 40 دولار إعلان. 3) 1000 ليد × 3 دولار = 3000 دولار إعلان.",
    },
    "gulf.price": {
      title: "سعر البيع بالعملة المحلية",
      meaning:
        "واش الزبون يخلّص في السعودية أو الإمارات (ريال، درهم...). البرنامج يحوّله للدولار بالمعدّل تاع الدولة.",
      example: "1) كريم وجه حوالي 53 دولار. 2) إذا الدولة ريال، تكتب السعر بالريال. 3) المبيعات بالدولار = المسلّم × السعر المحوّل.",
    },
    "gulf.confirmed": {
      title: "مؤكّد في المحاكاة",
      meaning: "عدد اللي قالو آه = الليدات × نسبة التأكيد. نتيجة، ما تكتبش.",
      example: "1) 1000 × 0.6 = 600 مؤكّد. 2) كريم الوجه الصغير: 10 × 0.6 = 6. 3) إذا النسبة 0، المؤكّد 0.",
    },
    "gulf.delivered": {
      title: "مسلّم في المحاكاة",
      meaning: "الواصل اللي خلّص = الليدات × التأكيد × التوصيل. هم لي يجيبو المبيعات.",
      example: "1) 1000 × 0.6 × 0.5 = 300 مسلّم. 2) المثال الصغير: 10 × 0.6 × 0.5 = 3. 3) هذا المقام تاع EPD.",
    },
    "gulf.sales": {
      title: "المبيعات بالدولار",
      meaning: "الفلوس المتوقعة من المسلّم × سعر البيع (محوّل للدولار). يظهر أيضاً بالعملة المحلية.",
      example: "1) 3 مسلّم × 53 دولار ≈ 159 دولار. 2) مع 1000 ليد الرقم يكبر بنفس الطريقة. 3) هذا قبل ما نطرحو التكاليف.",
    },
    "gulf.epd": {
      title: "EPD — ربح كل توصيلة",
      meaning: "الربح ÷ عدد المسلّم. الرقم الأهم في الخليج: كل وصول ناجح رجّع شحال؟",
      example: "1) ربح ÷ 3 في مثال الكريم. 2) فوق 10 دولار غالباً أسهل تتوسع. 3) سالب = كل وصول يخسّرك.",
    },
    "gulf.shipping": {
      title: "تكلفة الشحن",
      meaning: "شحن محسوب على الطلبات المؤكّدة (حتى اللي ما يوصلوش): مؤكّد × شحن الدولة.",
      example: "1) 6 مؤكّدين × شحن الدولة. 2) السعودية غير الإمارات في السعر. 3) لهذا دولة تقدر تربح وأخرى لا بنفس الليدات.",
    },
    "gulf.callCenter": {
      title: "كول سنتر + إضافي",
      meaning: "رسوم الليد والتأكيد والتوصيل والإضافي من إعدادات الخليج. خدمة المكالمات، مشي الشحن.",
      example: "1) كيما الورقة: ليد×0.50 + طلب×1 + مسلّم×2 + طلب×3.99. 2) مع 10 / 6 / 3 يطلع مبلغ صغير. 3) مع 1000 ليد يتضرب.",
    },
    "gulf.cod": {
      title: "رسوم COD 5%",
      meaning: "عمولة الدفع عند الاستلام: نسبة من المبيعات (غالباً 5%).",
      example: "1) 5% من 159 ≈ 8 دولار. 2) كل ما تزيد المبيعات تزيد الرسوم. 3) النسبة من إعدادات الخليج.",
    },
    "gulf.ads": {
      title: "الإعلانات في المحاكاة",
      meaning: "ليدات × تكلفة الليد (CPL). واش تخلّص ميتا/قوقل في هاذ التجربة.",
      example: "1) 10 × 4 = 40 دولار. 2) 1000 × 3 = 3000 دولار. 3) أغلى CPL يأكل الربح بسرعة.",
    },
    "gulf.productSold": {
      title: "تكلفة البضاعة المباعة",
      meaning: "تكلفة القطعة × المسلّم فقط. اللي ما وصلش ما تحسبش بضاعته هنا.",
      example: "1) 7 × 3 = 21 دولار. 2) 7 × 300 مسلّم = 2100 دولار. 3) المخزون الزايد مشي في هاذ الرقم.",
    },
    "gulf.invest": {
      title: "الاستثمار",
      meaning: "الإعلانات + تكلفة البضاعة المسلّمة. الفلوس لي حرّكتها باش تدور هاذ التجربة (تقريباً).",
      example: "1) 40 إعلان + 21 بضاعة = 61 دولار استثمار في المثال الصغير. 2) الربح ÷ هذا = ROI. 3) الشحن والكول سنتر في الربح، مشي داخل الاستثمار هنا.",
    },
    "gulf.profit": {
      title: "ربح المحاكاة",
      meaning: "المبيعات ناقص شحن، كول سنتر، COD، إعلان، وبضاعة. ربح التجربة — ما يكتبش في الورقة.",
      example: "1) 159 مبيعات ناقص كل التكاليف = الربح. 2) أخضر ربح، أحمر خسارة. 3) بدّل الدولة وشوف شكون أعلى.",
    },
    "gulf.roi": {
      title: "ROI — شحال رجعت من اللي حطيت",
      meaning:
        "Return on Investment = الربح ÷ الاستثمار (إعلان + بضاعة). 0.3 معناها 30%: كل 1 دولار رجّع 0.30 ربح.",
      example: "1) ربح 30 واستثمار 61 ≈ 0.49 يعني حوالي 49%. 2) الهامش اللي تحت = الربح ÷ المبيعات. 3) ROI سالب = خسرت من اللي حطيت.",
    },
    "gulf.compare": {
      title: "مقارنة الدول بنفس الأرقام",
      meaning:
        "نفس الليدات والتكلفة والتأكيد والسعر، وكل دولة تستعمل نسبة توصيلها وشحنها. باش تشوف شكون أربح قبل ما تصرّف فلوس حقيقية.",
      example:
        "1) حط 1000 ليد و 7 دولار و 0.6 تأكيد. 2) اقرأ عمود الربح و EPD. 3) «قابل للتوسع» يعني EPD قوي — «لا» يعني خسارة في المحاكاة.",
    },
    "dz.page": {
      title: "واش هي حسابات الجزائر؟",
      meaning:
        "محاكاة مثل الخليج: تكتب الليدات والتأكيد والتوصيل. التكلفة وسعر البيع بالدينار؛ الإعلان (CPL) ورسوم المنصة بالدولار من الإعدادات. الشبكة تعرض $ وتحتها تلميح بالدينار.",
      example:
        "1) 1000 ليد، تكلفة 1000 د.ج، سعر 6900 د.ج، CPL 3$. 2) اقرأ الربح و EPD. 3) «من الشيت» يملأ من منتج الجزائر في الحسابات.",
    },
    "dz.sheetProducts": {
      title: "منتجات من ورقة الحسابات",
      meaning: "أرقام حقيقية من تبويب الجزائر في الحسابات — مشي المحاكاة. المبيعات بالدينار كما في الشيت، الربح محسوب بنفس معادلات Cost of Service.",
      example: "1) كورا: مبيعات 161 000 د.ج، ربح و EPD من Delivered والتكاليف. 2) قارن مع المحاكاة فوق إذا المدخلات نفسها. 3) إذا يختلفوا، راجع الليدات والإعلان في الشيت.",
    },
    "dz.netUsd": {
      title: "صافي الدولار",
      meaning: "ربح منتجات الجزائر (ورقي) ناقص تشغيل المكتب، بالدولار. نفس منطق صافي ورقة الحسابات.",
      example: "1) ربح 100 دولار ومكتب 80 = 20 دولار صافي. 2) أحمر = الشهر ياكل فيك. 3) الرقم يجي من منتجات منطقة الجزائر في الورقة.",
    },
    "dz.netDzd": {
      title: "صافي الدينار",
      meaning: "نفس الصافي، مضروب في سعر الصرف. باش تشوف الشهر بالدينار الجزائري.",
      example: "1) 20 دولار × 250 = 5000 د.ج. 2) إذا بدّلت الصرف، الدينار يتبدّل والدولار يبقى. 3) مفيد للكاش المحلي.",
    },
    "dz.confirmDeliver": {
      title: "تأكيد / توصيل الجزائر",
      meaning:
        "النسبة لي في الإعدادات: شحال من ليد يتأكّد، وشحال من مؤكّد يوصل. اكتبهم ككسر (0.6 = 60%).",
      example: "1) 0.6 تأكيد و 0.5 توصيل كيما مثال الكريم: 10→6→3. 2) النسبة تظهر فوق بالمئة. 3) تبدّلها من الخانات تحت.",
    },
    "dz.epd": {
      title: "EPD اختبار الجزائر",
      meaning:
        "ربح كل توصيلة من آلة الاستقرار (اختبار المنتج)، مشي من ورقة الشهر بالضرورة. أخضر إذا فوق عتبة الاستقرار.",
      example: "1) كيما الورقة: ربح ÷ مسلّم. 2) «تحت العتبة» معناها الوصيلة ما زالت ضعيفة. 3) قارن مع EPD في محاكاة 100 ليد تحت.",
    },
    "dz.fx": {
      title: "سعر الصرف دينار لكل دولار",
      meaning: "1 دولار = هاذ العدد دينار. يبدّل كل الأرقام بالدينار في الصفحة. ما يبدّلش منطق الدولار.",
      example: "1) 250 معناها 1 دولار = 250 د.ج. 2) 53 دولار بيع ≈ 13 250 د.ج إذا الصرف 250. 3) حط السعر اللي تخدم بيه نتا (سوق سوداء أو رسمي).",
    },
    "dz.confirm": {
      title: "نسبة التأكيد في الجزائر",
      meaning: "Confirmation: من الليد، شحال يقول آه في التليفون. 0.6 معناها 60%. يتسجّل في الإعدادات.",
      example: "1) 10 ليدات → 6 طلبات إذا 0.6. 2) ما تكتبش 60. 3) هاذ الرقم يمشي لمحاكاة 100 ليد.",
    },
    "dz.delivered": {
      title: "نسبة التوصيل في الجزائر",
      meaning: "Delivered: من المؤكّد، شحال يوصل ويخلّص. المرتجع خارج. 0.5 معناها نصّهم.",
      example: "1) 6 مؤكّدين → 3 مسلّم إذا 0.5. 2) الجزائر أحياناً التوصيل أضعف من الخليج — خليه واقعي. 3) يدخل في محاكاة 100 ليد.",
    },
    "dz.delivery": {
      title: "توصيل بالدينار لكل وصول",
      meaning: "واش تخلّص على التوصيل الناجح، بالدينار للقطعة المسلّمة. البرنامج يحوّله للدولار في المحاكاة.",
      example: "1) إذا التوصيل 600 د.ج والصرف 250: 600÷250 ≈ 2.4 دولار لكل مسلّم. 2) تكتب بالدينار. 3) المرتجع خانة وحدها.",
    },
    "dz.return": {
      title: "مرتجع بالدينار",
      meaning: "تكلفة الطرد اللي رجع (ما خلّصش). بالدينار. مصروف التوصيل الفاشل.",
      example: "1) مرتجع يكلّفك 400 د.ج. 2) تكتب 400. 3) في القمع: من 6 مؤكّدين إذا 3 رجعو، هاذ التكلفة تهمّك.",
    },
    "dz.callCenter": {
      title: "كول سنتر بالدينار",
      meaning: "واش تخلّص مركز الاتصالات بالدينار (حسب عقدك). يظهر في مدخلات السوق الجزائري.",
      example: "1) 200 د.ج لكل تعامل حسب اتفاقك. 2) تكتب الرقم بالدينار. 3) في المحاكاة، رسوم الخدمة بالدولار تجي أيضاً من إعدادات الجزائر.",
    },
    "dz.sim100": {
      title: "محاكاة 100 ليد — دولار ودينار",
      meaning:
        "فرضية: 100 شخص من الإعلان، بنفس تأكيد وتوصيل وسعر المنتج تاع الجزائر. عمود دولار وعمود دينار. ما يكتبش في الورقة.",
      example:
        "1) 100 ليد × 0.6 × 0.5 = 30 مسلّم إذا النسب كيما الكريم. 2) اقرأ سطر الربح بالدولار والدينار. 3) EPD تحت = ربح كل توصيلة ناجحة بالعملتين.",
    },
  },
  fr: {
    "sheet.page": {
      title: "C’est quoi cette feuille ?",
      meaning:
        "Comme un cahier Excel. Cases blanches : VOUS tapez. Cases bleues : l’appli calcule. Le profit ici est un profit papier, pas l’argent dans le tiroir (la caisse est une autre page).",
      example:
        "1) Crème visage : 10 leads, 6 commandes, 3 livrés, ventes 159 $. 2) Le bleu sort le coût de service et le profit. 3) Un chiffre négatif = perte sur le papier ce mois-ci.",
    },
    "sheet.productCost": {
      title: "Coût d’UNE pièce livrée",
      meaning:
        "Prix d’une seule pièce arrivée chez le client (coût Alibaba « landed »). Pas le carton entier ni toute la commande fournisseur.",
      example: "1) La crème coûte 7 $ la pièce livrée. 2) 3 livrés → 7×3 = 21 $ de marchandise. 3) N’écrivez pas le prix des 1000 pièces achetées d’un coup.",
    },
    "sheet.lead": {
      title: "Lead — gens venus de la pub",
      meaning:
        "Un lead = quelqu’un qui a cliqué ou laissé son numéro. Il n’a pas encore acheté. C’est le haut de l’entonnoir.",
      example: "1) Crème visage : 10 leads cette période. 2) Une partie dira oui au téléphone. 3) Un lead cher = pub chère.",
    },
    "sheet.order": {
      title: "Commande — oui au téléphone",
      meaning:
        "Order = le client a dit oui au call center. Commande confirmée, pas encore livrée. Certains refuseront le coursier.",
      example: "1) Sur 10 leads, 6 ont dit oui. 2) Vous tapez 6. 3) 6 sur 10 = 0,6 = 60 % de confirmation.",
    },
    "sheet.delivered": {
      title: "Livré — le coursier a donné et le client a payé",
      meaning:
        "Delivered = colis reçu ET payé (contre-remboursement). Les retours ne comptent pas.",
      example: "1) Sur 6 commandes, 3 sont arrivées et payées. 2) Vous tapez 3. 3) Seuls ces 3 ramènent l’argent.",
    },
    "sheet.sales": {
      title: "Ventes — l’argent payé par les clients",
      meaning:
        "Total Sales = l’argent collecté en COD. Tapez l’argent, pas le nombre de pièces.",
      example: "1) 3 livraisons × environ 53 $ = 159 $. 2) Tapez 159, pas 3. 3) C’est le chiffre d’affaires collecté.",
    },
    "sheet.codCollected": {
      title: "COD collecté — le même chiffre que les ventes",
      meaning:
        "Ce que le coursier a ramassé à la porte. Case bleue recopiée depuis les ventes que vous avez tapées.",
      example: "1) Ventes 159 → collecté 159. 2) Crème : 3×53 = 159 $. 3) Si ça ne colle pas, vérifiez les ventes.",
    },
    "sheet.ads": {
      title: "Dépense pub",
      meaning:
        "Ads Spend = Meta / Google sur la période. La pub principale, pas les petits tests (ligne à part).",
      example: "1) 10 leads × 4 $ / lead = 40 $ de pub. 2) Tapez 40. 3) Plus bas, le tableau peut montrer la pub par commande.",
    },
    "sheet.test": {
      title: "Dépense tests",
      meaning: "Campagnes test en plus : nouvelle créa, nouvelle audience, nouveau produit.",
      example: "1) Test créa à 20 $. 2) 20 ici, la pub normale reste sur Ads. 3) Pas de test → 0.",
    },
    "sheet.adAccount": {
      title: "Frais du compte pub",
      meaning:
        "Autres frais du compte ads : recharges hors spend, agence, frais qui ne sont pas dans Ads Spend.",
      example: "1) Agence 15 $ ce mois. 2) Tapez 15. 3) Si la recharge est déjà dans Ads Spend, ne la mettez pas deux fois.",
    },
    "sheet.productLine": {
      title: "Coût des pièces livrées",
      meaning:
        "Product = coût unitaire × livrés. Calculé. Seulement ce qui est arrivé, pas le stock.",
      example: "1) 7 × 3 = 21 $. 2) Case bleue : vous ne tapez pas. 3) 0 livré → 0.",
    },
    "sheet.leadFee": {
      title: "Frais lead (service)",
      meaning: "Morceau du Cost of Service : chaque lead × tarif lead (souvent 0,50 $). Call center, pas la pub.",
      example: "1) 10 × 0,50 = 5 $. 2) Tarif dans les réglages. 3) Change si vous changez les frais.",
    },
    "sheet.confirmFee": {
      title: "Frais confirmation (service)",
      meaning: "Chaque commande confirmée × tarif confirm (souvent 1 $) pour le call center.",
      example: "1) 6 × 1,00 = 6 $. 2) Case bleue. 3) Un retour après confirm a quand même ce frais.",
    },
    "sheet.deliverFee": {
      title: "Frais livraison réussie (service)",
      meaning: "Chaque livré × tarif livraison (souvent 2 $).",
      example: "1) 3 × 2,00 = 6 $. 2) Seulement payé et reçu. 3) Les retours ne sont pas ici.",
    },
    "sheet.extraFee": {
      title: "Frais extra par confirmation",
      meaning: "Chaque commande confirmée × extra (souvent 3,99 $) selon le contrat call center / COD.",
      example: "1) 6 × 3,99 ≈ 24 $. 2) Bleu depuis les réglages. 3) Tarif 0 → ligne à 0.",
    },
    "sheet.codFee": {
      title: "Commission COD sur les ventes",
      meaning: "Pourcentage des ventes (souvent 5 %) pour la société COD. Pas le prix produit.",
      example: "1) 5 % de 159 ≈ 8 $ (0,05×159). 2) Plus de ventes = plus de commission. 3) % dans les réglages.",
    },
    "sheet.serviceCost": {
      title: "Coût de service total",
      meaning:
        "Somme lead + confirm + livraison + extra + COD. Call center + société COD. PAS le produit, PAS la pub.",
      example: "1) Crème : 5+6+6+24+8 ≈ 49 $ de service. 2) Le bleu additionne. 3) Pub et 7×3 marchandise sont ailleurs.",
    },
    "sheet.bonus": {
      title: "Bonus — un coût en plus que vous voulez compter",
      meaning: "Influenceur, cadeau, concours… optionnel, sur ce produit.",
      example: "1) 30 $ à un influenceur pour la crème. 2) Tapez 30. 3) Rien → 0.",
    },
    "sheet.totalCos": {
      title: "Coût total",
      meaning:
        "Pub + tests + compte ads + marchandise livrée + service + bonus. Tout ce qui est sorti pour ce produit.",
      example: "1) 40 pub + 0 test + 0 compte + 21 produit + service + 0 bonus. 2) Le bleu additionne. 3) Profit = ventes − ce total.",
    },
    "sheet.profits": {
      title: "Profit papier",
      meaning:
        "Ventes moins le coût total. Négatif = perte sur le papier. Ce n’est pas encore le net après le bureau.",
      example: "1) 159 $ de ventes moins les coûts = profit (ou perte). 2) Vert = gain, rouge = perte. 3) Le bureau est le bloc Operations.",
    },
    "sheet.epo": {
      title: "EPO — profit par commande confirmée",
      meaning: "Earn Per Order = profit ÷ commandes. Utile, mais une commande confirmée n’est pas toujours livrée.",
      example: "1) Profit 30 $ et 6 commandes : 30÷6 = 5 $ / commande. 2) Le chiffre important est EPD. 3) 0 commande → 0.",
    },
    "sheet.epd": {
      title: "EPD — profit par livraison (le plus important)",
      meaning: "Earn Per Delivery = profit ÷ livrés. Combien gagnez-vous sur chaque livraison réussie ?",
      example: "1) Profit ÷ 3 livrés. 2) Profit 30 → 30÷3 = 10 $ par livraison. 3) Sous 0 = chaque livraison vous fait perdre.",
    },
    "sheet.ops": {
      title: "Bureau — charges du mois",
      meaning:
        "Salaires, loyer, factures… même si vous vendez 0. Ce n’est pas le coût du produit.",
      example: "1) Salaires + loyer + factures = operations. 2) Une fois par mois. 3) Net = profits produits − ceci.",
    },
    "sheet.salaries": {
      title: "Salaires",
      meaning: "Paie de l’équipe ce mois (confirmation, stock, aide), hors salaires direction.",
      example: "1) Équipe 40 $ ce mois. 2) Tapez 40. 3) Seul et pas de salaire à vous-même → 0, ou un montant pour vous.",
    },
    "sheet.vat": {
      title: "TVA et douane",
      meaning: "Taxes et droits de douane de la période, si vous les comptez en charge de bureau.",
      example: "1) Douane ou TVA 10 $. 2) Tapez 10. 3) Le coût Alibaba unitaire reste dans Product Cost.",
    },
    "sheet.rent": {
      title: "Loyer du bureau",
      meaning: "Loyer du local ce mois. Il court même sans ventes.",
      example: "1) Loyer 25 $. 2) Tapez 25. 3) Maison → 0.",
    },
    "sheet.utilities": {
      title: "Factures — électricité, net, eau",
      meaning: "Charges du local : électricité, internet, eau, téléphone bureau.",
      example: "1) Net + lumière = 8 $. 2) Tapez 8. 3) La pub n’est pas ici — elle est dans Ads Spend.",
    },
    "sheet.mgmt": {
      title: "Salaires direction",
      meaning: "Votre paie ou celle du manager, séparée de l’équipe.",
      example: "1) 20 $ pour vous ce mois. 2) Tapez 20. 3) Pas encore de salaire perso → 0.",
    },
    "sheet.extra": {
      title: "Autre charge bureau",
      meaning: "Dépenses bureau sans case : transport, outils, réparation. Pas le bonus produit du tableau.",
      example: "1) Taxi entrepôt 5 $. 2) Tapez 5. 3) Cadeau influenceur sur UN produit = Bonus du tableau.",
    },
    "sheet.opsTotal": {
      title: "Total bureau",
      meaning: "Salaires + TVA + loyer + factures + direction + autre. Tout le bureau du mois.",
      example: "1) 40+10+25+8+20+5 = 108 par exemple. 2) L’appli additionne. 3) On le retranche des profits produits.",
    },
    "sheet.costPerOp": {
      title: "Coût bureau par commande",
      meaning: "Total bureau ÷ commandes confirmées. Combien le bureau pèse sur chaque order.",
      example: "1) Bureau 80 $ et 6 commandes : 80÷6 ≈ 13 $ / commande. 2) 0 commande → 0. 3) Pour voir si le bureau est trop lourd.",
    },
    "sheet.net": {
      title: "Net après le bureau",
      meaning: "Profits produits − operations. Ce qui reste ce mois après loyer et salaires.",
      example: "1) 100 de profits − 80 de bureau = 20 restants. 2) Bureau plus grand que le profit → mois négatif. 3) En Algérie, aussi en dinars.",
    },
    "gulf.page": {
      title: "C’est quoi le terrain Golfe ?",
      meaning:
        "Un terrain de jeu : « si j’envoie 1000 leads en Arabie ou aux Émirats, qui gagne ? » Ça ne change pas la feuille Comptes.",
      example:
        "1) Mettez 1000 leads, coût 7 $, confirmation 0,6 (60 %). 2) Changez le pays et lisez profit + EPD. 3) Le tableau compare les pays avec les mêmes saisies.",
    },
    "gulf.leads": {
      title: "Nombre de leads (simulation)",
      meaning: "Combien de personnes pub dans ce test. Ça n’écrit pas dans la feuille Comptes.",
      example: "1) 1000 leads KSA. 2) Les mêmes 1000 pour comparer les Émirats. 3) L’exemple crème était 10 — ici vous agrandissez.",
    },
    "gulf.productCost": {
      title: "Coût pièce en $",
      meaning: "Comme la feuille : une pièce livrée (Alibaba landed), en dollar.",
      example: "1) Crème : 7 $. 2) Tapez 7. 3) Multiplié seulement par les livrés.",
    },
    "gulf.cr": {
      title: "Taux de confirmation",
      meaning: "Parmi les leads, combien disent oui au téléphone. Tapez 0,6 pas 60.",
      example: "1) 10 leads, 6 oui. 2) 0,6 = 60 %. 3) Taper 60 casse le calcul.",
    },
    "gulf.dr": {
      title: "Taux de livraison",
      meaning: "Parmi les confirmés, combien arrivent et paient. Les retours hors jeu. 0,5 = la moitié.",
      example: "1) 6 confirmés, 3 livrés : 0,5 = 50 %. 2) Chaque pays a sa fourchette — le bouton met une moyenne. 3) 0,55 = 55 %.",
    },
    "gulf.cpl": {
      title: "Coût par lead (CPL)",
      meaning: "Combien la pub paie pour UNE personne (lead), en $.",
      example: "1) Crème : 4 $ / lead. 2) 10 × 4 = 40 $ de pub. 3) 1000 × 3 $ = 3000 $ de pub.",
    },
    "gulf.price": {
      title: "Prix de vente en monnaie locale",
      meaning: "Ce que le client paie (riyal, dirham…). L’appli convertit en $ avec le taux du pays.",
      example: "1) Crème ≈ 53 $. 2) Si le pays est en riyal, tapez le prix en riyal. 3) Ventes $ = livrés × prix converti.",
    },
    "gulf.confirmed": {
      title: "Confirmés (simulation)",
      meaning: "Leads × taux de confirmation. Résultat, vous ne tapez pas.",
      example: "1) 1000 × 0,6 = 600 confirmés. 2) Mini crème : 10 × 0,6 = 6. 3) Taux 0 → 0.",
    },
    "gulf.delivered": {
      title: "Livrés (simulation)",
      meaning: "Leads × confirmation × livraison. Ceux qui paient vraiment.",
      example: "1) 1000 × 0,6 × 0,5 = 300 livrés. 2) Mini : 10 × 0,6 × 0,5 = 3. 3) C’est le dénominateur de l’EPD.",
    },
    "gulf.sales": {
      title: "Ventes en $",
      meaning: "Livrés × prix (converti en $). Aussi affiché en monnaie locale.",
      example: "1) 3 × 53 $ ≈ 159 $. 2) Avec 1000 leads, même logique en plus grand. 3) Avant de retrancher les coûts.",
    },
    "gulf.epd": {
      title: "EPD — profit par livraison",
      meaning: "Profit ÷ livrés. Le chiffre clé au Golfe : chaque livraison réussie rapporte combien ?",
      example: "1) Profit ÷ 3 dans l’exemple crème. 2) Au-dessus de 10 $ : plus facile d’agrandir. 3) Négatif = chaque livraison perd.",
    },
    "gulf.shipping": {
      title: "Frais d’expédition",
      meaning: "Sur les confirmés (même non livrés) : confirmés × shipping du pays.",
      example: "1) 6 confirmés × tarif pays. 2) KSA ≠ Émirats. 3) D’où un pays gagne et l’autre non avec les mêmes leads.",
    },
    "gulf.callCenter": {
      title: "Call center + extra",
      meaning: "Frais lead, confirm, livré, extra des réglages Golfe. Les appels, pas le shipping.",
      example: "1) Comme la feuille : lead×0,50 + order×1 + livré×2 + order×3,99. 2) Sur 10 / 6 / 3 = petit montant. 3) ×1000 leads ça gonfle.",
    },
    "gulf.cod": {
      title: "Frais COD 5 %",
      meaning: "Commission contre-remboursement : % des ventes (souvent 5 %).",
      example: "1) 5 % de 159 ≈ 8 $. 2) Plus de ventes = plus de frais. 3) % dans les réglages Golfe.",
    },
    "gulf.ads": {
      title: "Pub de la simulation",
      meaning: "Leads × CPL. Ce que Meta/Google coûtent dans ce test.",
      example: "1) 10 × 4 = 40 $. 2) 1000 × 3 = 3000 $. 3) Un CPL trop haut mange le profit.",
    },
    "gulf.productSold": {
      title: "Coût de la marchandise vendue",
      meaning: "Coût pièce × livrés seulement. Pas livré = pas compté ici.",
      example: "1) 7 × 3 = 21 $. 2) 7 × 300 livrés = 2100 $. 3) Le stock restant n’est pas dans ce chiffre.",
    },
    "gulf.invest": {
      title: "Investissement",
      meaning: "Pub + marchandise livrée. L’argent que vous avez bougé pour ce test (approximatif).",
      example: "1) 40 pub + 21 produit = 61 $ dans le mini exemple. 2) Profit ÷ ceci = ROI. 3) Shipping et call center sont dans le profit, pas dans cet investissement.",
    },
    "gulf.profit": {
      title: "Profit de la simulation",
      meaning: "Ventes − shipping − call center − COD − pub − marchandise. N’écrit pas dans la feuille.",
      example: "1) 159 $ de ventes moins tous les coûts = profit. 2) Vert gain, rouge perte. 3) Changez de pays pour voir le gagnant.",
    },
    "gulf.roi": {
      title: "ROI — retour sur l’argent mis",
      meaning: "Profit ÷ investissement (pub + marchandise). 0,3 = 30 % : 1 $ mis rapporte 0,30 $ de profit.",
      example: "1) Profit 30 et invest 61 ≈ 0,49 soit ~49 %. 2) La marge en dessous = profit ÷ ventes. 3) ROI négatif = vous avez perdu de la mise.",
    },
    "gulf.compare": {
      title: "Comparer les pays avec les mêmes saisies",
      meaning:
        "Mêmes leads, coût, confirmation, prix — chaque pays garde son taux de livraison et son shipping. Pour voir qui gagne avant de dépenser vrai.",
      example:
        "1) 1000 leads, 7 $, confirmation 0,6. 2) Lisez profit et EPD. 3) « scalable » ≈ EPD fort — « non » ≈ perte en simulation.",
    },
    "dz.page": {
      title: "C’est quoi les comptes Algérie ?",
      meaning:
        "Simulation comme le Golfe : leads, confirmation, livraison. Coût et prix en DZD ; pub (CPL) et frais plateforme en $ (réglages). Les KPI montrent $ avec un rappel en DZD.",
      example:
        "1) 1000 leads, coût 1000 DA, prix 6900 DA, CPL 3 $. 2) Lisez profit et EPD. 3) « Depuis la feuille » remplit depuis un produit Algérie.",
    },
    "dz.sheetProducts": {
      title: "Produits depuis la feuille P&L",
      meaning: "Chiffres réels du onglet Algérie — pas la simulation. Ventes en DZD comme saisies ; profit = mêmes formules Cost of Service.",
      example: "1) Comparez avec la simulation si les entrées sont identiques. 2) Si ça diverge, vérifiez leads et pub sur la feuille.",
    },
    "dz.netUsd": {
      title: "Net en dollar",
      meaning: "Profits produits Algérie − bureau, en $. Même logique que le net de la feuille.",
      example: "1) 100 $ de profits et 80 $ de bureau = 20 $ net. 2) Rouge = le mois vous mange. 3) Ça vient des produits région Algérie.",
    },
    "dz.netDzd": {
      title: "Net en dinar",
      meaning: "Le même net × le taux. Pour voir le mois en dinars algériens.",
      example: "1) 20 $ × 250 = 5000 DA. 2) Vous changez le taux → le dinar bouge, le dollar reste. 3) Utile pour la caisse locale.",
    },
    "dz.confirmDeliver": {
      title: "Confirmation / livraison Algérie",
      meaning: "Les deux taux des réglages : leads qui disent oui, confirmés qui arrivent. 0,6 = 60 %.",
      example: "1) 0,6 et 0,5 comme la crème : 10→6→3. 2) Affiché en % en haut. 3) Vous les changez dans les cases.",
    },
    "dz.epd": {
      title: "EPD test Algérie",
      meaning: "Profit par livraison de l’outil stabilité (test produit), pas forcément la feuille du mois. Vert si au-dessus du seuil.",
      example: "1) Comme la feuille : profit ÷ livrés. 2) « sous le seuil » = livraison encore faible. 3) Comparez à l’EPD des 100 leads en dessous.",
    },
    "dz.fx": {
      title: "Taux : dinars pour 1 dollar",
      meaning: "1 $ = ce nombre de dinars. Recalcule tout le dinar de la page. Ne change pas la logique dollar.",
      example: "1) 250 → 1 $ = 250 DA. 2) 53 $ de vente ≈ 13 250 DA à 250. 3) Mettez VOTRE taux (marché ou officiel).",
    },
    "dz.confirm": {
      title: "Taux de confirmation Algérie",
      meaning: "Des leads, combien disent oui. 0,6 = 60 %. Enregistré dans les réglages.",
      example: "1) 10 leads → 6 commandes si 0,6. 2) Ne tapez pas 60. 3) Sert à la simu 100 leads.",
    },
    "dz.delivered": {
      title: "Taux de livraison Algérie",
      meaning: "Des confirmés, combien arrivent et paient. Retours exclus. 0,5 = la moitié.",
      example: "1) 6 confirmés → 3 livrés si 0,5. 2) En Algérie la livraison est souvent plus dure qu’au Golfe — soyez réaliste. 3) Entre dans la simu 100 leads.",
    },
    "dz.delivery": {
      title: "Livraison en DA par succès",
      meaning: "Ce que vous payez pour une livraison réussie, en dinars par pièce livrée. Converti en $ dans la simu.",
      example: "1) Livraison 600 DA et taux 250 : 600÷250 ≈ 2,4 $ par livré. 2) Tapez en dinars. 3) Le retour a sa propre case.",
    },
    "dz.return": {
      title: "Retour en dinars",
      meaning: "Coût d’un colis revenu (pas payé), en DA. La livraison ratée.",
      example: "1) Un retour à 400 DA. 2) Tapez 400. 3) Sur 6 confirmés, si 3 reviennent, ce coût compte.",
    },
    "dz.callCenter": {
      title: "Call center en dinars",
      meaning: "Ce que vous payez au centre d’appels en DA, selon votre contrat.",
      example: "1) 200 DA par traitement selon l’accord. 2) Tapez en dinars. 3) Dans la simu, les frais service $ viennent aussi des réglages Algérie.",
    },
    "dz.sim100": {
      title: "Simulation 100 leads — $ et DA",
      meaning:
        "Et si 100 personnes viennent de la pub, avec confirm / livraison / prix Algérie ? Deux colonnes. N’écrit pas dans la feuille.",
      example:
        "1) 100 × 0,6 × 0,5 = 30 livrés si les taux sont ceux de la crème. 2) Lisez la ligne profit en $ et DA. 3) EPD en dessous = profit par livraison réussie dans les deux monnaies.",
    },
  },
  en: {
    "sheet.page": {
      title: "What is this accounts sheet?",
      meaning:
        "This page is like an Excel notebook. White boxes YOU type. Blue cells the app calculates. Profit here is paper profit — not cash in the drawer (cash is another page).",
      example:
        "1) Face cream: type 10 leads, 6 orders, 3 delivered, $159 sales. 2) Blue cells show service cost and profit. 3) A negative number means you lost on paper this month.",
    },
    "sheet.productCost": {
      title: "Cost of ONE delivered piece",
      meaning:
        "Price of a single piece that reached the customer (Alibaba landed cost). Not the whole carton or the whole shipment.",
      example: "1) Face cream costs $7 per delivered piece. 2) 3 delivered → 7×3 = $21 product cost. 3) Do not type the price of 1000 pieces you bought at once.",
    },
    "sheet.lead": {
      title: "Lead — people who came from ads",
      meaning:
        "A lead is someone who clicked or left a number. They have not bought yet. First step in the funnel.",
      example: "1) Face cream: 10 leads this period. 2) Some will say yes on the phone. 3) Expensive leads mean expensive ads.",
    },
    "sheet.order": {
      title: "Order — said yes on the phone",
      meaning:
        "Order = the customer said yes to the call center. Confirmed, not yet delivered. Some will refuse the courier later.",
      example: "1) Of 10 leads, 6 said yes. 2) Type 6 here. 3) 6 of 10 = 0.6 means 60% confirmation.",
    },
    "sheet.delivered": {
      title: "Delivered — courier arrived and customer paid",
      meaning:
        "Delivered = the parcel arrived AND the customer paid (COD). Returns do not count.",
      example: "1) Of 6 orders, 3 were delivered and paid. 2) Type 3. 3) Those 3 are the ones that bring money.",
    },
    "sheet.sales": {
      title: "Sales — money customers paid",
      meaning:
        "Total Sales = COD money collected. Type the money, not the piece count.",
      example: "1) 3 delivered × about $53 = $159. 2) Type 159, not 3. 3) That is cash collected from customers.",
    },
    "sheet.codCollected": {
      title: "COD collected — the same sales number",
      meaning:
        "What the courier collected at the door. Blue cell from the sales you typed above.",
      example: "1) Sales 159 → collected 159. 2) Face cream: 3×$53 = $159. 3) If it differs, check the sales you entered.",
    },
    "sheet.ads": {
      title: "Ads spend",
      meaning:
        "Meta / Google spend this period. Main ads, not small tests (tests have their own row).",
      example: "1) 10 leads × $4 per lead = $40 ads. 2) Type 40. 3) Lower in the sheet, ads may also show per order.",
    },
    "sheet.test": {
      title: "Test spend",
      meaning: "Extra test campaigns: new creative, new audience, new product. On top of normal ads.",
      example: "1) You tested a new ad for $20. 2) Type 20 here; keep normal ads on Ads Spend. 3) No tests → 0.",
    },
    "sheet.adAccount": {
      title: "Ad account fees",
      meaning:
        "Other ad-account costs: top-ups not in ads spend, agency fee, extra charges.",
      example: "1) Agency took $15 this month. 2) Type 15. 3) If the top-up is already in Ads Spend, do not count it twice.",
    },
    "sheet.productLine": {
      title: "Product cost × delivered",
      meaning:
        "Unit cost × delivered count. Calculated. Only pieces that arrived, not warehouse stock.",
      example: "1) $7 × 3 delivered = $21. 2) Blue cell: you do not type it. 3) 0 delivered → $0.",
    },
    "sheet.leadFee": {
      title: "Lead fee (service)",
      meaning: "Part of Cost of Service: each lead × lead fee in settings (often $0.50). Call center, not ads.",
      example: "1) 10 × 0.50 = $5. 2) Rate comes from settings. 3) It changes if you change fees there.",
    },
    "sheet.confirmFee": {
      title: "Confirm fee (service)",
      meaning: "Part of Cost of Service: each confirmed order × confirm fee (often $1) for the call center.",
      example: "1) 6 × 1.00 = $6. 2) Blue cell. 3) A return after confirm still paid this fee.",
    },
    "sheet.deliverFee": {
      title: "Delivered fee (service)",
      meaning: "Part of Cost of Service: each delivered × delivery fee (often $2).",
      example: "1) 3 × 2.00 = $6. 2) Only arrived and paid. 3) Returns are not here.",
    },
    "sheet.extraFee": {
      title: "Extra fee per confirmation",
      meaning: "Part of Cost of Service: each confirmed order × extra (often $3.99) per your call-center / COD contract.",
      example: "1) 6 × 3.99 ≈ $24. 2) Blue, from settings. 3) Fee 0 in settings → this row is 0.",
    },
    "sheet.codFee": {
      title: "COD fee on sales",
      meaning: "Part of Cost of Service: a percent of sales (often 5%) for the COD company. Not product cost.",
      example: "1) 5% of 159 ≈ $8 (0.05×159). 2) More sales → more fee. 3) Percent is in settings.",
    },
    "sheet.serviceCost": {
      title: "Service cost (all of it)",
      meaning:
        "Sum of lead + confirm + deliver + extra + COD fees. Call center + COD company. NOT product, NOT ads.",
      example: "1) Face cream: 5+6+6+24+8 ≈ $49 service. 2) Blue adds them. 3) Ads and 7×3 product sit on other rows.",
    },
    "sheet.bonus": {
      title: "Bonus — extra cost you want to count",
      meaning: "Influencer, gift, contest — optional, on this product.",
      example: "1) You paid $30 to an influencer for the cream. 2) Type 30. 3) Nothing extra → 0.",
    },
    "sheet.totalCos": {
      title: "Total cost",
      meaning:
        "Ads + test + ad account + product + service + bonus. Everything that went out for this product.",
      example: "1) $40 ads + $0 test + $0 account + $21 product + service + $0 bonus. 2) Blue sums it. 3) Profit = sales minus this total.",
    },
    "sheet.profits": {
      title: "Paper profit",
      meaning:
        "Sales minus total cost. If negative, you lost on paper. This is not yet net after office costs.",
      example: "1) $159 sales minus costs = profit (or loss). 2) Green = gain, red = loss. 3) Office costs are in Operations below.",
    },
    "sheet.epo": {
      title: "EPO — profit per confirmed order",
      meaning: "Earn Per Order = profit ÷ orders. Useful, but a confirmed order is not always delivered.",
      example: "1) $30 profit and 6 orders: 30÷6 = $5 per order. 2) The important number is EPD. 3) 0 orders → 0.",
    },
    "sheet.epd": {
      title: "EPD — profit per delivery (the important one)",
      meaning: "Earn Per Delivery = profit ÷ delivered. How much each successful delivery earned you.",
      example: "1) Profit ÷ 3 delivered. 2) $30 profit → 30÷3 = $10 per delivery. 3) Below 0 means each arrival loses money.",
    },
    "sheet.ops": {
      title: "Office costs — monthly",
      meaning:
        "Salaries, rent, bills… even if you sell 0. Not product cost.",
      example: "1) Salaries + rent + bills = operations. 2) Type them once a month. 3) Net = product profits minus this.",
    },
    "sheet.salaries": {
      title: "Salaries",
      meaning: "Team pay this month (confirmation, warehouse, help), not management salaries.",
      example: "1) Staff $40 this month. 2) Type 40. 3) Solo and you do not pay yourself → 0, or type a wage for yourself.",
    },
    "sheet.vat": {
      title: "VAT and duty",
      meaning: "VAT and customs for the period, if you count them as office cost.",
      example: "1) Customs or VAT $10. 2) Type 10. 3) Alibaba piece cost stays in Product Cost, not here.",
    },
    "sheet.rent": {
      title: "Office rent",
      meaning: "Shop or office rent this month. It runs even with zero sales.",
      example: "1) Rent $25. 2) Type 25. 3) Working from home → 0.",
    },
    "sheet.utilities": {
      title: "Utilities — power, net, water",
      meaning: "Office bills: electricity, internet, water, office phone.",
      example: "1) Net + power = $8. 2) Type 8. 3) Ad invoices are not here — they belong in Ads Spend.",
    },
    "sheet.mgmt": {
      title: "Management salaries",
      meaning: "Your pay or the manager’s, separate from the team.",
      example: "1) You took $20 this month. 2) Type 20. 3) Not paying yourself yet → 0.",
    },
    "sheet.extra": {
      title: "Other office cost",
      meaning: "Office spend with no box: transport, tools, repair. Not the product Bonus row above.",
      example: "1) Warehouse taxi $5. 2) Type 5. 3) Influencer gift on ONE product = Bonus in the table.",
    },
    "sheet.opsTotal": {
      title: "Total operations",
      meaning: "Salaries + VAT + rent + utilities + management + extra. The whole office this month.",
      example: "1) 40+10+25+8+20+5 = 108 for example. 2) The app adds them. 3) This is subtracted from product profits.",
    },
    "sheet.costPerOp": {
      title: "Office cost per order",
      meaning: "Office total ÷ confirmed orders. How heavy the office is on each order.",
      example: "1) Office $80 and 6 orders: 80÷6 ≈ $13 per order. 2) 0 orders → 0. 3) Shows if the office is too heavy for sales.",
    },
    "sheet.net": {
      title: "Net after the office",
      meaning: "Product profits minus office. What is left this month after rent and salaries.",
      example: "1) 100 profit − 80 office = 20 left. 2) Office bigger than profit → negative month. 3) For Algeria, also shown in dinars.",
    },
    "gulf.page": {
      title: "What is the Gulf playground?",
      meaning:
        "A playground: “if I send 1000 leads to KSA vs UAE, who wins?” These numbers do not change the accounts sheet.",
      example:
        "1) Put 1000 leads, $7 product, confirmation 0.6 (that means 60%). 2) Switch country and read profit + EPD. 3) The table below compares countries with the same inputs.",
    },
    "gulf.leads": {
      title: "Leads in this test",
      meaning: "How many ad people you put in the simulation. It does not write into the accounts sheet.",
      example: "1) 1000 leads to KSA. 2) The same 1000 can be compared to UAE in the table. 3) The cream example was 10 — here you scale up.",
    },
    "gulf.productCost": {
      title: "Product cost in $",
      meaning: "Same idea as the sheet: one delivered piece (Alibaba landed), in dollars.",
      example: "1) Face cream: $7. 2) Type 7. 3) The app multiplies only by delivered, not by every lead.",
    },
    "gulf.cr": {
      title: "Confirmation rate",
      meaning: "Of every lead, how many said yes on the phone. Type 0.6, not 60.",
      example: "1) 10 leads, 6 said yes. 2) 0.6 means 60%. 3) Typing 60 breaks the math.",
    },
    "gulf.dr": {
      title: "Delivered rate",
      meaning: "Of confirmed orders, how many arrived and paid. Returns do not count. Type 0.5 if half arrive.",
      example: "1) 6 confirmed, 3 delivered: 0.5 means 50%. 2) Each country has a range — the button sets a typical middle. 3) 0.55 means 55%.",
    },
    "gulf.cpl": {
      title: "Cost per lead (CPL)",
      meaning: "What you pay in ads to get ONE person (lead), in dollars.",
      example: "1) Face cream: $4 per lead. 2) 10 × 4 = $40 ads. 3) 1000 × $3 = $3000 ads.",
    },
    "gulf.price": {
      title: "Selling price in local currency",
      meaning: "What the customer pays (riyal, dirham…). The app converts to USD with that country’s rate.",
      example: "1) Face cream about $53. 2) If the country uses riyal, type the riyal price. 3) USD sales = delivered × converted price.",
    },
    "gulf.confirmed": {
      title: "Confirmed (simulation)",
      meaning: "Leads × confirmation rate. A result — you do not type it.",
      example: "1) 1000 × 0.6 = 600 confirmed. 2) Small cream example: 10 × 0.6 = 6. 3) Rate 0 → 0.",
    },
    "gulf.delivered": {
      title: "Delivered (simulation)",
      meaning: "Leads × confirmation × delivered rate. These are the people who paid.",
      example: "1) 1000 × 0.6 × 0.5 = 300 delivered. 2) Small example: 10 × 0.6 × 0.5 = 3. 3) This is the EPD denominator.",
    },
    "gulf.sales": {
      title: "Sales in USD",
      meaning: "Expected money from delivered × selling price (converted to USD). Also shown in local currency.",
      example: "1) 3 delivered × $53 ≈ $159. 2) With 1000 leads the same math, bigger. 3) This is before costs.",
    },
    "gulf.epd": {
      title: "EPD — profit per delivery",
      meaning: "Profit ÷ delivered. The important Gulf number: how much each successful delivery earned.",
      example: "1) Profit ÷ 3 in the cream example. 2) Above $10 is often easier to scale. 3) Negative = each arrival loses money.",
    },
    "gulf.shipping": {
      title: "Shipping cost",
      meaning: "Charged on confirmed orders (even if they do not arrive): confirmed × that country’s shipping.",
      example: "1) 6 confirmed × country shipping. 2) KSA is not UAE. 3) That is why one country can win and another lose with the same leads.",
    },
    "gulf.callCenter": {
      title: "Call center + extra",
      meaning: "Lead, confirm, delivered, and extra fees from Gulf settings. Phone service, not shipping.",
      example: "1) Like the sheet: lead×0.50 + order×1 + delivered×2 + order×3.99. 2) On 10 / 6 / 3 it is a small amount. 3) At 1000 leads it scales up.",
    },
    "gulf.cod": {
      title: "COD fee 5%",
      meaning: "Cash-on-delivery commission: a percent of sales (often 5%).",
      example: "1) 5% of 159 ≈ $8. 2) More sales → more fee. 3) Percent comes from Gulf settings.",
    },
    "gulf.ads": {
      title: "Ads in the simulation",
      meaning: "Leads × CPL. What Meta/Google cost in this test.",
      example: "1) 10 × 4 = $40. 2) 1000 × 3 = $3000. 3) A high CPL eats profit fast.",
    },
    "gulf.productSold": {
      title: "Cost of goods sold",
      meaning: "Piece cost × delivered only. Not delivered → not counted here.",
      example: "1) 7 × 3 = $21. 2) 7 × 300 delivered = $2100. 3) Leftover stock is not in this number.",
    },
    "gulf.invest": {
      title: "Investment",
      meaning: "Ads + delivered product cost. Money you moved to run this test (roughly).",
      example: "1) $40 ads + $21 product = $61 in the small example. 2) Profit ÷ this = ROI. 3) Shipping and call center sit in profit, not in this investment.",
    },
    "gulf.profit": {
      title: "Simulation profit",
      meaning: "Sales minus shipping, call center, COD, ads, and product. Playground profit — it does not write the sheet.",
      example: "1) $159 sales minus all costs = profit. 2) Green gain, red loss. 3) Switch country to see who wins.",
    },
    "gulf.roi": {
      title: "ROI — what you got back from what you put in",
      meaning: "Profit ÷ investment (ads + product). 0.3 means 30%: each $1 put in returned $0.30 profit.",
      example: "1) $30 profit and $61 invest ≈ 0.49, about 49%. 2) The margin underneath = profit ÷ sales. 3) Negative ROI = you lost the money you put in.",
    },
    "gulf.compare": {
      title: "Compare countries with the same inputs",
      meaning:
        "Same leads, cost, confirmation, and price — each country keeps its delivery rate and shipping. See who wins before you spend real money.",
      example:
        "1) Put 1000 leads, $7, confirmation 0.6. 2) Read profit and EPD. 3) “Can scale” ≈ strong EPD — “No” ≈ loss in the simulation.",
    },
    "dz.page": {
      title: "What is the Algeria page?",
      meaning:
        "Gulf-style simulation: leads, confirm, deliver rates. Product cost and sell price in DZD; ads (CPL) and platform fees in USD from settings. KPIs show $ with a DZD hint.",
      example:
        "1) 1000 leads, cost 1000 DZD, price 6900 DZD, CPL $3. 2) Read profit and EPD. 3) “From sheet” fills from an Algeria product on Accounts.",
    },
    "dz.sheetProducts": {
      title: "Products from the accounts sheet",
      meaning: "Real numbers from the Algeria tab — not the simulator. Sales in DZD as entered; profit uses the same Cost of Service math.",
      example: "1) Match the simulator when inputs are the same. 2) If not, check leads and ad spend on the sheet.",
    },
    "dz.netUsd": {
      title: "Net in USD",
      meaning: "Algeria product profits minus office, in dollars. Same logic as the accounts-sheet net.",
      example: "1) $100 profit and $80 office = $20 net. 2) Red = the month is eating you. 3) It comes from Algeria-region products on the sheet.",
    },
    "dz.netDzd": {
      title: "Net in dinars",
      meaning: "The same net × the exchange rate. So you see the month in Algerian dinars.",
      example: "1) $20 × 250 = 5000 DZD. 2) Change the rate → dinars move, dollars stay. 3) Useful for local cash.",
    },
    "dz.confirmDeliver": {
      title: "Algeria confirm / deliver",
      meaning: "The two rates in settings: how many leads confirm, how many confirmed arrive. 0.6 means 60%.",
      example: "1) 0.6 confirm and 0.5 deliver like the cream: 10→6→3. 2) Shown as % on top. 3) Change them in the boxes below.",
    },
    "dz.epd": {
      title: "Algeria test EPD",
      meaning: "Profit per delivery from the stability tester (product test), not always the monthly sheet. Green if above the stability line.",
      example: "1) Like the sheet: profit ÷ delivered. 2) “Under the line” means delivery profit is still weak. 3) Compare with EPD in the 100-lead table below.",
    },
    "dz.fx": {
      title: "Exchange: dinars per 1 dollar",
      meaning: "1 dollar = this many dinars. Recalculates every dinar figure on the page. Does not change dollar logic.",
      example: "1) 250 means 1 dollar = 250 DZD. 2) $53 selling price ≈ 13,250 DZD at 250. 3) Use YOUR working rate (street or official).",
    },
    "dz.confirm": {
      title: "Algeria confirmation rate",
      meaning: "Of leads, how many say yes on the phone. 0.6 means 60%. Saved in settings.",
      example: "1) 10 leads → 6 orders if 0.6. 2) Do not type 60. 3) This feeds the 100-lead simulation.",
    },
    "dz.delivered": {
      title: "Algeria delivered rate",
      meaning: "Of confirmed, how many arrive and pay. Returns out. 0.5 means half.",
      example: "1) 6 confirmed → 3 delivered if 0.5. 2) Algeria delivery is often harder than the Gulf — keep it realistic. 3) Used in the 100-lead simulation.",
    },
    "dz.delivery": {
      title: "Delivery in DZD per success",
      meaning: "What you pay for a successful delivery, in dinars per delivered piece. Converted to USD in the simulation.",
      example: "1) Delivery 600 DZD and rate 250: 600÷250 ≈ $2.4 per delivered. 2) Type dinars. 3) Returns have their own box.",
    },
    "dz.return": {
      title: "Return cost in dinars",
      meaning: "Cost of a parcel that came back (not paid), in DZD. Failed delivery cost.",
      example: "1) A return costs 400 DZD. 2) Type 400. 3) Of 6 confirmed, if 3 come back, this cost matters.",
    },
    "dz.callCenter": {
      title: "Call center in dinars",
      meaning: "What you pay the call center in DZD, per your contract.",
      example: "1) 200 DZD per handling, if that is the deal. 2) Type dinars. 3) In the simulation, USD service fees also come from Algeria settings.",
    },
    "dz.sim100": {
      title: "100-lead simulation — USD and DZD",
      meaning:
        "What if 100 people come from ads, using Algeria confirm, deliver, and price? Two columns. Does not write the accounts sheet.",
      example:
        "1) 100 × 0.6 × 0.5 = 30 delivered if rates match the cream example. 2) Read the profit row in USD and DZD. 3) EPD below = profit per successful delivery in both currencies.",
    },
  },
};
