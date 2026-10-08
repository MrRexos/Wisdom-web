async (page) => {
  const paths = ['/terms', '/privacy', '/booking-policy', '/cancellation-policy', '/invoicing-policy', '/invoicing-policy/details', '/premium-policy', '/service-fee', '/faq'];
  const layouts = [];
  for (const viewport of [{width: 1440, height: 900}, {width: 390, height: 844}]) {
    await page.setViewportSize(viewport);
    for (const path of paths) {
      await page.goto(`http://127.0.0.1:5173${path}?lang=es`);
      await page.locator('.legal-related-documents a').first().waitFor();
      layouts.push(await page.evaluate(() => {
        const style = selector => getComputedStyle(document.querySelector(selector));
        const links = [...document.querySelectorAll('.legal-related-documents a')];
        return {path: location.pathname, width: innerWidth, h1: style('h1').fontSize, h2: style('h2').fontSize, body: style('.privacy-policy-page p').fontSize, header: document.querySelector('.legal-page-header').getBoundingClientRect().height, top: style('.privacy-policy-shell').paddingTop, footer: [style('.legal-related-documents a').fontSize, style('.legal-related-documents a').fontWeight, style('.legal-related-documents a').color], invoicingLinks: links.filter(a => new URL(a.href).pathname.startsWith('/invoicing-policy')).map(a => a.textContent), overflow: document.documentElement.scrollWidth > innerWidth};
      }));
    }
    await page.screenshot({path: `output/playwright/legal-design-faq-${viewport.width}.png`});
    await page.locator('.legal-related-documents').scrollIntoViewIfNeeded();
    await page.screenshot({path: `output/playwright/legal-design-footer-${viewport.width}.png`});
  }
  await page.getByRole('button', {name: 'ES: cambiar a inglés'}).click();
  await page.getByRole('link', {name: 'Invoicing policy', exact: true}).waitFor();
  const englishFooter = await page.locator('.legal-related-documents').innerText();
  await page.locator('summary').first().click();
  const faqOpened = await page.locator('details').first().getAttribute('open');
  return {layouts, englishUrl: page.url(), englishFooter, faqOpens: faqOpened !== null};
}