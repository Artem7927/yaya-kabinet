// ─── YaYa Chicken · Shared Data Store v3.0 ───────────────────────────
// Реальные рецептуры цеха + техкарты кафе по полуфабрикатам

const MENU = [
  {id:'s1', name:'SET Большой',       price:10290, emoji:'🎁', cat:'sets', desc:'крылышки 20 шт, стрипсы 30 шт, фри 2л, Coca Cola 2л'},
  {id:'s2', name:'SET Средний',        price:5890,  emoji:'🎁', cat:'sets', desc:'крылышки 30 шт'},
  {id:'s3', name:'КОМБО ПИЦЦА',        price:14390, emoji:'🎁', cat:'sets', desc:'Пицца Ранч + Пицца 4 сыра + фри 2л + Coca Cola 2л'},
  {id:'s4', name:'КОМБО СЕМЕЙНЫЙ',     price:16390, emoji:'🎁', cat:'sets', desc:'крылышки 30 шт, фри 2л, Coca Cola 2л, соус'},
  {id:'s5', name:'ДЕТСКОЕ МЕНЮ',       price:2690,  emoji:'🎁', cat:'sets', desc:'наггетсы 7 шт, фри, сок, крылышки 2 шт'},
  {id:'w6', name:'Крылышки 30 шт',    price:5890,  emoji:'🍗', cat:'wings'},
  {id:'w7', name:'Крылышки 20 шт',    price:4490,  emoji:'🍗', cat:'wings'},
  {id:'w8', name:'Крылышки 8 шт',     price:2390,  emoji:'🍗', cat:'wings'},
  {id:'w9', name:'Стрипсы 20 шт',     price:4790,  emoji:'🍗', cat:'wings'},
  {id:'w10',name:'Стрипсы 14 шт',     price:3390,  emoji:'🍗', cat:'wings'},
  {id:'w11',name:'Стрипсы 7 шт',      price:2090,  emoji:'🍗', cat:'wings'},
  {id:'s12',name:'Наггетсы 7 шт',     price:990,   emoji:'🍟', cat:'snacks'},
  {id:'s13',name:'Сырные палочки 5 шт',price:1790, emoji:'🍟', cat:'snacks'},
  {id:'s14',name:'Фри',               price:790,   emoji:'🍟', cat:'snacks'},
  {id:'b15',name:'Гамбургер говяжий', price:1490,  emoji:'🍔', cat:'burgers'},
  {id:'b16',name:'Гамбургер куриный', price:1390,  emoji:'🍔', cat:'burgers'},
  {id:'b17',name:'Чизбургер говяжий', price:1590,  emoji:'🍔', cat:'burgers'},
  {id:'b18',name:'Чизбургер куриный', price:1490,  emoji:'🍔', cat:'burgers'},
  {id:'b19',name:'Гамбургер x2 говяжий',price:1690,emoji:'🍔',cat:'burgers'},
  {id:'b20',name:'Гамбургер x2 куриный',price:1690,emoji:'🍔',cat:'burgers'},
  {id:'b26',name:'КОМБО ЧИЗБУРГЕР (Говяжий)',price:2790,emoji:'🍔',cat:'burgers'},
  {id:'b27',name:'КОМБО ЧИЗБУРГЕР (Куриный)',price:2690,emoji:'🍔',cat:'burgers'},
  {id:'b30',name:'КОМБО НА ДВОИХ (Говяжий)',price:6590,emoji:'🍔',cat:'burgers'},
  {id:'b31',name:'КОМБО НА ДВОИХ (Куриный)',price:6390,emoji:'🍔',cat:'burgers'},
  {id:'d32',name:'Донер куриный',      price:1590,  emoji:'🌯', cat:'doners'},
  {id:'d33',name:'Донер говяжий',      price:1790,  emoji:'🌯', cat:'doners'},
  {id:'d34',name:'Донер MIX',          price:1690,  emoji:'🌯', cat:'doners'},
  {id:'d35',name:'Багет куриный',      price:1790,  emoji:'🌯', cat:'doners'},
  {id:'d36',name:'Багет говяжий',      price:1990,  emoji:'🌯', cat:'doners'},
  {id:'d38',name:'ДОНЕР КОМБО (Говяжий)',price:2790,emoji:'🌯', cat:'doners'},
  {id:'d39',name:'ДОНЕР КОМБО (Куриный)',price:2790,emoji:'🌯', cat:'doners'},
  {id:'p46',name:'Пицца YaYa',         price:2990,  emoji:'🍕', cat:'pizza'},
  {id:'p47',name:'Пицца Ранч',         price:2990,  emoji:'🍕', cat:'pizza'},
  {id:'p48',name:'Пицца Филадельфия',  price:3290,  emoji:'🍕', cat:'pizza'},
  {id:'p51',name:'Пицца 4 сыра',       price:2990,  emoji:'🍕', cat:'pizza'},
  {id:'p53',name:'Пицца Пепперони',    price:2790,  emoji:'🍕', cat:'pizza'},
  {id:'p54',name:'Пицца Маргарита',    price:2290,  emoji:'🍕', cat:'pizza'},
  {id:'p56',name:'Пицца Мекс. острая', price:2990,  emoji:'🍕', cat:'pizza'},
  {id:'b60',name:'Блин Творожная вишня',price:890,  emoji:'🥞', cat:'bliny'},
  {id:'b61',name:'Блин Клубничный джем',price:890,  emoji:'🥞', cat:'bliny'},
  {id:'b62',name:'Блин Медовый орех',  price:590,   emoji:'🥞', cat:'bliny'},
  {id:'b63',name:'Блин Шоколад',       price:590,   emoji:'🥞', cat:'bliny'},
  {id:'b68',name:'Блин с маслом',      price:200,   emoji:'🥞', cat:'bliny'},
  {id:'b72',name:'Блин с мясом',       price:1150,  emoji:'🥞', cat:'bliny'},
  {id:'b73',name:'Блин с курицей',     price:1150,  emoji:'🥞', cat:'bliny'},
  {id:'d79',name:'Coca Cola 1л',       price:790,   emoji:'🥤', cat:'drinks'},
  {id:'d80',name:'Coca Cola 0.5л',     price:490,   emoji:'🥤', cat:'drinks'},
  {id:'d81',name:'Sprite 1л',          price:790,   emoji:'🥤', cat:'drinks'},
  {id:'d82',name:'Sprite 0.5л',        price:490,   emoji:'🥤', cat:'drinks'},
  {id:'c87',name:'Американо',          price:890,   emoji:'☕', cat:'coffee'},
  {id:'c88',name:'Капучино',           price:990,   emoji:'☕', cat:'coffee'},
  {id:'c89',name:'Латте',              price:1190,  emoji:'☕', cat:'coffee'},
  {id:'c92',name:'Коктейль молочный',  price:1190,  emoji:'🍦', cat:'cocktails'},
  {id:'c93',name:'Коктейль шоколадный',price:1290,  emoji:'🍦', cat:'cocktails'},
  {id:'m99',name:'Мохито Классик 1л',  price:1390,  emoji:'🍹', cat:'mohito'},
  {id:'l102',name:'Лимонад Классик 1л',price:1390,  emoji:'🍋', cat:'lemonade'},
  {id:'s108',name:'Соус сырный',        price:150,   emoji:'🫙', cat:'sauces'},
  {id:'s109',name:'Соус томатный',      price:150,   emoji:'🫙', cat:'sauces'},
  {id:'s110',name:'Соус халапеньо',     price:150,   emoji:'🫙', cat:'sauces'},
];

