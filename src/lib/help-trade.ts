import type { HelpBundle } from "./help-types";

export const tradeHelp: HelpBundle = {
  ar: {
    "ab.page": {
      title: "شحنة علي بابا — من الطلب للمخزن",
      meaning:
        "هنا تتبع كريم الوجه من الصين حتى يوصل المخزن، وتحسب السعر الحقيقي للقطعة بعد الشحن والجمارك. سعر علي بابا وحده ما يكفي.",
      example:
        "صين 5$ للقطعة، وزن 0.2 كغ، شحن بحري 9$/كغ، كمية 100، جمارك 0.3 يعني 30% مش الرقم 30. البضاعة 5×100=500. الشحن 0.2×9×100=180. الجمارك 30% من (500+180)=204. الإجمالي 500+180+204=884. القطعة 8.84$. هذا 8.84 هو Product Cost في الحاسبة والشيت — مش الـ 5$ تاع الصين.",
    },
    "ab.product": {
      title: "اسم المنتج",
      meaning: "الاسم اللي تتعرف به الشحنة. نفس الاسم اللي في المخزن يسهّل التتبع.",
      example: "كريم وجه مرطّب 50 مل — مش كود المصنع الطويل.",
    },
    "ab.supplier": {
      title: "المورّد",
      meaning: "اسم المصنع أو الشركة في علي بابا. باه تعرف منين طلبت إذا وقع تأخير.",
      example: "Guangzhou Skin Lab — نفس الاسم في المحادثة والفاتورة.",
    },
    "ab.url": {
      title: "رابط علي بابا",
      meaning: "رابط صفحة المنتج. تفتحه غدوة وما تبحثش من جديد.",
      example: "الصق رابط كريم الوجه من علي بابا هنا.",
    },
    "ab.dest": {
      title: "الوجهة",
      meaning: "وين توصل الحاوية أو الطرد: الخليج أو الجزائر.",
      example: "KSA للرياض، DZ للجزائر. الوجهة تبدّل الجمارك وأيام الطريق.",
    },
    "ab.status": {
      title: "حالة الشحنة",
      meaning:
        "وين وصلت دابا، بكلام بسيط: مسودة = لسة ما طلبتش. تم الطلب = دفعت للصين. إنتاج = المصنع يخدم. في الطريق = خرجات من الصين. جمارك = في الميناء. وصلت = في البلد. في المخزن = جاهزة للبيع.",
      example:
        "كريم الوجه لسة في المصنع؟ حط إنتاج. السفينة مشات؟ في الطريق. خلصت الجمارك ودخلات المخزن؟ في المخزن — من هنا تحسبها مخزون.",
    },
    "ab.orderDate": {
      title: "تاريخ الطلب",
      meaning: "يوم ما ثبّت الطلب عند المورّد. منه نحسب موعد الوصول: تاريخ + أيام الإنتاج + أيام الشحن.",
      example: "طلبت 1 سبتمبر، إنتاج 10 أيام، شحن 20. الوصول المتوقع 1 أكتوبر.",
    },
    "ab.china": {
      title: "سعر الصين للقطعة",
      meaning: "سعر المصنع فقط، قبل الشحن والجمارك. هذا ما هوش تكلفة المنتج عندك.",
      example: "كريم الوجه 5$ في علي بابا. بعد الشحن والجمارك يولي 8.84$ — هذا اللي يهمك.",
    },
    "ab.weight": {
      title: "وزن القطعة",
      meaning: "وزن القطعة بالكيلو، مع الكرتون الخفيف. الشحن يتحسب على الوزن.",
      example: "0.2 كغ يعني 200 غرام. 100 قطعة = 20 كغ شحن.",
    },
    "ab.sea": {
      title: "سعر الشحن لكل كيلو",
      meaning: "كم دولار للكغ بحراً (أو جو إذا حطيت سعر الجو). في الملف الافتراضي 9$ للكغ.",
      example: "9$ × 0.2 كغ × 100 قطعة = 180$ شحن لكل الطلب.",
    },
    "ab.qty": {
      title: "الكمية",
      meaning: "عدد القطع في الشحنة. كل الحسابات تضرب في هذا الرقم.",
      example: "100 كريم وجه. البضاعة 5×100=500$. القطعة الواصلة = الإجمالي ÷ 100.",
    },
    "ab.customs": {
      title: "نسبة الجمارك",
      meaning: "تكتب كسر: 0.3 يعني 30%. ما تكتبش 30 — وإلا الحساب يولي خيالي. النسبة على (البضاعة + الشحن).",
      example: "جمارك الجزائر 0.3. 0.3 × (500+180) = 204$. لو كتبت 30، النتيجة غلط كبير.",
    },
    "ab.other": {
      title: "رسوم أخرى",
      meaning: "فلوس زيادة: وسيط، تخزين ميناء، نقل داخلي، تأمين. تتحط على الإجمالي كامل.",
      example: "وسيط 50$ + نقل للمخزن 30$ = 80$ هنا. تتقسم على 100 قطعة.",
    },
    "ab.prodDays": {
      title: "أيام الإنتاج",
      meaning: "كم يوم المصنع يحتاج يصنّع ويغلّف قبل ما يشحن.",
      example: "كريم الوجه جاهز في 10 أيام بعد الدفع. زيدهم على تاريخ الطلب.",
    },
    "ab.transit": {
      title: "أيام الشحن",
      meaning: "أيام البحر أو الجو من الصين حتى بابك، بدون الإنتاج.",
      example: "بحر للجزائر غالباً 20–25 يوم. جو أسرع وأغلى — بدّل سعر الكغ فوق.",
    },
    "ab.goods": {
      title: "قيمة البضاعة",
      meaning: "سعر الصين × الكمية. هذا شيك المصنع، قبل الشحن.",
      example: "5$ × 100 = 500$. لسة ما دخلش الشحن ولا الجمارك.",
    },
    "ab.shipping": {
      title: "تكلفة الشحن",
      meaning: "الوزن × سعر الكغ × الكمية. هذا أجر الطريق.",
      example: "0.2 × 9 × 100 = 180$. نفس كريم الوجه: 20 كغ × 9$ = 180$.",
    },
    "ab.customsMoney": {
      title: "فلوس الجمارك",
      meaning: "النسبة × (البضاعة + الشحن). رقم بالدولار، مش النسبة.",
      example: "0.3 يعني 30%. 30% من (500+180) = 204$. هذا الكاش اللي يخرج في الميناء.",
    },
    "ab.total": {
      title: "إجمالي الشحنة",
      meaning: "بضاعة + شحن + جمارك + رسوم أخرى. كل ما دفعت باش الشحنة توصل.",
      example: "500 + 180 + 204 = 884$ (بدون رسوم أخرى). هذا المبلغ كامل، مش للقطعة.",
    },
    "ab.perUnit": {
      title: "التكلفة الواصلة للقطعة",
      meaning:
        "الإجمالي ÷ الكمية. هذا سعر القطعة الحقيقي في المخزن. حط هذا الرقم في الحاسبة والشيت كـ Product Cost — ما تحطش سعر الصين.",
      example:
        "884 ÷ 100 = 8.84$. كريم الوجه ما يكلّفكش 5$. يكلّفك 8.84$. إذا بعت بـ 5$ تخسر قبل الإعلانات.",
    },

    "win.page": {
      title: "دفتر أفكار — قبل ما تكبر الطلب",
      meaning:
        "هنا تقيّم المنتج من 0 إلى 10 قبل ما تطلب كمية كبيرة. النقطة العالية ما تعنيش ربح. بعد ما تعجبك الفكرة، خذ التكلفة الواصلة وجرّبها في الحاسبة.",
      example:
        "كريم الوجه جا 8/10. الفكرة باهية. قبل 1000 قطعة: حط 8.84$ في الحاسبة كـ Product Cost. إذا الربح طلع، بدّل الحالة إلى قيد الاختبار.",
    },
    "win.niche": {
      title: "النيش",
      meaning: "لمن هذا المنتج؟ فئة الزبائن أو المشكلة. يساعدك ما تخلطش أفكار مختلفة.",
      example: "عناية بشرة نسائية 25–40 — مش صحة عامة.",
    },
    "win.status": {
      title: "حالة الاختبار",
      meaning:
        "لم يُختبر = لسة ما صرفت إعلان. قيد الاختبار = إعلان صغير يخدم. رابحة = الناس تشري والحاسبة تقول ربح. خاسرة = وقف الصرف. معلّقة = الفكرة باهية لكن دابا مش الوقت (فلوس، موسم، مخزن).",
      example:
        "بديت إعلان كريم الوجه اليوم: قيد الاختبار. بعد أسبوع الربح باين: رابحة. الزبائن ما يحبوهش: خاسرة. المصنع واقف أسبوعين: معلّقة.",
    },
    "win.china": {
      title: "سعر الصين",
      meaning: "سعر المصنع للقطعة، للمقارنة السريعة. التكلفة الحقيقية تجي من شاشة علي بابا بعد الشحن.",
      example: "5$ كريم الوجه في الصين. ما تستعملش هذا في الحاسبة — استعمل 8.84$ الواصلة.",
    },
    "win.price": {
      title: "سعر البيع",
      meaning: "السعر اللي تفكر تبيع به الزبون. قارنه بالسعر المقترح تحت.",
      example: "كريم الوجه 25$ للزبون. الصين 5$ والواصلة 8.84$ — الفرق هذا يغطي إعلان وكول سنتر وربح.",
    },
    "win.weight": {
      title: "الوزن",
      meaning: "وزن تقريبي بالكيلو. نستعملوه لتقدير الشحن (9$ للكغ) والسعر المقترح.",
      example: "0.2 كغ → شحن تقريبي 1.8$ فوق سعر الصين. 5 + 1.8 = 6.8$ قبل الجمارك.",
    },
    "win.url": {
      title: "رابط المنتج",
      meaning: "رابط علي بابا أو المورّد. ترجع له ساعة الطلب.",
      example: "الصق رابط كريم الوجه هنا باه الفريق يلقا المصنع بسرعة.",
    },
    "win.criteria": {
      title: "ستة أسئلة — من 0 إلى 10",
      meaning:
        "كل شريط سؤال. المعدل يظهر تحت. نقطة عالية = فكرة تستاهل تجربة، مش ربح مضمون. بعد النقاط، افتح الحاسبة بالتكلفة الواصلة.",
      example:
        "1) يحل مشكلة: جفاف البشرة. 2) Wow: النتيجة باينة في الصور. 3) صعب تلقاها في المحل. 4) منافسة ضعيفة. 5) الزبون يشوفها تستاهل السعر. 6) تقدر تطلب 100 بعدين 1000. المعدل 8/10 لسة يحتاج حساب 8.84$ في الحاسبة.",
    },
    "win.problem": {
      title: "يحل مشكلة",
      meaning: "الزبون يشري لأن عنده ألم أو حاجة يومية، مش غير لأنه شاف إعلان.",
      example: "كريم الوجه للجفاف بعد الغسيل — مشكلة واضحة. ديكور شكل غريب بلا فايدة = نقطة ضعيفة.",
    },
    "win.wow": {
      title: "عامل المفاجأة",
      meaning: "أول 3 ثواني في الإعلان: يوقف السكرول ولا لا؟",
      example: "كريم يلمع البشرة في فيديو قبل/بعد = Wow عالي. علبة بيضاء بلا فرق واضح = Wow ضعيف.",
    },
    "win.availability": {
      title: "صعب تلقاها في المحل",
      meaning: "إذا كانت في كل صيدلية بجنب الدار، الإعلان يدفعك تنافس المحل. الأفضل شيء ما يلقاهش بسهولة.",
      example: "تركيبة خاصة من الصين ما كايناش في السوق المحلي = نقطة عالية.",
    },
    "win.competition": {
      title: "منافسة ضعيفة",
      meaning: "10 يعني قلال اللي يبيعو نفس الشيء. 2 يعني السوق عامر وإعلانات غالية.",
      example: "كريم وجه عام تتلاقا 50 بائع = منافسة قوية (نقطة ضعيفة). حل ضيق قليل الإعلانات = نقطة عالية.",
    },
    "win.value": {
      title: "قيمة مدركة",
      meaning: "الزبون يحس المنتج يستاهل السعر، حتى قبل ما يجربه. التغليف والوعد يرفعو الإحساس.",
      example: "علبة زجاج ووعد واضح بـ 25$ تمر. كيس بلاستيك رخيص بـ 25$ يبان غالي.",
    },
    "win.scale": {
      title: "قابل للتوسع",
      meaning: "تقدر تزيد الكمية غدوة؟ المصنع يقدر، والشحن والمخزن يتحملو؟",
      example: "المورد يقدر 100 غدوة و5000 الشهر الجاي = قابل للتوسع. حد أقصى 80 قطعة في الشهر = ضعيف.",
    },
    "win.score": {
      title: "المعدل من 10",
      meaning: "متوسط الستة أسئلة. معدل عالي ما هوش ربح. الربح يبان غير في الحاسبة بعد التكلفة الواصلة والإعلانات.",
      example: "كريم الوجه 8.2/10. باهي. إذا الواصلة 8.84$ وسعر البيع 12$، الحاسبة تقدر تقول خسارة — المعدل ما ينقذش.",
    },
    "win.suggestPrice": {
      title: "سعر بيع مقترح",
      meaning: "تقدير خشن من سعر الصين + شحن 9$/كغ، باه تغطي طريق وكول سنتر وإعلان وربح. ما يعوّضش الحاسبة.",
      example: "صين 5$ ووزن 0.2 → واصلة تقريبية 6.8$ (بدون جمارك). المقترح أعلى. للجمارك 30% استعمل 8.84$ من علي بابا.",
    },

    "set.page": {
      title: "آلة الرسوم — ورا Cost of Service",
      meaning:
        "الأرقام هنا هي عقدك مع الكول سنتر وشركة التوصيل. أي رسم تبدّله هنا يبدّل الخلايا الزرقاء في الحسابات وتكلفة الخدمة في الحاسبة. عمود الخليج وعمود الجزائر: نفس الفكرة، عقود مختلفة.",
      example:
        "ليد الخليج 0.50$. 10 ليدات = 5$ في Cost of Service. زر إعادة البيانات التجريبية يمسح كل اللي كتبت ويرجع أرقام العرض. ما تضغطوش إلا إذا بغيتي ترجع من الصفر.",
    },
    "set.fx": {
      title: "الدينار لكل دولار",
      meaning: "كم دينار جزائري يعادل 1 دولار. باه تشوف الكاش بالدينار، ما يبدّلش حساب الدولار.",
      example: "245 يعني 1$ = 245 د.ج. قطعة بـ 8.84$ تظهر حوالي 2166 د.ج. بدّل الرقم إذا السوق تبدّل.",
    },
    "set.dzConfirm": {
      title: "نسبة تأكيد الجزائر",
      meaning: "من كل 100 ليد، كم واحد يقول نعم للكول سنتر. اكتُب 0.48 يعني 48%، مش 48.",
      example: "0.48: 100 ليد → 48 طلب مؤكد. إذا كتبت 48، الحساب يتكسر.",
    },
    "set.dzDelivered": {
      title: "نسبة توصيل الجزائر",
      meaning: "من الطلبات المؤكدة، كم واحد يوصل ويدفعلك الكاش. 0.42 يعني 42%، مش 42.",
      example: "48 مؤكد × 0.42 = حوالي 20 مسلَّم. الباقي إلغاء أو مرتجع — ما يدخلش كاش.",
    },
    "set.leadFee": {
      title: "رسم كل ليد",
      meaning: "الكول سنتر ياخذ هذا المبلغ على كل رقم يتصلو به، حتى اللي ما شراش. نفس الفكرة في الخليج والجزائر، السعر يختلف حسب العقد.",
      example: "0.50$ لليد. 10 ليدات = 5$. في الشيت هذا الصف الأزرق Lead × الرسم.",
    },
    "set.confirmFee": {
      title: "رسم كل تأكيد",
      meaning: "فلوس زيادة على كل طلب قال عليه الزبون نعم. ما يتحسبش على اللي رفض.",
      example: "1$ لكل تأكيد. 8 تأكيدات = 8$. يظهر في الخلايا الزرقاء تحت Cost of Service.",
    },
    "set.extra": {
      title: "إضافي على كل تأكيد",
      meaning: "رسم منصة أو اتصال زيادة فوق رسم التأكيد. في الخليج غالباً 3.99$. في الجزائر قد يكون 0 إذا العقد ما فيهوش.",
      example: "3.99$ × 8 تأكيدات = 31.92$. هذا فوق الـ 1$ تاع التأكيد، مش بدلّه.",
    },
    "set.deliveredFee": {
      title: "رسم كل توصيل",
      meaning: "فلوس على كل طرد وصل للزبون ودفع. المرتجع عادة ما يدخلش هنا.",
      example: "2$ لكل مسلَّم. 5 تسليمات = 10$. يظهر في Cost of Service في الشيت والحاسبة.",
    },
    "set.codPercent": {
      title: "نسبة الكاش عند الباب",
      meaning: "الشركة تاخذ نسبة من المبيعات المحصَّلة. اكتُب 0.05 يعني 5%، مش 5. إذا كتبت 5 تاخذ خمس مرات الفلوس.",
      example: "بعت 1000$ كاش عند الباب. 0.05 × 1000 = 50$ للشركة. 10 ليدات و5% ما يدخلوش في بعض — النسبة على المبيعات.",
    },
  },

  fr: {
    "ab.page": {
      title: "Colis Alibaba — de la commande au depot",
      meaning:
        "Tu suis la creme visage de la Chine jusqu au depot, et tu calcules le vrai prix par piece apres transport et douane. Le prix Alibaba tout seul ne suffit pas.",
      example:
        "Chine 5$ la piece, poids 0.2 kg, mer 9$/kg, qte 100, douane 0.3 = 30% pas le nombre 30. Marchandise 5×100=500. Transport 0.2×9×100=180. Douane 30% de (500+180)=204. Total 884. Piece 8.84$. Ce 8.84 est le Product Cost dans la calculatrice et la feuille — pas les 5$ Chine.",
    },
    "ab.product": {
      title: "Nom du produit",
      meaning: "Le nom pour reconnaitre le colis. Le meme nom que dans le stock aide a suivre.",
      example: "Creme visage 50 ml — pas le code usine long.",
    },
    "ab.supplier": {
      title: "Fournisseur",
      meaning: "L usine ou la societe sur Alibaba. Utile si le colis retarde.",
      example: "Guangzhou Skin Lab — le meme nom que sur la facture.",
    },
    "ab.url": {
      title: "Lien Alibaba",
      meaning: "La page du produit. Tu la rouvres demain sans chercher.",
      example: "Colle ici le lien de la creme visage.",
    },
    "ab.dest": {
      title: "Destination",
      meaning: "Ou arrive le colis: Golfe ou Algerie.",
      example: "KSA pour Riyad, DZ pour l Algerie. Ca change la douane et les jours de route.",
    },
    "ab.status": {
      title: "Etat du colis",
      meaning:
        "Ou il en est: brouillon = pas encore commande. commande = paye en Chine. production = l usine fabrique. en route = parti. douane = au port. arrive = dans le pays. en stock = pret a vendre.",
      example:
        "Encore a l usine? Production. Bateau parti? En route. Douane finie et au depot? En stock — la tu le comptes comme stock.",
    },
    "ab.orderDate": {
      title: "Date de commande",
      meaning: "Le jour ou tu confirmes chez le fournisseur. Arrivee = cette date + jours usine + jours transport.",
      example: "Commande 1 septembre, 10 jours usine, 20 jours mer. Arrivee vers le 1 octobre.",
    },
    "ab.china": {
      title: "Prix Chine par piece",
      meaning: "Prix usine seulement, avant transport et douane. Ce n est pas ton cout vrai.",
      example: "Creme 5$ sur Alibaba. Apres mer et douane: 8.84$ — c est ca qui compte.",
    },
    "ab.weight": {
      title: "Poids par piece",
      meaning: "Poids en kg, avec le petit carton. Le transport se calcule la-dessus.",
      example: "0.2 kg = 200 g. 100 pieces = 20 kg a transporter.",
    },
    "ab.sea": {
      title: "Prix transport par kg",
      meaning: "Dollars par kg en mer (ou air si tu mets le tarif air). Defaut du fichier: 9$/kg.",
      example: "9$ × 0.2 kg × 100 = 180$ de transport pour toute la commande.",
    },
    "ab.qty": {
      title: "Quantite",
      meaning: "Nombre de pieces. Tous les calculs multiplient par ce nombre.",
      example: "100 cremes. Marchandise 5×100=500$. Cout par piece = total ÷ 100.",
    },
    "ab.customs": {
      title: "Pourcentage douane",
      meaning: "Ecris une fraction: 0.3 = 30%, pas 30. Sinon le calcul explose. La douane s applique sur (marchandise + transport).",
      example: "Algerie 0.3. 0.3 × (500+180) = 204$. Si tu ecris 30, le resultat est faux.",
    },
    "ab.other": {
      title: "Autres frais",
      meaning: "Extras: agent, depot port, camion local, assurance. Ajoutes au total.",
      example: "Agent 50$ + camion 30$ = 80$ ici. Divise par 100 pieces.",
    },
    "ab.prodDays": {
      title: "Jours de production",
      meaning: "Combien de jours l usine fabrique et emballe avant d envoyer.",
      example: "Creme prete en 10 jours apres paiement. Ajoute-les a la date de commande.",
    },
    "ab.transit": {
      title: "Jours de transport",
      meaning: "Jours mer ou air de la Chine jusqu chez toi, sans la production.",
      example: "Mer vers l Algerie souvent 20–25 jours. Air plus vite, plus cher — change le $/kg au-dessus.",
    },
    "ab.goods": {
      title: "Valeur marchandise",
      meaning: "Prix Chine × quantite. Le cheque usine, avant le bateau.",
      example: "5$ × 100 = 500$. Transport et douane ne sont pas encore dedans.",
    },
    "ab.shipping": {
      title: "Cout transport",
      meaning: "Poids × tarif kg × quantite. Le prix de la route.",
      example: "0.2 × 9 × 100 = 180$. 20 kg × 9$ = 180$ pour les cremes.",
    },
    "ab.customsMoney": {
      title: "Argent douane",
      meaning: "Le pourcentage × (marchandise + transport). Un montant en $, pas le 0.3.",
      example: "0.3 = 30%. 30% de (500+180) = 204$. C est le cash a payer au port.",
    },
    "ab.total": {
      title: "Total du colis",
      meaning: "Marchandise + transport + douane + autres. Tout ce que tu as paye pour que ca arrive.",
      example: "500 + 180 + 204 = 884$ (sans autres frais). C est le colis entier, pas la piece.",
    },
    "ab.perUnit": {
      title: "Cout rendu par piece",
      meaning:
        "Total ÷ quantite. Le vrai prix de la piece au depot. Mets ce chiffre dans la calculatrice et la feuille comme Product Cost — pas le prix Chine.",
      example:
        "884 ÷ 100 = 8.84$. La creme ne te coute pas 5$. Elle te coute 8.84$. Vendre a 5$ = perte avant pub.",
    },

    "win.page": {
      title: "Cahier d idees — avant de commander gros",
      meaning:
        "Tu notes le produit de 0 a 10 avant un gros stock. Une note haute n est pas un profit. Ensuite, prends le cout rendu et teste-le dans la calculatrice.",
      example:
        "Creme visage 8/10. Belle idee. Avant 1000 pieces: mets 8.84$ en Product Cost dans la calculatrice. Si ca gagne, passe le statut a test en cours.",
    },
    "win.niche": {
      title: "Niche",
      meaning: "Pour qui? Le type de client ou le probleme. Evite de melanger des idees differentes.",
      example: "Soin visage femmes 25–40 — pas sante generale.",
    },
    "win.status": {
      title: "Statut du test",
      meaning:
        "pas teste = pas encore de pub. test en cours = petite pub. gagnant = ca se vend et la calculatrice dit profit. perdant = arrete la pub. en pause = bonne idee, mauvais moment (cash, saison, stock).",
      example:
        "Pub creme lancee aujourd hui: test en cours. Profit clair apres une semaine: gagnant. Personne n aime: perdant. Usine fermee 2 semaines: en pause.",
    },
    "win.china": {
      title: "Prix Chine",
      meaning: "Prix usine pour comparer vite. Le vrai cout vient de l ecran Alibaba apres transport.",
      example: "5$ la creme en Chine. Ne mets pas ca dans la calculatrice — mets 8.84$ rendu.",
    },
    "win.price": {
      title: "Prix de vente",
      meaning: "Le prix que tu penses afficher au client. Compare-le au prix suggere en bas.",
      example: "Creme a 25$ client. Chine 5$, rendu 8.84$ — l ecart paie pub, call center et profit.",
    },
    "win.weight": {
      title: "Poids",
      meaning: "Poids approx. en kg. Sert a estimer le transport (9$/kg) et le prix suggere.",
      example: "0.2 kg → environ 1.8$ de mer au-dessus du prix Chine. 5 + 1.8 = 6.8$ avant douane.",
    },
    "win.url": {
      title: "Lien produit",
      meaning: "Lien Alibaba ou fournisseur. Tu y reviens le jour de la commande.",
      example: "Colle le lien de la creme pour que l equipe retrouve l usine.",
    },
    "win.criteria": {
      title: "Six questions — de 0 a 10",
      meaning:
        "Chaque barre est une question. La moyenne est en bas. Note haute = idee a tester, pas profit garanti. Ensuite ouvre la calculatrice avec le cout rendu.",
      example:
        "1) Ca resout un probleme: peau seche. 2) Wow: avant/apres visible. 3) Difficile a trouver en magasin. 4) Peu de concurrence. 5) Le client sent que ca vaut le prix. 6) Tu peux passer de 100 a 1000. Moyenne 8/10: il faut encore calculer 8.84$.",
    },
    "win.problem": {
      title: "Ca resout un probleme",
      meaning: "Le client achete parce qu il a un souci du quotidien, pas seulement parce qu il a vu une pub.",
      example: "Creme contre la secheresse apres lavage = probleme clair. Gadget bizarre sans usage = note faible.",
    },
    "win.wow": {
      title: "Effet wow",
      meaning: "Les 3 premieres secondes de la pub: ca arrete le scroll ou pas?",
      example: "Avant/apres peau qui brille = wow haut. Boite blanche sans difference = wow faible.",
    },
    "win.availability": {
      title: "Difficile a trouver en magasin",
      meaning: "Si c est dans chaque pharmacie du quartier, ta pub combat le magasin. Mieux: un produit qu on ne trouve pas facile.",
      example: "Formule Chine absente du marche local = note haute.",
    },
    "win.competition": {
      title: "Concurrence faible",
      meaning: "10 = peu de vendeurs. 2 = marche plein, pubs cheres.",
      example: "Creme visage classique, 50 vendeurs = concurrence forte (note basse). Probleme etroit, peu de pubs = note haute.",
    },
    "win.value": {
      title: "Valeur ressentie",
      meaning: "Le client sent que ca vaut le prix, meme avant d essayer. Emballage et promesse aident.",
      example: "Pot verre et promesse claire a 25$ passe. Sachet plastique a 25$ parait trop cher.",
    },
    "win.scale": {
      title: "On peut grandir",
      meaning: "Tu peux augmenter la quantite demain? L usine, le bateau et le depot suivent?",
      example: "Fournisseur: 100 demain, 5000 le mois prochain = scalable. Max 80 pieces / mois = faible.",
    },
    "win.score": {
      title: "Moyenne sur 10",
      meaning: "Moyenne des 6 questions. Une moyenne haute n est pas un profit. Le profit se voit seulement dans la calculatrice.",
      example: "Creme 8.2/10. Belle idee. Si rendu 8.84$ et vente 12$, la calculatrice peut dire perte — la note ne sauve pas.",
    },
    "win.suggestPrice": {
      title: "Prix de vente suggere",
      meaning: "Estimation brute: Chine + mer 9$/kg, pour couvrir route, call center, pub et profit. Ca ne remplace pas la calculatrice.",
      example: "Chine 5$ poids 0.2 → rendu approx. 6.8$ (sans douane). Le suggere est plus haut. Avec douane 30%, utilise 8.84$ d Alibaba.",
    },

    "set.page": {
      title: "Machine a frais — derriere Cost of Service",
      meaning:
        "Ces chiffres sont ton contrat call center et livraison. Changer un frais ici change les cellules bleues des Comptes et le cout service de la calculatrice. Colonne Golfe et colonne Algerie: meme idee, contrats differents.",
      example:
        "Frais lead Golfe 0.50$. 10 leads = 5$ dans Cost of Service. Le bouton reset efface tout ce que tu as tape et remet les donnees demo. Ne clique que si tu veux repartir de zero.",
    },
    "set.fx": {
      title: "Dinars pour 1 dollar",
      meaning: "Combien de DZD pour 1 USD. Sert a afficher le cash algerien en dinar. Ca ne change pas le calcul en dollar.",
      example: "245: 1$ = 245 DA. Une piece a 8.84$ s affiche vers 2166 DA. Change le chiffre si le marche bouge.",
    },
    "set.dzConfirm": {
      title: "Taux de confirmation Algerie",
      meaning: "Sur 100 leads, combien disent oui au call center. Ecris 0.48 pour 48%, pas 48.",
      example: "0.48: 100 leads → 48 commandes confirmees. Si tu ecris 48, le calcul casse.",
    },
    "set.dzDelivered": {
      title: "Taux de livraison Algerie",
      meaning: "Parmi les commandes confirmees, combien arrivent et paient. 0.42 = 42%, pas 42.",
      example: "48 confirmees × 0.42 ≈ 20 livrees. Le reste: annulation ou retour — pas de cash.",
    },
    "set.leadFee": {
      title: "Frais par lead",
      meaning: "Le call center prend ce montant sur chaque numero appelle, meme si la personne n achete pas. Meme idee Golfe / Algerie, prix selon le contrat.",
      example: "0.50$ par lead. 10 leads = 5$. Dans la feuille, c est la ligne bleue Lead × frais.",
    },
    "set.confirmFee": {
      title: "Frais par confirmation",
      meaning: "Argent en plus sur chaque commande ou le client a dit oui. Pas sur ceux qui refusent.",
      example: "1$ par confirmation. 8 oui = 8$. Visible dans les cellules bleues Cost of Service.",
    },
    "set.extra": {
      title: "Extra par confirmation",
      meaning: "Frais plateforme ou appel en plus, au-dessus du frais confirmation. Souvent 3.99$ au Golfe. En Algerie parfois 0.",
      example: "3.99$ × 8 confirmations = 31.92$. C est en plus du 1$, pas a la place.",
    },
    "set.deliveredFee": {
      title: "Frais par livraison",
      meaning: "Montant sur chaque colis arrive et paye. Les retours ne rentrent en general pas ici.",
      example: "2$ par livre. 5 livraisons = 10$. Entre dans Cost of Service feuille et calculatrice.",
    },
    "set.codPercent": {
      title: "Pourcentage COD",
      meaning: "La societe prend un % des ventes encaissees. Ecris 0.05 pour 5%, pas 5. Si tu ecris 5, elle prend cinq fois trop.",
      example: "1000$ encaisse en COD. 0.05 × 1000 = 50$ pour la societe. 10 leads et 5% ne se melangent pas — le % est sur les ventes.",
    },
  },

  en: {
    "ab.page": {
      title: "Alibaba shipment — order to warehouse",
      meaning:
        "Track face cream from China to your warehouse, and compute the true piece cost after shipping and customs. The Alibaba price alone is not enough.",
      example:
        "China $5 per piece, weight 0.2 kg, sea $9/kg, qty 100, customs 0.3 means 30% not the number 30. Goods 5×100=500. Shipping 0.2×9×100=180. Customs 30% of (500+180)=204. Total 884. Per piece $8.84. This 8.84 is Product Cost in the calculator and sheet — not the $5 China price.",
    },
    "ab.product": {
      title: "Product name",
      meaning: "The name you use to recognise this shipment. Same name as stock makes tracking easy.",
      example: "Face cream 50 ml — not the long factory SKU.",
    },
    "ab.supplier": {
      title: "Supplier",
      meaning: "Factory or company on Alibaba. You know who to chase if the cargo is late.",
      example: "Guangzhou Skin Lab — same name as on the invoice.",
    },
    "ab.url": {
      title: "Alibaba link",
      meaning: "The product page. Open it tomorrow without searching again.",
      example: "Paste the face-cream Alibaba URL here.",
    },
    "ab.dest": {
      title: "Destination",
      meaning: "Where the cargo lands: Gulf or Algeria.",
      example: "KSA for Riyadh, DZ for Algeria. Destination changes customs and transit days.",
    },
    "ab.status": {
      title: "Shipment status",
      meaning:
        "Where it is now, in plain words: draft = not ordered yet. ordered = you paid China. production = factory is making it. shipped = left China. customs = at the port. arrived = in the country. in_stock = ready to sell.",
      example:
        "Still at the factory? Production. Boat left? Shipped. Customs done and in the warehouse? In stock — then it counts as inventory.",
    },
    "ab.orderDate": {
      title: "Order date",
      meaning: "The day you locked the order with the supplier. ETA = this date + production days + transit days.",
      example: "Ordered 1 Sep, 10 production days, 20 transit. Expected about 1 Oct.",
    },
    "ab.china": {
      title: "China price per piece",
      meaning: "Factory price only, before shipping and customs. This is not your real product cost.",
      example: "Face cream $5 on Alibaba. After sea and customs it becomes $8.84 — that is the number that matters.",
    },
    "ab.weight": {
      title: "Weight per piece",
      meaning: "Kilograms per piece, including light carton. Shipping is based on weight.",
      example: "0.2 kg means 200 g. 100 pieces = 20 kg to ship.",
    },
    "ab.sea": {
      title: "Shipping $ per kg",
      meaning: "Dollars per kg by sea (or air if you type the air rate). File default is $9/kg.",
      example: "$9 × 0.2 kg × 100 = $180 shipping for the whole order.",
    },
    "ab.qty": {
      title: "Quantity",
      meaning: "How many pieces in the shipment. Every total multiplies by this.",
      example: "100 face creams. Goods 5×100=$500. Piece cost = total ÷ 100.",
    },
    "ab.customs": {
      title: "Customs percent",
      meaning: "Type a fraction: 0.3 means 30%, not 30. If you type 30 the math explodes. Customs applies to (goods + shipping).",
      example: "Algeria 0.3. 0.3 × (500+180) = $204. Type 30 by mistake and the result is nonsense.",
    },
    "ab.other": {
      title: "Other fees",
      meaning: "Extra cash: agent, port storage, local truck, insurance. Added on top of the total.",
      example: "Agent $50 + truck $30 = $80 here. Split across 100 pieces.",
    },
    "ab.prodDays": {
      title: "Production days",
      meaning: "How long the factory needs to make and pack before it ships.",
      example: "Face cream ready 10 days after payment. Add that to the order date.",
    },
    "ab.transit": {
      title: "Transit days",
      meaning: "Sea or air days from China to your door, not including production.",
      example: "Sea to Algeria often 20–25 days. Air is faster and dearer — change $/kg above.",
    },
    "ab.goods": {
      title: "Goods value",
      meaning: "China price × quantity. The factory cheque, before the boat.",
      example: "$5 × 100 = $500. Shipping and customs are not in this box yet.",
    },
    "ab.shipping": {
      title: "Shipping cost",
      meaning: "Weight × $ per kg × quantity. The road bill.",
      example: "0.2 × 9 × 100 = $180. Same cream: 20 kg × $9 = $180.",
    },
    "ab.customsMoney": {
      title: "Customs in money",
      meaning: "The percent × (goods + shipping). A dollar amount, not the 0.3.",
      example: "0.3 means 30%. 30% of (500+180) = $204. That is cash at the port.",
    },
    "ab.total": {
      title: "Shipment total",
      meaning: "Goods + shipping + customs + other fees. Everything you paid to get the cargo in.",
      example: "500 + 180 + 204 = $884 (no other fees). This is the whole lot, not one piece.",
    },
    "ab.perUnit": {
      title: "Landed cost per piece",
      meaning:
        "Total ÷ quantity. The true warehouse price of one piece. Put this number in the calculator and sheet as Product Cost — not the China price.",
      example:
        "884 ÷ 100 = $8.84. Face cream does not cost you $5. It costs $8.84. Sell at $5 and you lose before ads.",
    },

    "win.page": {
      title: "Idea notebook — before you scale",
      meaning:
        "Score a product 0–10 before you order a big quantity. A high score is not profit. Then take the landed cost and test it in the calculator.",
      example:
        "Face cream scores 8/10. Nice idea. Before 1000 pieces: put $8.84 as Product Cost in the calculator. If it profits, switch status to testing.",
    },
    "win.niche": {
      title: "Niche",
      meaning: "Who is this for? The customer type or the problem. Keeps ideas from mixing.",
      example: "Women’s skincare 25–40 — not general health.",
    },
    "win.status": {
      title: "Test status",
      meaning:
        "not tested = no ads yet. testing = small ad running. winner = people buy and the calculator shows profit. loser = stop spending. hold = good idea, wrong moment (cash, season, warehouse).",
      example:
        "Face-cream ad started today: testing. Profit clear after a week: winner. Nobody likes it: loser. Factory down two weeks: hold.",
    },
    "win.china": {
      title: "China price",
      meaning: "Factory price for a quick compare. True cost comes from the Alibaba screen after shipping.",
      example: "$5 face cream in China. Do not use this in the calculator — use landed $8.84.",
    },
    "win.price": {
      title: "Selling price",
      meaning: "What you think you will charge the customer. Compare it with the suggested price below.",
      example: "Cream at $25 to the customer. China $5, landed $8.84 — the gap pays ads, call center, and profit.",
    },
    "win.weight": {
      title: "Weight",
      meaning: "Approx. kg. Used to estimate shipping ($9/kg) and the suggested price.",
      example: "0.2 kg → about $1.80 sea on top of China. 5 + 1.8 = $6.8 before customs.",
    },
    "win.url": {
      title: "Product link",
      meaning: "Alibaba or supplier URL. You come back to it on order day.",
      example: "Paste the face-cream link so the team can find the factory fast.",
    },
    "win.criteria": {
      title: "Six questions — 0 to 10",
      meaning:
        "Each slider is a question. The average is below. High score = idea worth a test, not guaranteed profit. Then open the calculator with landed cost.",
      example:
        "1) Solves a problem: dry skin. 2) Wow: visible before/after. 3) Hard to find in a local shop. 4) Weak competition. 5) Customer feels it is worth the price. 6) You can go from 100 to 1000. Average 8/10 still needs $8.84 in the calculator.",
    },
    "win.problem": {
      title: "Solves a problem",
      meaning: "The customer buys because of a daily pain, not only because they saw an ad.",
      example: "Face cream for dryness after washing = clear problem. Odd gadget with no use = low score.",
    },
    "win.wow": {
      title: "Wow factor",
      meaning: "First 3 seconds of the ad: does it stop the scroll?",
      example: "Before/after glow on camera = high wow. Plain white jar with no difference = low wow.",
    },
    "win.availability": {
      title: "Hard to find in a shop",
      meaning: "If every pharmacy next door has it, your ad fights the shop. Better: something they cannot grab locally.",
      example: "China formula missing from the local market = high score.",
    },
    "win.competition": {
      title: "Weak competition",
      meaning: "10 = few sellers. 2 = crowded market, expensive ads.",
      example: "Generic face cream, 50 sellers = strong competition (low score). Narrow problem, few ads = high score.",
    },
    "win.value": {
      title: "Perceived value",
      meaning: "The customer feels the product is worth the price, even before trying it. Pack and promise help.",
      example: "Glass jar and a clear promise at $25 works. Cheap plastic bag at $25 looks too expensive.",
    },
    "win.scale": {
      title: "Can you scale",
      meaning: "Can you raise quantity tomorrow? Can the factory, boat, and warehouse follow?",
      example: "Supplier can do 100 tomorrow and 5000 next month = scalable. Cap 80 pieces a month = weak.",
    },
    "win.score": {
      title: "Average out of 10",
      meaning: "Average of the 6 scores. A high score is not profit. Profit only shows in the calculator after landed cost and ads.",
      example: "Face cream 8.2/10. Nice. If landed is $8.84 and you sell at $12, the calculator may still say loss — the score does not save you.",
    },
    "win.suggestPrice": {
      title: "Suggested selling price",
      meaning: "Rough price from China + $9/kg shipping, to cover road, call center, ads, and profit. It does not replace the calculator.",
      example: "China $5, weight 0.2 → about $6.8 landed (no customs). Suggested is higher. With 30% customs, use $8.84 from Alibaba.",
    },

    "set.page": {
      title: "Fee machine — behind Cost of Service",
      meaning:
        "These numbers are your call-center and delivery contract. Change a fee here and the Accounts blue cells and the calculator service cost change. Gulf column and Algeria column: same idea, different contracts.",
      example:
        "Gulf lead fee $0.50. 10 leads = $5 in Cost of Service. The reset button wipes everything you typed and restores demo data. Press it only if you want to start from zero.",
    },
    "set.fx": {
      title: "Dinars per 1 dollar",
      meaning: "How many Algerian dinars equal $1. Used to show Algeria cash in DZD. It does not change the dollar math.",
      example: "245 means $1 = 245 DZD. A piece at $8.84 shows about 2166 DZD. Change it if the street rate moves.",
    },
    "set.dzConfirm": {
      title: "Algeria confirm rate",
      meaning: "Out of 100 leads, how many say yes to the call center. Type 0.48 for 48%, not 48.",
      example: "0.48: 100 leads → 48 confirmed orders. Type 48 and the math breaks.",
    },
    "set.dzDelivered": {
      title: "Algeria delivered rate",
      meaning: "Of confirmed orders, how many arrive and pay cash. 0.42 means 42%, not 42.",
      example: "48 confirmed × 0.42 ≈ 20 delivered. The rest: cancel or return — no cash in.",
    },
    "set.leadFee": {
      title: "Fee per lead",
      meaning: "Call center takes this on every number they call, even if the person never buys. Same idea Gulf vs Algeria, different contract price.",
      example: "$0.50 per lead. 10 leads = $5. On the sheet this is the blue Lead × fee row.",
    },
    "set.confirmFee": {
      title: "Fee per confirm",
      meaning: "Extra cash on every order where the customer said yes. Not on people who refused.",
      example: "$1 per confirm. 8 yes = $8. Shows in the blue Cost of Service cells.",
    },
    "set.extra": {
      title: "Extra per confirm",
      meaning: "Platform or extra-call cost on top of the confirm fee. Often $3.99 in the Gulf. Algeria may be 0 if the contract has none.",
      example: "$3.99 × 8 confirms = $31.92. This is on top of the $1, not instead of it.",
    },
    "set.deliveredFee": {
      title: "Fee per delivered",
      meaning: "Cash on every parcel that arrived and was paid. Returns usually do not enter here.",
      example: "$2 per delivered. 5 deliveries = $10. Enters Cost of Service on the sheet and calculator.",
    },
    "set.codPercent": {
      title: "COD percent",
      meaning: "The company takes a share of collected sales. Type 0.05 for 5%, not 5. Type 5 and they take five times too much.",
      example: "You collected $1000 COD. 0.05 × 1000 = $50 for the company. 10 leads and 5% do not mix — the percent is on sales.",
    },
  },
};
