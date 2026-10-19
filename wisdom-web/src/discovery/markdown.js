import { isValidElement, Fragment } from 'react';

// Serializa el mismo árbol estático que se muestra a las personas, sin HTML oculto
// ni una segunda versión editorial que pueda quedar desactualizada.
export function renderMarkdown(element, canonical) {
  const walk = (node, list = null) => {
    if (node === null || node === undefined || typeof node === 'boolean') return '';
    if (Array.isArray(node)) return node.map((child) => walk(child, list)).join('');
    if (!isValidElement(node)) return String(node);
    const { type, props } = node;
    if (typeof type === 'function') return walk(type(props), list);
    if (type === Fragment) return walk(props.children, list);
    if (props['aria-hidden'] || ['header', 'footer', 'nav', 'script', 'style'].includes(type)) return '';
    if (type === 'ul' || type === 'ol') {
      const children = Array.isArray(props.children) ? props.children.flat() : [props.children];
      return `\n\n${children.map((child, index) => walk(child, type === 'ol' ? `${index + 1}.` : '-')).join('')}\n`;
    }
    const text = walk(props.children, list);
    if (/^h[1-6]$/.test(type)) return `\n\n${'#'.repeat(Number(type[1]))} ${text.trim()}\n\n`;
    if (type === 'a') {
      if (props.className === 'discovery-skip') return '';
      return `[${text.trim().replaceAll('[', '\\[').replaceAll(']', '\\]')}](${new URL(props.href, canonical).href})`;
    }
    if (type === 'img') return props.alt ? `![${props.alt}](${new URL(props.src, canonical).href})` : '';
    if (type === 'li') return `${list || '-'} ${text.trim()}\n`;
    if (type === 'summary') return `\n\n### ${text.trim()}\n\n`;
    if (type === 'br') return '\n';
    return ['p', 'div', 'section', 'article', 'aside', 'details', 'main'].includes(type) ? `\n\n${text.trim()}\n\n` : text;
  };
  return `${walk(element).replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}