// ─── СКЛАД СЫРЬЯ (location: 'workshop'=цех, 'kitchen'=кухня) ─────────
const DEFAULT_STOCK = [
  // ── ЦЕХ — сырьё для производства полуфабрикатов ──
  {id:'r1',  name:'Куриное мясо (крылышки)',      qty:20,  unit:'кг',   min:5,    max:20,  location:'workshop'},
  {id:'r2',  name:'Куриное мясо (стрипсы)',       qty:15,  unit:'кг',   min:5,    max:15,  location:'workshop'},
  {id:'r3',  name:'Куриное мясо (котлета/донер)', qty:15,  unit:'кг',   min:5,    max:15,  location:'workshop'},
  {id:'r4',  name:'Говядина',                     qty:15,  unit:'кг',   min:5,    max:15,  location:'workshop'},
  {id:'r5',  name:'Жир говяжий (іш май)',         qty:5,   unit:'кг',   min:1,    max:5,   location:'workshop'},
  {id:'r6',  name:'Курдюк',                       qty:2,   unit:'кг',   min:0.5,  max:2,   location:'workshop'},
  {id:'r7',  name:'Айран',                        qty:10,  unit:'л',    min:3,    max:10,  location:'workshop'},
  {id:'r8',  name:'Майонез',                      qty:8,   unit:'кг',   min:2,    max:8,   location:'workshop'},
  {id:'r9',  name:'Лук репчатый',                 qty:5,   unit:'кг',   min:1,    max:5,   location:'workshop'},
  {id:'r10', name:'Чеснок',                       qty:2,   unit:'кг',   min:0.3,  max:2,   location:'workshop'},
  {id:'r11', name:'Томаты свежие',                qty:5,   unit:'кг',   min:1,    max:5,   location:'workshop'},
  {id:'r12', name:'Огурцы солёные',               qty:5,   unit:'кг',   min:1,    max:5,   location:'workshop'},
  {id:'r13', name:'Перец болгарский',             qty:2,   unit:'кг',   min:0.5,  max:2,   location:'workshop'},
  {id:'r14', name:'Петрушка',                     qty:0.5, unit:'кг',   min:0.1,  max:0.5, location:'workshop'},
  {id:'r15', name:'Общая приправа',               qty:3,   unit:'кг',   min:0.5,  max:3,   location:'workshop'},
  {id:'r16', name:'Соль обычная',                 qty:5,   unit:'кг',   min:1,    max:5,   location:'workshop'},
  {id:'r17', name:'Соль кристаллик',              qty:3,   unit:'кг',   min:0.5,  max:3,   location:'workshop'},
  {id:'r18', name:'Паприка',                      qty:1,   unit:'кг',   min:0.2,  max:1,   location:'workshop'},
  {id:'r19', name:'Перец чёрный молотый',         qty:0.5, unit:'кг',   min:0.1,  max:0.5, location:'workshop'},
  {id:'r20', name:'Перец красный',                qty:0.3, unit:'кг',   min:0.05, max:0.3, location:'workshop'},
  {id:'r21', name:'Приправа шашлычная',           qty:1,   unit:'кг',   min:0.2,  max:1,   location:'workshop'},
  {id:'r22', name:'Уксус 70%',                    qty:0.3, unit:'л',    min:0.05, max:0.3, location:'workshop'},
  {id:'r23', name:'Горчичный соус',               qty:5,   unit:'л',    min:1,    max:5,   location:'workshop'},
  {id:'r24', name:'Томатный соус',                qty:5,   unit:'л',    min:1,    max:5,   location:'workshop'},
  {id:'r25', name:'Масло растительное',           qty:10,  unit:'л',    min:3,    max:10,  location:'workshop'},
  {id:'r26', name:'Хлеб для котлет',              qty:5,   unit:'кг',   min:1,    max:5,   location:'workshop'},
  {id:'r30', name:'Мука пшеничная',               qty:10,  unit:'кг',   min:3,    max:10,  location:'workshop'},
  {id:'r32', name:'Яйцо',                         qty:60,  unit:'шт.',  min:20,   max:60,  location:'workshop'},
  // ── КУХНЯ — сырьё для приготовления блюд ──
  {id:'r27', name:'Булка для бургера',            qty:50,  unit:'шт.',  min:15,   max:50,  location:'kitchen'},
  {id:'r28', name:'Лаваш / тортилья',             qty:40,  unit:'шт.',  min:10,   max:40,  location:'kitchen'},
  {id:'r29', name:'Тесто для пиццы',              qty:10,  unit:'шт.',  min:3,    max:10,  location:'kitchen'},
  {id:'r31', name:'Картофель фри',                qty:30,  unit:'кг',   min:8,    max:30,  location:'kitchen'},
  {id:'r33', name:'Творог',                       qty:3,   unit:'кг',   min:0.5,  max:3,   location:'kitchen'},
  {id:'r34', name:'Coca Cola',                    qty:48,  unit:'бут.', min:12,   max:48,  location:'kitchen'},
  {id:'r35', name:'Сыр',                          qty:5,   unit:'кг',   min:1,    max:5,   location:'kitchen'},
  {id:'r36', name:'Наггетсы (заготовка)',         qty:5,   unit:'кг',   min:1,    max:5,   location:'kitchen'},
  {id:'r37', name:'Масло сливочное',              qty:1,   unit:'кг',   min:0.2,  max:1,   location:'kitchen'},
];

