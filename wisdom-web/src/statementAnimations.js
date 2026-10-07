import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Medido en el párrafo «300 years earlier» de getty.edu/tracingart/.
// La entrada depende del tiempo; el hold depende del scroll, no de un scrub.
const STATEMENT_MOTION = {
  delay: 0.1,
  fadeIn: 1,
  scaleIn: 4,
  fadeOut: 0.3,
  startScale: 0.85,
  scrollDuration: 1.5,
  mobileScrollDuration: 2.5,
};

export function createStatementAnimations(root, lenisRef) {
  const entries = [];
  let previousScrollOptions;
  let scopedScroller;

  const restoreScroll = () => {
    if (scopedScroller && previousScrollOptions) {
      Object.assign(scopedScroller.options, previousScrollOptions);
    }
    scopedScroller = undefined;
    previousScrollOptions = undefined;
  };

  const syncScroll = () => {
    const scroller = lenisRef.current;
    if (!scroller || !entries.some(({ trigger }) => trigger?.isActive)) {
      restoreScroll();
      return;
    }
    if (scopedScroller === scroller) return;
    restoreScroll();
    scopedScroller = scroller;
    previousScrollOptions = {
      duration: scroller.options.duration,
      lerp: scroller.options.lerp,
    };
    // Lenis 1.0 prioriza lerp: desactivarlo permite la duración de Getty.
    scroller.options.duration = root.dataset.layout === 'vertical'
      ? STATEMENT_MOTION.mobileScrollDuration
      : STATEMENT_MOTION.scrollDuration;
    scroller.options.lerp = 0;
  };

  const context = gsap.context(() => {
    root.querySelectorAll('.statement-section').forEach((section) => {
      const frame = section.querySelector('.statement-frame');
      const text = frame.firstElementChild;
      const entry = { trigger: null, fade: null, scale: null };
      entries.push(entry);

      gsap.set(frame, { autoAlpha: 0 });
      gsap.set(text, { scale: STATEMENT_MOTION.startScale, transformOrigin: '50% 50%' });

      const show = () => {
        entry.fade?.kill();
        entry.scale?.kill();
        entry.fade = gsap.to(frame, {
          autoAlpha: 1,
          delay: STATEMENT_MOTION.delay,
          duration: STATEMENT_MOTION.fadeIn,
          ease: 'power3.inOut',
        });
        entry.scale = gsap.fromTo(text, { scale: STATEMENT_MOTION.startScale }, {
          scale: 1,
          delay: STATEMENT_MOTION.delay,
          duration: STATEMENT_MOTION.scaleIn,
          ease: 'power3.out',
        });
      };

      const hide = () => {
        entry.fade?.kill();
        entry.fade = gsap.to(frame, {
          autoAlpha: 0,
          duration: STATEMENT_MOTION.fadeOut,
          ease: 'power1.out',
        });
      };

      entry.trigger = ScrollTrigger.create({
        id: `statement-${section.classList[0]}`,
        trigger: section,
        // En escritorio Unified termina antes del final de su pin-spacer.
        // Su salida real, no ese espacio residual, da paso al tercer texto.
        start: section.classList.contains('chaos-section') && root.dataset.layout === 'horizontal'
          ? () => ScrollTrigger.getAll().find((trigger) => (
            trigger.pin && trigger.trigger === root.querySelector('.unified-section')
          )).end
          : 'top top',
        // La escena mide 250lvh: 150lvh de lectura y 100lvh de transición.
        end: () => `+=${section.offsetHeight * 0.6}`,
        onEnter: show,
        onEnterBack: show,
        onLeave: hide,
        onLeaveBack: hide,
        onToggle: syncScroll,
        onRefresh: syncScroll,
      });
    });
  }, root);

  return () => {
    entries.forEach(({ fade, scale }) => {
      fade?.kill();
      scale?.kill();
    });
    restoreScroll();
    context.revert();
  };
}
