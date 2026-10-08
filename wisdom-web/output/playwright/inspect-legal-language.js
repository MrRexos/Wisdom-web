async (page) => {
  console.log(await page.evaluate(() => {
    const button = document.querySelector('.legal-language-control');
    const styles = getComputedStyle(button);
    const bounds = button.getBoundingClientRect();
    return { language: document.documentElement.lang, title: document.title, url: location.href, text: button.textContent, dropdowns: document.querySelectorAll('select').length, position: styles.position, fontSize: styles.fontSize, fontWeight: styles.fontWeight, color: styles.color, scrollY, right: innerWidth - bounds.right, bottom: innerHeight - bounds.bottom, relatedLinksMatch: [...document.querySelectorAll('.legal-related-documents a')].every(link => new URL(link.href).searchParams.get('lang') === document.documentElement.lang), horizontalOverflow: document.documentElement.scrollWidth > innerWidth };
  }));
}