// ─── СКЛАД КАФЕ (готовые полуфабрикаты от цеха) ───────────────────────
const DEFAULT_WS_STOCK = [
  {id:'p1',  name:'Крылышки маринованные (гот.)', qty:100, unit:'шт.', min:20},
  {id:'p2',  name:'Стрипсы маринованные (гот.)',  qty:80,  unit:'шт.', min:20},
  {id:'p3',  name:'Котлета куриная (гот.)',        qty:50,  unit:'шт.', min:10},
  {id:'p4',  name:'Котлета говяжья (гот.)',        qty:50,  unit:'шт.', min:10},
  {id:'p5',  name:'Шампур куриный (гот.)',          qty:5,   unit:'кг',  min:1},
  {id:'p6',  name:'Шампур говяжий (гот.)',          qty:5,   unit:'кг',  min:1},
  {id:'p7',  name:'Донер соус (гот.)',             qty:5,   unit:'л',   min:1},
  {id:'p8',  name:'Бургер красный соус (гот.)',    qty:3,   unit:'л',   min:0.5},
  {id:'p9',  name:'Бургер белый соус (гот.)',      qty:3,   unit:'л',   min:0.5},
  {id:'p10', name:'Тесто для блинов (гот.)',       qty:5,   unit:'кг',  min:1},
];

