import gsap from 'gsap';

// Recorrido del caballo (Transaction3 / AssetZoom) de getty.edu/tracingart.
// Conservar sus curvas desde el zoom, con la entrada breve y el encuadre de Wisdom.
export function createProStoryAnimations(root, isVertical) {
  const pin = root.querySelector('.pro-story-pin');
  const frame = pin.querySelector('.pro-story-image');
  const image = frame.querySelector('img');
  const paragraphs = [...pin.querySelectorAll('[data-pro-story-text]')];
  const state = { position: 1, zoom: 0, pan: 0 };
  const referenceDuration = isVertical ? 10.4 : 10.7;
  const initialScrollFactor = 0.8;
  const entryDuration = referenceDuration / 10 * initialScrollFactor;
  const holdDistance = isVertical ? 0 : 1000 * initialScrollFactor;
  const exitStart = isVertical ? 4.3 : 4;
  let viewportHeight;
  let fullHeight;
  let smallScale;
  let cropX;
  let cropY;
  let drift;
  let zoomTimeline;
  let timeline;
  const scrollPerUnit = () => viewportHeight * 10 / referenceDuration;
  const introDuration = () => entryDuration + holdDistance / scrollPerUnit();

  const context = gsap.context(() => {
    gsap.set(frame, {
      flexShrink: 0, transformOrigin: '50% 50%', clipPath: 'inset(0px)',
      willChange: 'transform, clip-path',
    });
    gsap.set(image, { transformOrigin: '50% 50%', willChange: 'transform' });
    gsap.set(paragraphs, { autoAlpha: 0 });
    const render = () => {
      const panOffset = (fullHeight - viewportHeight) * (0.5 - state.pan);
      const y = viewportHeight * state.position + panOffset * state.zoom;
      const scale = smallScale + (1 - smallScale) * state.zoom;
      frame.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
      // Recortar, sin deformar la foto: cuadrada recogida y completa al ampliarse.
      frame.style.clipPath = `inset(${cropY * (1 - state.zoom)}px ${cropX * (1 - state.zoom)}px)`;
      image.style.transform = `scale(${1.2 - state.zoom * 0.2})`;
    };
    const measure = () => {
      viewportHeight = pin.offsetHeight;
      const aspect = image.naturalWidth / image.naturalHeight || 832 / 1248;
      const square = isVertical ? Math.min(root.clientWidth * 0.55, 300)
        : Math.round(gsap.utils.clamp(130, 520, window.innerWidth * 0.25));
      fullHeight = Math.max(viewportHeight * 1.3, square, window.innerWidth / aspect);
      const fullWidth = fullHeight * aspect;
      const cropSize = Math.min(fullWidth, fullHeight);
      smallScale = square / cropSize;
      cropX = (fullWidth - cropSize) / 2;
      cropY = (fullHeight - cropSize) / 2;
      gsap.set(frame, { width: fullWidth, height: fullHeight, autoRound: false });
      // Acortar solo la entrada y la pausa; conservar el recorrido desde el zoom.
      if (drift) drift.duration(holdDistance / scrollPerUnit());
      if (zoomTimeline) zoomTimeline.startTime(introDuration());
      render();
    };
    measure();

    timeline = gsap.timeline({
      onUpdate: render,
      scrollTrigger: {
        id: 'pro-story-reference',
        trigger: pin,
        start: 'top top',
        end: () => `+=${pin.offsetHeight * initialScrollFactor + holdDistance
          + (exitStart + 1) * pin.offsetHeight * 10 / referenceDuration}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: (trigger) => {
          measure();
          timeline?.totalProgress(trigger.progress);
        },
      },
    });

    timeline.fromTo(state, { position: 1 }, {
      position: isVertical ? -0.08 : 0.015, duration: entryDuration,
      ease: isVertical ? 'power2.out' : 'power1.out',
    });
    if (!isVertical) {
      timeline.to(state, {
        position: -0.03, duration: holdDistance / scrollPerUnit(), ease: 'none',
      });
      drift = timeline.recent();
    }

    zoomTimeline = gsap.timeline();
    zoomTimeline.to(state, { position: 0, duration: 1, ease: 'none' }, 0)
      .fromTo(state, { zoom: 0 }, { zoom: 1, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(state, { pan: 0 }, { pan: 1, duration: 3, ease: 'none' }, 0.7)
      .to(state, { zoom: 0, duration: 1, ease: 'power2.inOut' }, 2.7)
      .to(state, { position: -1, duration: 1, ease: 'power2.inOut' }, exitStart);

    // Conservar los dos mensajes de Wisdom dentro del tramo de lectura ampliado.
    const paragraphDuration = 3 * 0.85 / paragraphs.length;
    paragraphs.forEach((paragraph, index) => {
      const start = 0.7 + index * paragraphDuration;
      const fade = paragraphDuration * 2 / 11;
      const hold = paragraphDuration * 7 / 11;
      const rise = () => isVertical ? 24 : gsap.utils.clamp(
        90, viewportHeight * 0.32, (fullHeight - viewportHeight) * 0.22,
      );
      zoomTimeline.fromTo(paragraph, { autoAlpha: 0, y: isVertical ? 28 : 52 }, {
        autoAlpha: 1, y: 0, duration: fade, ease: 'none',
      }, start).to(paragraph, {
        y: () => -rise(), duration: hold, ease: 'none',
      }, start + fade).to(paragraph, {
        autoAlpha: 0, y: () => -rise() - (isVertical ? 24 : 36), duration: fade, ease: 'none',
      }, start + fade + hold);
    });
    timeline.add(zoomTimeline, introDuration());
  }, root);

  return () => context.revert();
}
