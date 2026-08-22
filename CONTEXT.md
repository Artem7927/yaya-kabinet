Правь на месте при изменении кода, НЕ дописывай.

# CONTEXT — yaya-kabinet (учётный кабинет YaYa Chicken)

## 1. Назначение репо
Рабочие экраны учёта (не витрина): менеджер, кухня, цех, закупщик — в мобильных и десктопных формах. Фронтенд без сборки; общий сервер — https://yaya-db-production.up.railway.app (репо yaya-db): живые заказы витрины, склады, закупки, поставки, KV. Часть данных живёт в localStorage и синкается в KV через yaya-sync.js.

## 2. Стек и точка входа
Vanilla HTML/CSS/JS, без сборки и зависимостей (кроме внешних: CDN-иконки/шрифты, Anthropic API в workshop.html). Точка входа «как приложение» — index.html (макет, мёртвый код — см. Готчи). Реальные рабочие экраны — отдельные html: десктопные manager.html / kitchen.html / workshop.html и мобильные *-mobile.html. PWA-обвязка — sw.js + отдельный .webmanifest на каждый экран.

## 3. Структура
- data.js — общий data-слой (MENU из живого /kv/yaya_menu, склады, техкарты, рецептуры, getters/setters localStorage, автосписание).
- yaya-sync.js — слой синхронизации localStorage ↔ KV (подключается только в десктопных экранах).
- sw.js — единый service worker (push + network-first), CACHE='yaya-v44'.
- Десктоп: manager.html (оболочка менеджера + iframe цеха/кухни), kitchen.html (готовка), workshop.html (склад цеха + AI-распознавание закупок).
- Мобильные: manager-mobile.html, kitchen-stock-mobile.html, workshop-mobile.html, buyer-mobile.html.
- index.html — статический макет-дашборд «Админ»: без серверных вызовов, не подключает data.js/yaya-sync.js/sw.js — мёртвый код.
- WebManifests (scope/start_url): manager.webmanifest→manager-mobile.html, kitchen.webmanifest→kitchen-stock-mobile.html, workshop.webmanifest→workshop-mobile.html, buyer.webmanifest→buyer-mobile.html. Осиротевшие: assembler.webmanifest + icon-assembler-* (ни один html не подключает), manifest-kabinet.json (start_url ./index.html — тоже не используется).
- Иконки: icon-{kabinet,manager,kitchen,workshop,buyer,assembler}-{192,512}.png.

## 4. Публичные интерфейсы (внешние связи)
Сервер один (yaya-db). Роль-токен: localStorage per-role ключ yaya_key_manager / yaya_key_buyer / yaya_key_kitchen / yaya_key_workshop (const YKEY зашит в каждый *-mobile.html + helper yTok()); общий 'yaya_key' больше не читается и не мигрируется. Заголовок X-Admin-Token, базовый URL: window.YAYA_API || 'https://yaya-db-production.up.railway.app' — без изменений.

data.js:
- loadLiveMenu() — GET /kv/yaya_menu (публичный) → MENU (категории витрины → вкладки, карта MENU_CAT_MAP/MENU_CAT_EMOJI); MENU_FALLBACK — офлайн-дефолт; кэш ключа yaya_menu_v3; событие 'yaya-menu-ready'.
- localStorage-ключи: yaya_stock_v3 (сырьё; DEFAULT_STOCK, location 'workshop'|'kitchen'), yaya_wsstock_v3 (полуфабрикаты; DEFAULT_WS_STOCK), yaya_wsrecipes_v3 (рецептуры цеха; DEFAULT_WS_RECIPES), yaya_tech_v3 (техкарты кафе; DEFAULT_TECH_CARDS), yaya_orders, yaya_stoplist, yaya_deductions, yaya_purchases, yaya_receipts, yaya_transfers, yaya_wslog.
- autoDeductForOrder() — автосписание по техкарте: p1-p10 (полуфабрикаты из wsstock), r1-r37 (сырьё из stock); пишет yaya_deductions.

yaya-sync.js (только десктоп):
- Требует window.YAYA_API заданным ДО <script src="yaya-sync.js">.
- KEYS = [yaya_cooklog, yaya_purchases, yaya_receipts, yaya_stock_v3, yaya_wsrecipes_v3].
- Перехватывает localStorage.setItem → PUT /kv/<key> (debounce 400мс); поллинг GET /kv/<key> каждые 6с (локальную неотправленную правку не перетирает); при пустом KV мигрирует локальные данные на сервер.