// ─── РЕЦЕПТУРЫ ЦЕХА ──────────────────────────────────────────────────
// Цех берёт сырьё → производит полуфабрикат → передаёт в кафе
const DEFAULT_WS_RECIPES = [
  // КРЫЛЫШКИ (на 1 крыло маринованное)
  {id:'wr1', name:'Крылышки маринованные',
   items:[
     {ingId:'r1',  qty:0.05,  unit:'кг'},   // куриное крыло ~50гр
     {ingId:'r15', qty:0.012, unit:'кг'},   // общая приправа ~12гр
     {ingId:'r16', qty:0.003, unit:'кг'},   // соль ~3гр
   ], outputId:'p1', outputQty:1, outputUnit:'шт.'},

  // СТРИПСЫ (на 1 стрипс)
  {id:'wr2', name:'Стрипсы маринованные',
   items:[
     {ingId:'r2',  qty:0.07,  unit:'кг'},   // куриное мясо ~70гр
     {ingId:'r15', qty:0.011, unit:'кг'},   // приправа ~11гр
     {ingId:'r16', qty:0.004, unit:'кг'},   // соль ~4гр
     {ingId:'r7',  qty:0.05,  unit:'л'},    // айран ~50гр
   ], outputId:'p2', outputQty:1, outputUnit:'шт.'},

  // КОТЛЕТА КУРИНАЯ (на 1 котлету ~115-120гр)
  // Рецепт: тауық еті 9кг + лук 2.5кг + хлеб 2кг + соль 120гр → ~80 котлет
  {id:'wr3', name:'Котлета куриная',
   items:[
     {ingId:'r3',  qty:0.113, unit:'кг'},   // куриное мясо
     {ingId:'r9',  qty:0.031, unit:'кг'},   // лук
     {ingId:'r26', qty:0.025, unit:'кг'},   // хлеб
     {ingId:'r16', qty:0.0015,unit:'кг'},   // соль
   ], outputId:'p3', outputQty:1, outputUnit:'шт.'},

  // КОТЛЕТА ГОВЯЖЬЯ (на 1 котлету ~100-105гр)
  // Рецепт: сиыр еті 7кг + лук 1.5кг + хлеб 1.2кг + жир 1.1кг → ~100 котлет
  {id:'wr4', name:'Котлета говяжья',
   items:[
     {ingId:'r4',  qty:0.07,  unit:'кг'},   // говядина
     {ingId:'r9',  qty:0.015, unit:'кг'},   // лук
     {ingId:'r26', qty:0.012, unit:'кг'},   // хлеб
     {ingId:'r5',  qty:0.011, unit:'кг'},   // жир іш май
     {ingId:'r16', qty:0.001, unit:'кг'},   // соль
     {ingId:'r19', qty:0.00025,unit:'кг'},  // чёрный перец
     {ingId:'r17', qty:0.00025,unit:'кг'},  // кристаллик
   ], outputId:'p4', outputQty:1, outputUnit:'шт.'},

  // ДОНЕР КУРИНЫЙ (на 1 кг готового донера)
  // Рецепт маринада на 10кг: айран 300гр, соль 40гр, майонез 200гр,
  // кристаллик 65гр, шашлычная 75гр, общая 75гр, масло 150гр
  {id:'wr5', name:'Шампур куриный',
   items:[
     {ingId:'r3',  qty:1.0,   unit:'кг'},   // куриное мясо
     {ingId:'r7',  qty:0.03,  unit:'л'},    // айран 30гр
     {ingId:'r16', qty:0.004, unit:'кг'},   // соль 4гр
     {ingId:'r8',  qty:0.02,  unit:'кг'},   // майонез 20гр
     {ingId:'r17', qty:0.0065,unit:'кг'},   // кристаллик 6.5гр
     {ingId:'r21', qty:0.0075,unit:'кг'},   // шашлычная 7.5гр
     {ingId:'r15', qty:0.0075,unit:'кг'},   // общая приправа 7.5гр
     {ingId:'r25', qty:0.015, unit:'л'},    // масло 15гр
   ], outputId:'p5', outputQty:1, outputUnit:'кг'},

  // ДОНЕР ГОВЯЖИЙ (на 1 кг готового донера)
  // Рецепт на 10кг: говядина 7кг + жир 2кг + курица 1кг + курдюк 0.25кг
  // + маринад: приправа 70гр, соль 65гр, кристаллик 65гр,
  //   чеснок 100гр, перец болг 200гр, лук 150гр, яйцо 2шт
  {id:'wr6', name:'Шампур говяжий',
   items:[
     {ingId:'r4',  qty:0.7,   unit:'кг'},   // говядина
     {ingId:'r5',  qty:0.2,   unit:'кг'},   // жир іш май
     {ingId:'r3',  qty:0.1,   unit:'кг'},   // куриное мясо
     {ingId:'r6',  qty:0.025, unit:'кг'},   // курдюк
     {ingId:'r15', qty:0.007, unit:'кг'},   // общая приправа
     {ingId:'r16', qty:0.0065,unit:'кг'},   // соль
     {ingId:'r17', qty:0.0065,unit:'кг'},   // кристаллик
     {ingId:'r10', qty:0.01,  unit:'кг'},   // чеснок
     {ingId:'r13', qty:0.02,  unit:'кг'},   // перец болгарский
     {ingId:'r9',  qty:0.015, unit:'кг'},   // лук
     {ingId:'r32', qty:0.2,   unit:'шт.'},  // яйцо (2шт на 10кг)
   ], outputId:'p6', outputQty:1, outputUnit:'кг'},

  // ДОНЕР СОУС (на 1 литр)
  // Рецепт на 10л: томат 3кг, петрушка 250гр, чеснок 170гр,
  // огурцы 170гр, соль 100гр, паприка 90гр, чёрный перец 40гр,
  // красный перец 35гр, уксус 4гр, кристаллик 80гр
  {id:'wr7', name:'Донер соус',
   items:[
     {ingId:'r11', qty:0.3,   unit:'кг'},   // томаты
     {ingId:'r14', qty:0.025, unit:'кг'},   // петрушка
     {ingId:'r10', qty:0.017, unit:'кг'},   // чеснок
     {ingId:'r12', qty:0.017, unit:'кг'},   // огурцы солёные
     {ingId:'r16', qty:0.01,  unit:'кг'},   // соль
     {ingId:'r18', qty:0.009, unit:'кг'},   // паприка
     {ingId:'r19', qty:0.004, unit:'кг'},   // чёрный перец
     {ingId:'r20', qty:0.0035,unit:'кг'},   // красный перец
     {ingId:'r22', qty:0.0004,unit:'л'},    // уксус 70%
     {ingId:'r17', qty:0.008, unit:'кг'},   // кристаллик
   ], outputId:'p7', outputQty:1, outputUnit:'л'},

  // БУРГЕР КРАСНЫЙ СОУС (на 1 литр)
  // Рецепт на 10л: горчица 4л, томат 4л, майонез 500гр, масло 500гр
  {id:'wr8', name:'Бургер красный соус',
   items:[
     {ingId:'r23', qty:0.4,   unit:'л'},    // горчичный соус
     {ingId:'r24', qty:0.4,   unit:'л'},    // томатный соус
     {ingId:'r8',  qty:0.05,  unit:'кг'},   // майонез
     {ingId:'r25', qty:0.05,  unit:'л'},    // масло растительное
   ], outputId:'p8', outputQty:1, outputUnit:'л'},

  // БУРГЕР БЕЛЫЙ СОУС (на 1 литр)
  // Рецепт на 10л: майонез 67% — 6кг, огурцы солёные — 4кг
  {id:'wr9', name:'Бургер белый соус',
   items:[
     {ingId:'r8',  qty:0.6,   unit:'кг'},   // майонез
     {ingId:'r12', qty:0.4,   unit:'кг'},   // огурцы солёные
   ], outputId:'p9', outputQty:1, outputUnit:'л'},

  // ТЕСТО ДЛЯ БЛИНОВ (на 1 кг теста)
  {id:'wr10', name:'Тесто для блинов',
   items:[
     {ingId:'r30', qty:0.5,   unit:'кг'},   // мука
     {ingId:'r32', qty:2,     unit:'шт.'},  // яйца
     {ingId:'r25', qty:0.03,  unit:'л'},    // масло
     {ingId:'r16', qty:0.005, unit:'кг'},   // соль
   ], outputId:'p10', outputQty:1, outputUnit:'кг'},
];

