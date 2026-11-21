const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const out = process.argv[2] || path.join(__dirname, '..', 'pdf');
  const shots = process.argv[3];
  for (const theme of ['light', 'dark']) {
    const p = await b.newPage({ viewport: { width: 1123, height: 794 } });
    await p.goto('file://' + path.join(__dirname, 'guide.html') + '?theme=' + theme, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const fonts = await p.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight + ' ' + f.style));
    console.log(theme, 'fonts loaded:', [...new Set(fonts)].length);
    const over = await p.evaluate(() => [...document.querySelectorAll('.page')].map((pg, i) => {
      const foot = pg.querySelector('.foot'); const limit = foot ? foot.getBoundingClientRect().top : pg.getBoundingClientRect().bottom;
      let max = 0; pg.querySelectorAll(':scope > *:not(.foot)').forEach(e => { if (getComputedStyle(e).position !== 'absolute') max = Math.max(max, e.getBoundingClientRect().bottom); });
      return [i + 1, Math.round(limit - max)];
    }).filter(x => x[1] < 6));
    console.log(theme, 'overflowing pages [page, slack px]:', JSON.stringify(over));
    await p.pdf({ path: `${out}/techmids-brand-guide-${theme}.pdf`, width: '1123px', height: '794px', printBackground: true, preferCSSPageSize: true });
    if (shots) {
      const n = await p.locator('.page').count();
      for (let i = 0; i < n; i++) await p.locator('.page').nth(i).screenshot({ path: `${shots}/${theme}-${String(i + 1).padStart(2, '0')}.png` });
    }
    await p.close();
  }
  await b.close();
})();
