import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// La coreografía móvil tiene su propio flujo y sus propios espacios de pin.
// El escritorio conserva sus timelines y compensaciones originales.
export function createMobileAnimations(root, lenisRef) {
  const select = (selector) => root.querySelector(selector);
  const hero = select('.hero-section');
  const viewportHeight = () => hero.offsetHeight;
  let disposed = false;
  let resetSearchGeometry;

  const context = gsap.context(() => {
    const search = select('.search-section');
    const target = search.firstElementChild;
    const text = search.lastElementChild;
    const box = select('.hero-shapes > div:nth-child(4)');
    const image = box.querySelector('img');
    const holdDistance = () => viewportHeight() * 0.42;
    const sourceLeft = () => hero.clientWidth * 0.24;
    const sourceTop = () => hero.offsetHeight * 0.8;

    const searchTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: search,
        start: 'top top',
        end: () => `+=${holdDistance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    }).fromTo(text, {autoAlpha: 0, y: 32}, {autoAlpha: 1, y: 0, duration: 0.65})
      .to({}, {duration: 0.35});

    const destinationY = () => searchTimeline.scrollTrigger.start + target.offsetTop - sourceTop();
    // Solo transformamos durante el scroll para evitar el reflujo y redondeo
    // de width/height en cada fotograma de la imagen en movimiento.
    resetSearchGeometry = () => gsap.set(box, {
      left: sourceLeft(), top: sourceTop(),
      width: target.offsetWidth, height: target.offsetHeight,
    });
    gsap.set(box, {
      bottom: 'auto', right: 'auto', backgroundColor: '#F9F8F8',
      transformOrigin: '0 0', force3D: true, willChange: 'transform',
    });
    resetSearchGeometry();
    ScrollTrigger.addEventListener('refreshInit', resetSearchGeometry);
    gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: () => searchTimeline.scrollTrigger.end,
        scrub: true,
        invalidateOnRefresh: true,
      },
    }).fromTo(box, {
      x: 0, y: 0,
      scaleX: () => 64 / target.offsetWidth,
      scaleY: () => 96 / target.offsetHeight,
    }, {
      x: () => target.getBoundingClientRect().left - hero.getBoundingClientRect().left - sourceLeft(),
      y: destinationY,
      scaleX: 1, scaleY: 1,
      ease: 'none', duration: 1,
    }).to(box, {
      y: () => destinationY() + holdDistance(), ease: 'none', duration: 0.42,
    }).fromTo(image, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.2}, 0.12);

    const animateStatement = (section, distance) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section, start: 'top top', end: () => `+=${viewportHeight() * distance}`,
          pin: true, scrub: 0.35, invalidateOnRefresh: true,
        },
      }).fromTo(section.firstElementChild, {autoAlpha: 0, scale: 0.95, y: 24}, {
        autoAlpha: 1, scale: 1, y: 0, duration: 0.3,
      }).to(section.firstElementChild, {scale: 1.04, duration: 0.5})
        .to(section.firstElementChild, {autoAlpha: 0, y: -24, duration: 0.2});
    };
    animateStatement(select('.endless-section'), 0.55);

    const story = select('.pro-story-pin');
    const storyImage = select('.pro-story-image');
    const storyTexts = gsap.utils.toArray('[data-pro-story-text]', root);
    const square = () => Math.min(root.clientWidth * 0.55, 300);
    gsap.set(storyTexts, {autoAlpha: 0, y: 28});
    gsap.timeline({
      scrollTrigger: {
        trigger: story, start: 'top bottom', end: 'top top', scrub: true,
        invalidateOnRefresh: true,
      },
    }).fromTo(storyImage, {y: () => viewportHeight() * 0.45}, {y: 0, ease: 'none'});

    const storyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: story, start: 'top top', end: () => `+=${viewportHeight() * 3.6}`,
        pin: true, scrub: 0.35, invalidateOnRefresh: true,
      },
    }).fromTo(storyImage, {width: square, height: square}, {
      width: () => root.clientWidth, height: () => story.offsetHeight, duration: 0.6,
    }).to({}, {duration: 0.15});
    storyTexts.forEach((paragraph) => {
      storyTimeline.fromTo(paragraph, {autoAlpha: 0, y: 28}, {autoAlpha: 1, y: 0, duration: 0.18})
        .to(paragraph, {y: -24, duration: 0.65})
        .to(paragraph, {autoAlpha: 0, y: -48, duration: 0.18});
    });
    storyTimeline.to(storyImage, {width: square, height: square, duration: 0.55})
      .to(storyImage, {y: () => -viewportHeight() * 0.75, autoAlpha: 0, duration: 0.45});

    animateStatement(select('.until-section'), 0.4);

    const unified = select('.unified-section');
    const photos = gsap.utils.toArray('.unified-photo', unified);
    const unifiedText = unified.querySelector('.unified-text');
    gsap.set(photos, {x: 0, y: 0, scale: 0.2, rotation: 0, autoAlpha: 0});
    gsap.set(unifiedText, {autoAlpha: 0, y: 20});
    // Abrir las fotos mientras entra el logo; llegan a su destino al centrarse.
    gsap.timeline({
      scrollTrigger: {
        trigger: unified, start: 'center bottom', end: 'top top',
        scrub: true, invalidateOnRefresh: true,
      },
    }).to(photos, {
      x: (_, element) => parseFloat(element.dataset.mobileX) * root.clientWidth / 100,
      y: (_, element) => parseFloat(element.dataset.mobileY) * viewportHeight() / 100,
      rotation: (_, element) => Number(element.dataset.rotate),
      scale: 1, autoAlpha: 1, duration: 1, ease: 'power2.out',
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: unified, start: 'top top', end: () => `+=${viewportHeight() * 1.2}`,
        pin: true, scrub: 0.4, invalidateOnRefresh: true,
      },
    }).to({}, {duration: 0.2})
      .to(photos, {x: 0, y: 0, rotation: 0, scale: 0.2, autoAlpha: 0, duration: 0.35})
      .to(unifiedText, {autoAlpha: 1, y: 0, duration: 0.2}, '-=0.1')
      .to({}, {duration: 0.3});

    // Estos bloques conservan su entrada suave; las tarjetas largas se leen
    // con scroll natural para que ninguna quede cortada por un pin de pantalla.
    for (const selector of ['.chaos-section', '.experience-section']) {
      const section = select(selector);
      gsap.fromTo(section, {autoAlpha: 0, y: 40}, {
        autoAlpha: 1, y: 0,
        scrollTrigger: {trigger: section, start: 'top 85%', end: 'top 40%', scrub: 0.4},
      });
    }
  }, root);

  const refresh = () => {
    if (disposed) return;
    lenisRef.current?.resize();
    ScrollTrigger.refresh();
  };
  const refreshTimer = window.setTimeout(refresh, 200);
  document.fonts.ready.then(refresh);

  // La barra del navegador móvil cambia innerHeight al deslizar. svh mantiene
  // las escenas estables; solo recalculamos si cambia el ancho o la orientación.
  let previousWidth = window.innerWidth;
  let resizeTimer;
  const onResize = () => {
    if (window.innerWidth === previousWidth) return;
    previousWidth = window.innerWidth;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refresh, 180);
  };
  window.addEventListener('resize', onResize);
  return () => {
    disposed = true;
    window.clearTimeout(refreshTimer);
    window.clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
    ScrollTrigger.removeEventListener('refreshInit', resetSearchGeometry);
    context.revert();
  };
}
