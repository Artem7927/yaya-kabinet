// ─── YaYa Sync · синхронизация localStorage с общей базой ────────────
// Подключается ОДНОЙ строкой в manager/kitchen/workshop/kitchen-stock.
// Ничего в вашей логике менять не нужно: экраны как читали/писали
// localStorage, так и продолжают. Этот слой держит ключи yaya_* в
// актуальном состоянии из общей базы, а ваши существующие таймеры
// перерисовки (8–30 сек) сами показывают чужие изменения.
//
// ПЕРЕД <script src="yaya-sync.js"> задайте адрес бэкенда:
//   <script>window.YAYA_API = 'https://yaya-db-production.up.railway.app';</script>
//   <script src="yaya-sync.js"></script>

(function () {
  const API = window.YAYA_API;
  if (!API) { console.warn('[yaya-sync] window.YAYA_API не задан — работаем только локально'); return; }

  const KEYS = ['yaya_cooklog', 'yaya_purchases', 'yaya_receipts', 'yaya_stock_v3'];
  const POLL_MS = 6000;

  const rev = {};       // key -> последняя известная ревизия с сервера
  const pending = {};   // key -> таймер отложенной отправки
  const origSet = localStorage.setItem.bind(localStorage);
  const origGet = localStorage.getItem.bind(localStorage);

  // Перехватываем запись: локально пишем как раньше + отправляем в базу
  localStorage.setItem = function (k, v) {
    origSet(k, v);
    if (KEYS.includes(k)) schedulePush(k, v);
  };

  function schedulePush(k, raw) {
    clearTimeout(pending[k]);
    pending[k] = setTimeout(() => push(k, raw), 400);
  }

  async function push(k, raw) {
    try {
      const r = await fetch(API + '/kv/' + k, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: raw,            // в localStorage уже лежит валидный JSON
      });
      const d = await r.json();
      if (d && d.rev) rev[k] = d.rev;
    } catch (e) { /* оффлайн — данные останутся локально, уйдут позже */ }
    finally { delete pending[k]; }
  }

  async function pullKey(k) {
    if (pending[k]) return;                 // есть неотправленная локальная правка — не перетираем
    try {
      const r = await fetch(API + '/kv/' + k, { cache: 'no-store' });
      if (!r.ok) return;
      const d = await r.json();
      if (!d || d.value == null) return;
      if (d.rev && d.rev !== rev[k]) {
        origSet(k, JSON.stringify(d.value));  // тихо обновляем локальную копию
        rev[k] = d.rev;
      }
    } catch (e) {}
  }

  function pullAll() { KEYS.forEach(pullKey); }

  // Первичная сверка + миграция существующих данных
  async function init() {
    for (const k of KEYS) {
      let server = null;
      try {
        const r = await fetch(API + '/kv/' + k, { cache: 'no-store' });
        if (r.ok) server = await r.json();
      } catch (e) {}
      const local = origGet(k);
      if (server && server.value != null) {
        origSet(k, JSON.stringify(server.value)); // на сервере есть данные — берём их
        rev[k] = server.rev;
      } else if (local != null) {
        push(k, local);                            // сервер пуст — заливаем локальные (миграция)
      }
    }
    setInterval(pullAll, POLL_MS);
    console.log('[yaya-sync] подключено:', API);
  }

  init();
  window.YayaSync = { pullNow: pullAll, keys: KEYS, api: API };
})();
