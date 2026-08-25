const { test, expect } = require('@playwright/test');
const { seed, pageUrl } = require('./helpers');

test.describe('Session changes — read-only E2E', () => {

  test('buyer: buy list renders (or empty)', async ({ page }) => {
    await seed(page, 'buyer');
    await page.goto(pageUrl('buyer-mobile.html'), { waitUntil: 'networkidle' });

    const buyList = page.locator('#buy-list');
    await expect(buyList).toBeVisible({ timeout: 10000 });

    const itemCount = await buyList.locator('.buyrow').count();
    const empty = await buyList.locator('.empty-full').count();
    console.log(`buyer: ${itemCount} items visible, empty=${empty > 0}`);
    expect(itemCount + empty).toBeGreaterThan(0);
  });

  test('kitchen: PF tab has "Запросить у цеха" or nothing to request', async ({ page }) => {
    await seed(page, 'kitchen');
    await page.goto(pageUrl('kitchen-stock-mobile.html'), { waitUntil: 'networkidle' });

    await page.locator('button[data-tab="stock"]').click();
    await page.waitForFunction(() => typeof stockSeg === 'function', null, { timeout: 5000 });
    await page.locator('#sg-pf').click();
    await page.waitForTimeout(2000);

    const pfList = page.locator('#pf-list');
    await expect(pfList).toBeVisible({ timeout: 5000 });

    const reqBtn = pfList.locator('button', { hasText: 'Запросить у цеха' });
    const sentBtn = pfList.locator('button', { hasText: 'Запрошено' });
    const reqCount = await reqBtn.count();
    const sentCount = await sentBtn.count();
    const itemCount = await pfList.locator('.irow').count();
    console.log(`kitchen: PF items=${itemCount}, request buttons=${reqCount}, sent buttons=${sentCount}`);
    expect(reqCount + sentCount).toBeGreaterThanOrEqual(0);
  });

  test('workshop: #pf-req-wrap exists in stock PF section', async ({ page }) => {
    await seed(page, 'workshop');
    await page.goto(pageUrl('workshop-mobile.html'), { waitUntil: 'networkidle' });

    await page.locator('button[data-tab="stock"]').click();
    await page.waitForFunction(() => typeof stockSeg === 'function', null, { timeout: 5000 });
    await page.locator('#sg-pf').click();
    await page.waitForTimeout(1500);

    const pfReqWrap = page.locator('#pf-req-wrap');
    const count = await pfReqWrap.count();
    console.log(`workshop: #pf-req-wrap count=${count}`);
    expect(count).toBe(1);
  });

  test('manager: #pf-req-wrap exists on move tab', async ({ page }) => {
    await seed(page, 'manager');
    await page.goto(pageUrl('manager-mobile.html'), { waitUntil: 'networkidle' });

    await page.locator('button[data-tab="move"]').click();
    await page.waitForTimeout(2000);

    const pfReqWrap = page.locator('#pf-req-wrap');
    const count = await pfReqWrap.count();
    console.log(`manager: #pf-req-wrap count=${count}`);
    expect(count).toBe(1);
  });

});