Десктоп:
- manager.html: оболочка + сайдбар; вкладки «Склад цеха»/«Кухня» грузят workshop.html/kitchen.html в iframe (navFrame; panel-frame/frame-iframe); локальный пароль MANAGER_PASSWORD='1234'; подключает data.js + yaya-sync.js.
  - Заказы: дашборд берёт серверные заказы GET /orders?limit=500 (X-Admin-Token) как источник истины (выручка/кол-во за день; при недоступности сервера — фолбэк на localStorage). Ручной заказ orderPlace() — только в localStorage yaya_orders + автосписание. Смена статуса: POST /orders/:id/status.
  - Списывания: GET /deductions + GET /deductions/:id/media (сервер) мёржатся с локальными yaya_deductions.
  - Перемещения/техкарты/стоп-лист/ингредиенты/рецептуры цеха — localStorage (yaya_transfers, yaya_tech_v3, yaya_stoplist, yaya_stock_v3, yaya_wsstock_v3, yaya_wsrecipes_v3).
  - Старый ключ yaya_receipts удаляется при загрузке — фото чеков теперь живут в yaya_purchases.
- kitchen.html: экран готовки; заказы — из localStorage yaya_orders (входящие с витрины видит только если их туда положил менеджер — см. Готчи); стоп-лист; автосписание по техкартам. iframe-aware: скрывает кнопку подсказок «?», когда открыт внутри manager.html (строки ~448-469). Подключает data.js + yaya-sync.js.
- workshop.html: склад цеха (localStorage yaya_wsstock_v3 / yaya_stock_v3 / yaya_wsrecipes_v3). AI-распознавание закупок — ПРЯМОЙ вызов https://api.anthropic.com/v1/messages (model 'claude-haiku-4-5-20251001') с ПОЛЬЗОВАТЕЛЬСКИМ ключом: поле ai-apikey (кэш в localStorage yaya_ai_apikey), заголовок x-api-key + 'anthropic-dangerous-direct-browser-access': 'true'. Ключ на наш сервер НЕ уходит. iframe-aware (строки ~2119-2141).

Мобильные (прямой REST, yaya-sync.js НЕ подключают; все включают data.js и регистрируют sw.js):
- kitchen-stock-mobile.html (роль KITCHEN): GET /stock?location=kitchen, GET /pf-stock, GET /purchases?status=pending&location=kitchen, POST /deliveries/:id/accept|reject, PATCH /stock/:id, push-подписка role:'kitchen'. Вкладки: Готовка/Склад кухни/Техкарты/Отчёты/Калькулятор. Вкладка «Полуфабрикаты»: блок «Входящие передачи» (GET /transfers/incoming — pending-пачки Цех→Кухня с составом и «привёз <performer>»; Принять → POST /transfers/:id/accept — зачисляет ПФ на кухню, Отклонить → /transfers/:id/reject — возврат цеху) — отдельно от приёмки сырья /deliveries. Ссылка «Экран кухни» → openExt('kitchen.html').
- workshop-mobile.html (роль WORKSHOP): GET /kv/yaya_wsrecipes_v3, POST /produce {recipeId,batches}, POST /transfer — форма «Передать на кухню» СПИСКОМ ПФ с полем количества на позицию (не одиночный select; мёртвое tr-main убрано), body {dir:'ws-ks', items:[{fromId,qty}]}, клиентская валидация qty ≤ остатка; PATCH /stock/:id, POST /deliveries/:id/accept|reject, push role:'workshop'; RECV_LOC='workshop'. Ссылка → openExt('kitchen.html').
- buyer-mobile.html (роль BUYER): GET /purchases, GET /purchase-assign, POST /stock/:id/deliver, POST /deliveries/:id/cancel, push role:'buyer'; поставщики — localStorage yaya_suppliers.
- manager-mobile.html (роль MANAGER): по контексту системы — /purchases, /purchase-assign (GET|PUT), /stock, GET /supply-log?from=&to= (подэкран openSub('supplylog') — журнал поставок: 3 вкладки Назначения/В пути/Поступления; строки по статусу записи: pending→«В пути» без исполнителя, accepted→«Принято» + привёз(performer) + принял(location: workshop→Цех, kitchen→Кухня), rejected→«Отклонено» + причина; авто-рефетч 15с + visibilitychange пока subKind==='supplylog'), POST /order (публичный приём заказа), POST /orders/:id/status, GET /deductions, GET /orders?limit=500|300 (поллинг 15с при !subKind), /purchases/:id/media, /deductions/:id/media; сотрудники и пароль — localStorage (yaya_users, yaya_settings.pw). sw.js регистрирует, но push-подписку НЕ ставит. Ссылки «Экран кухни» → openExt('kitchen.html').