// ─── ТЕХКАРТЫ КАФЕ ────────────────────────────────────────────────────
// Что списывается при приёме заказа:
// p1-p10 = полуфабрикаты (со склада кафе)
// r1-r37 = сырьё (со склада сырья)
const DEFAULT_TECH_CARDS = {
  // КРЫЛЫШКИ
  'w6':  [{ingId:'p1',qty:30,unit:'шт.'}],
  'w7':  [{ingId:'p1',qty:20,unit:'шт.'}],
  'w8':  [{ingId:'p1',qty:8, unit:'шт.'}],
  // СТРИПСЫ
  'w9':  [{ingId:'p2',qty:20,unit:'шт.'}],
  'w10': [{ingId:'p2',qty:14,unit:'шт.'}],
  'w11': [{ingId:'p2',qty:7, unit:'шт.'}],
  // СНЭКИ
  's12': [{ingId:'r36',qty:0.2,unit:'кг'}],
  's14': [{ingId:'r31',qty:0.2,unit:'кг'}],
  // БУРГЕРЫ ГОВЯЖЬИ
  'b15': [{ingId:'p4',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'p8',qty:0.03,unit:'л'},{ingId:'p9',qty:0.03,unit:'л'}],
  'b17': [{ingId:'p4',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'r35',qty:0.02,unit:'кг'},{ingId:'p8',qty:0.03,unit:'л'},{ingId:'p9',qty:0.03,unit:'л'}],
  'b19': [{ingId:'p4',qty:2,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'p8',qty:0.04,unit:'л'},{ingId:'p9',qty:0.04,unit:'л'}],
  'b26': [{ingId:'p4',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'r35',qty:0.02,unit:'кг'},{ingId:'r31',qty:0.2,unit:'кг'},{ingId:'r34',qty:1,unit:'бут.'}],
  // БУРГЕРЫ КУРИНЫЕ
  'b16': [{ingId:'p3',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'p8',qty:0.03,unit:'л'},{ingId:'p9',qty:0.03,unit:'л'}],
  'b18': [{ingId:'p3',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'r35',qty:0.02,unit:'кг'},{ingId:'p8',qty:0.03,unit:'л'},{ingId:'p9',qty:0.03,unit:'л'}],
  'b20': [{ingId:'p3',qty:2,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'p8',qty:0.04,unit:'л'},{ingId:'p9',qty:0.04,unit:'л'}],
  'b27': [{ingId:'p3',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'r35',qty:0.02,unit:'кг'},{ingId:'r31',qty:0.2,unit:'кг'},{ingId:'r34',qty:1,unit:'бут.'}],
  // КОМБО НА ДВОИХ
  'b30': [{ingId:'p4',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'p1',qty:8,unit:'шт.'},{ingId:'r31',qty:0.2,unit:'кг'},{ingId:'r34',qty:1,unit:'бут.'}],
  'b31': [{ingId:'p3',qty:1,unit:'шт.'},{ingId:'r27',qty:1,unit:'шт.'},{ingId:'p1',qty:8,unit:'шт.'},{ingId:'r31',qty:0.2,unit:'кг'},{ingId:'r34',qty:1,unit:'бут.'}],
  // ДОНЕРЫ КУРИНЫЕ (1 донер = 200гр мяса + лаваш + соус)
  'd32': [{ingId:'p5',qty:0.2,unit:'кг'},{ingId:'r28',qty:1,unit:'шт.'},{ingId:'p7',qty:0.05,unit:'л'}],
  'd35': [{ingId:'p5',qty:0.2,unit:'кг'},{ingId:'r28',qty:1,unit:'шт.'},{ingId:'p7',qty:0.05,unit:'л'}],
  'd39': [{ingId:'p5',qty:0.2,unit:'кг'},{ingId:'r28',qty:1,unit:'шт.'},{ingId:'p7',qty:0.05,unit:'л'},{ingId:'r31',qty:0.2,unit:'кг'},{ingId:'r34',qty:1,unit:'бут.'}],
  // ДОНЕРЫ ГОВЯЖЬИ
  'd33': [{ingId:'p6',qty:0.2,unit:'кг'},{ingId:'r28',qty:1,unit:'шт.'},{ingId:'p7',qty:0.05,unit:'л'}],
  'd36': [{ingId:'p6',qty:0.2,unit:'кг'},{ingId:'r28',qty:1,unit:'шт.'},{ingId:'p7',qty:0.05,unit:'л'}],
  'd38': [{ingId:'p6',qty:0.2,unit:'кг'},{ingId:'r28',qty:1,unit:'шт.'},{ingId:'p7',qty:0.05,unit:'л'},{ingId:'r31',qty:0.2,unit:'кг'},{ingId:'r34',qty:1,unit:'бут.'}],
  // ДОНЕР MIX
  'd34': [{ingId:'p5',qty:0.1,unit:'кг'},{ingId:'p6',qty:0.1,unit:'кг'},{ingId:'r28',qty:1,unit:'шт.'},{ingId:'p7',qty:0.05,unit:'л'}],
  // ПИЦЦЫ
  'p54': [{ingId:'r29',qty:1,unit:'шт.'},{ingId:'r24',qty:0.08,unit:'л'},{ingId:'r35',qty:0.1,unit:'кг'}],
  'p53': [{ingId:'r29',qty:1,unit:'шт.'},{ingId:'r24',qty:0.08,unit:'л'},{ingId:'r35',qty:0.08,unit:'кг'}],
  'p48': [{ingId:'r29',qty:1,unit:'шт.'},{ingId:'r35',qty:0.15,unit:'кг'}],
  'p46': [{ingId:'r29',qty:1,unit:'шт.'},{ingId:'r35',qty:0.1,unit:'кг'},{ingId:'r24',qty:0.08,unit:'л'}],
  'p47': [{ingId:'r29',qty:1,unit:'шт.'},{ingId:'r35',qty:0.1,unit:'кг'},{ingId:'r24',qty:0.08,unit:'л'}],
  'p51': [{ingId:'r29',qty:1,unit:'шт.'},{ingId:'r35',qty:0.15,unit:'кг'}],
  // БЛИНЫ
  'b60': [{ingId:'p10',qty:0.1,unit:'кг'},{ingId:'r33',qty:0.05,unit:'кг'}],
  'b61': [{ingId:'p10',qty:0.1,unit:'кг'}],
  'b62': [{ingId:'p10',qty:0.1,unit:'кг'}],
  'b63': [{ingId:'p10',qty:0.1,unit:'кг'}],
  'b68': [{ingId:'p10',qty:0.1,unit:'кг'},{ingId:'r37',qty:0.01,unit:'кг'}],
  'b72': [{ingId:'p10',qty:0.1,unit:'кг'},{ingId:'p6',qty:0.08,unit:'кг'}],
  'b73': [{ingId:'p10',qty:0.1,unit:'кг'},{ingId:'p5',qty:0.08,unit:'кг'}],
  // СЕТЫ
  's1': [{ingId:'p1',qty:20,unit:'шт.'},{ingId:'p2',qty:30,unit:'шт.'},{ingId:'r31',qty:0.8,unit:'кг'},{ingId:'r34',qty:2,unit:'бут.'}],
  's2': [{ingId:'p1',qty:30,unit:'шт.'}],
  's4': [{ingId:'p1',qty:30,unit:'шт.'},{ingId:'r31',qty:0.8,unit:'кг'},{ingId:'r34',qty:2,unit:'бут.'},{ingId:'p7',qty:0.1,unit:'л'}],
  's5': [{ingId:'r36',qty:0.2,unit:'кг'},{ingId:'r31',qty:0.15,unit:'кг'},{ingId:'p1',qty:2,unit:'шт.'}],
};

