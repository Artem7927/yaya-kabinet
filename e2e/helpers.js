require('dotenv').config();

const BASE = 'https://artem7927.github.io/yaya-kabinet/';

const ROLE_MAP = {
  buyer:   { key: 'yaya_key_buyer',   env: 'KEY_BUYER' },
  kitchen: { key: 'yaya_key_kitchen',  env: 'KEY_KITCHEN' },
  workshop:{ key: 'yaya_key_workshop', env: 'KEY_WORKSHOP' },
  manager: { key: 'yaya_key_manager',  env: 'KEY_MANAGER' },
};

async function seed(page, role) {
  const api = process.env.YAYA_API || 'https://yaya-db-production.up.railway.app';
  const { key, env } = ROLE_MAP[role];
  const token = process.env[env] || '';

  await page.addInitScript(([apiVal]) => {
    window.YAYA_API = apiVal;
  }, [api]);

  await page.addInitScript(([storageKey, tok]) => {
    localStorage.setItem(storageKey, tok);
  }, [key, token]);

  if (role === 'manager') {
    await page.addInitScript(() => {
      sessionStorage.setItem('yaya_ok', '1');
    });
  }
}

function pageUrl(path) {
  return BASE + path;
}

module.exports = { seed, pageUrl, ROLE_MAP };