## 5. Готчи
- index.html — мёртвый макет; рабочие «установки» — отдельные html со своими манифестами. manifest-kabinet.json также не используется ни одной страницей.
- yaya-sync.js НЕ синкает yaya_orders: заказ, принятый вручную в manager.html (orderPlace), и заказы кухни живут только в localStorage и не доезжают до сервера/витрины (серверные заказы только читаются).
- yaya_tech_v3, yaya_wsstock_v3, yaya_stoplist, yaya_deductions, yaya_transfers, yaya_wslog НЕ в KEYS yaya-sync — их правки остаются на устройстве (в отличие от yaya_stock_v3 / yaya_purchases / yaya_wsrecipes_v3).
- Два параллельных канала закупок: десктоп — yaya_purchases через KV (yaya-sync), мобильные — таблицы purchases/поставки сервера (/purchases, /deliveries/:id/...). Не смешивать при правках.
- Кросс-экранный контракт KV yaya_purchase_assign_v1 (назначения закупок): manager-mobile пишет значение позиции — строку '🚚'|'🛍'|'🛒' или {t:'🧾',sum,performer:'BUYER'|'MANAGER'|'SUPPLIER'}; buyer-mobile читает только t/sum (лишние поля игнорирует); сервер (PUT /purchase-assign) режет белым списком. Этот ключ НЕ синкается yaya-sync (в KEYS его нет).
- Пароль менеджера — локальная заглушка, НЕ токен: десктоп захардкожен '1234' (manager.html MANAGER_PASSWORD); мобильный — yaya_settings.pw (localStorage).
- sw.js: CACHE='yaya-v44' (в CANON встречается устаревший 'yaya-v28' — код говорит v44), API_HOST='yaya-db-production.up.railway.app' — данные API никогда не кэшируются; network-first с кэш-фолбэком. После правки любого html — бампить версию кэша в sw.js.
- В шапке yaya-sync.js написано, что он подключается и в kitchen-stock, но kitchen-stock-mobile.html его НЕ подключает — работает прямым REST.
- workshop.html ходит напрямую в Anthropic с ключом пользователя (опасный-но-рабочий способ через dangerous-direct-browser-access); серверный ключ здесь не предусмотрен.
- assembler.webmanifest + icon-assembler-* осиротели: страницы сборщика в этом репо нет. Роль ASSEMBLER живёт в yaya-chicken-admin (index.html:844 — гейт входа admin|MANAGER|SUPERVISOR|ASSEMBLER; отдельного экрана сборщика и там нет).
- Мобильные экраны читают склады/закупки с сервера, десктопные — из localStorage; при работе с разных устройств данные расходятся, пока их не объединит yaya-sync (только 5 ключей — см. выше).
- Кодировка/переносы (Windows): файлы UTF-8 без BOM; не смешивать CRLF/LF; при правках не использовать PowerShell -replace.

## 6. TODO(owner) — неоднозначности, требующие решения владельца
- yaya_orders: пишется только в localStorage, мимо yaya-sync; намеренность не подтверждена (TODO owner).
- Десктопные экраны (manager/kitchen/workshop .html) НЕ задействованы — рабочие только *-mobile.html. Расхождение складов (tech_v3/wsstock/stoplist/deductions/transfers desktop→localStorage) неактуально: десктоп мёртв. TODO kabinet-2 закрыт.
- assembler.webmanifest + иконки icon-assembler-{192,512}.png + manifest-kabinet.json — задел под будущий экран кабинета сборщика (assembler-mobile.html ещё не создан). Не удалять. TODO kabinet-3 закрыт.