// ─── localStorage helpers ─────────────────────────────────────────────
function lsGet(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
  catch { return def; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─── Getters / Setters ────────────────────────────────────────────────
function getStock()      { return lsGet('yaya_stock_v3',     DEFAULT_STOCK); }
function setStock(v)     { lsSet('yaya_stock_v3', v); }
function getTechCards()  { return lsGet('yaya_tech_v3',      DEFAULT_TECH_CARDS); }
function setTechCards(v) { lsSet('yaya_tech_v3', v); }
function getOrders()     { return lsGet('yaya_orders',       []); }
function setOrders(v)    { lsSet('yaya_orders', v); }
function getStopList()   { return lsGet('yaya_stoplist',     []); }
function setStopList(v)  { lsSet('yaya_stoplist', v); }
function getDeductions() { return lsGet('yaya_deductions',   []); }
function setDeductions(v){ lsSet('yaya_deductions', v); }
function getWsStock()    { return lsGet('yaya_wsstock_v3',   DEFAULT_WS_STOCK); }
function setWsStock(v)   { lsSet('yaya_wsstock_v3', v); }
function getWsRecipes()  { return lsGet('yaya_wsrecipes_v3', DEFAULT_WS_RECIPES); }
function setWsRecipes(v) { lsSet('yaya_wsrecipes_v3', v); }
function getWsLog()      { return lsGet('yaya_wslog',        []); }
function setWsLog(v)     { lsSet('yaya_wslog', v); }
function getPurchases()  { return lsGet('yaya_purchases',    []); }
function setPurchases(v) { lsSet('yaya_purchases', v); }
function getTransfers()  { return lsGet('yaya_transfers',     []); }
function setTransfers(v) { lsSet('yaya_transfers', v); }
function getReceipts()   { return lsGet('yaya_receipts',      []); }
function setReceipts(v)  { lsSet('yaya_receipts', v); }

// ─── Helpers ──────────────────────────────────────────────────────────
function fmt(n)    { return Number(n).toLocaleString('ru'); }
function fmtQ(n)   { return parseFloat(n).toFixed(2); }
function nowStr()  { return new Date().toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'}); }
function todayStr(){ return new Date().toLocaleDateString('ru',{day:'numeric',month:'short'}); }
function findMenuItem(id){ return MENU.find(m=>m.id===id); }

// ─── Автосписание при заказе ──────────────────────────────────────────
// p1-p10 → списывает со склада кафе (полуфабрикаты)
// r1-r37 → списывает со склада сырья
function autoDeductForOrder(orderItems) {
  const wsStock  = getWsStock();
  const rawStock = getStock();
  const tc  = getTechCards();
  const ded = getDeductions();

  orderItems.forEach(ci => {
    const recipe = tc[ci.id];
    if (!recipe) return;
    recipe.forEach(r => {
      const need = r.qty * ci.qty;
      // Полуфабрикат (склад кафе)
      const wsItem = wsStock.find(w => w.id === r.ingId);
      if (wsItem) {
        wsItem.qty = Math.max(0, wsItem.qty - need);
        ded.push({date:todayStr(),time:nowStr(),ing:wsItem.name,
          qty:fmtQ(need),unit:r.unit,reason:'Автосписание по заказу',emp:'Система'});
        return;
      }
      // Сырьё
      const raw = rawStock.find(i => i.id === r.ingId);
      if (raw) {
        raw.qty = Math.max(0, raw.qty - need);
        ded.push({date:todayStr(),time:nowStr(),ing:raw.name,
          qty:fmtQ(need),unit:r.unit,reason:'Автосписание по заказу',emp:'Система'});
      }
    });
  });

  setWsStock(wsStock);
  setStock(rawStock);
  setDeductions(ded);
}
