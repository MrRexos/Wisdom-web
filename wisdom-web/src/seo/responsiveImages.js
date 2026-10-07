import images from './responsiveImages.json';

export function responsiveImage(source, sizes = '(max-width: 767px) 160px, 300px') {
  const image = images[source];
  if (!image) return { src: source };
  return {
    src: image.variants[Math.min(1, image.variants.length - 1)].src,
    srcSet: image.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', '),
    sizes,
  };
}
