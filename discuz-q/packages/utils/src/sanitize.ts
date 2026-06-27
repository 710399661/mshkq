const ALLOWED_TAGS = new Set([
  'a', 'abbr', 'acronym', 'address', 'b', 'big', 'blockquote', 'br',
  'caption', 'cite', 'code', 'col', 'colgroup',
  'dd', 'del', 'details', 'div', 'dl', 'dt',
  'em',
  'figcaption', 'figure',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
  'i', 'img', 'ins',
  'kbd',
  'li',
  'mark',
  'ol',
  'p', 'pre',
  'q',
  's', 'samp', 'small', 'span', 'strike', 'strong', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr',
  'tt',
  'u', 'ul',
  'var',
]);

const ALLOWED_ATTRS = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
  div: ['class', 'style'],
  span: ['class', 'style'],
  table: ['class', 'style'],
  td: ['colspan', 'rowspan', 'class', 'style'],
  th: ['colspan', 'rowspan', 'class', 'style'],
  tr: ['class', 'style'],
  p: ['class', 'style'],
  h1: ['class', 'style'],
  h2: ['class', 'style'],
  h3: ['class', 'style'],
  h4: ['class', 'style'],
  h5: ['class', 'style'],
  h6: ['class', 'style'],
  ul: ['class', 'style'],
  ol: ['class', 'style'],
  li: ['class', 'style'],
  blockquote: ['class', 'style', 'cite'],
  pre: ['class', 'style'],
  code: ['class'],
};

const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:', 'data:'];

function sanitizeHtml(html: string): string {
  if (typeof document === 'undefined') {
    return html;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="__sanitize_root__">${html}</div>`, 'text/html');
  const root = doc.getElementById('__sanitize_root__');

  if (!root) return '';

  function sanitizeNode(node: Element) {
    const childNodes = Array.from(node.childNodes);

    for (const child of childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        continue;
      }

      if (child.nodeType !== Node.ELEMENT_NODE) {
        node.removeChild(child);
        continue;
      }

      const element = child as Element;
      const tagName = element.tagName.toLowerCase();

      if (!ALLOWED_TAGS.has(tagName)) {
        const textNode = doc.createTextNode(element.textContent || '');
        node.replaceChild(textNode, element);
        continue;
      }

      const allowedAttrs = (ALLOWED_ATTRS as Record<string, string[]>)[tagName] || [];
      const attrs = Array.from(element.attributes);

      for (const attr of attrs) {
        const attrName = attr.name.toLowerCase();

        if (!allowedAttrs.includes(attrName)) {
          element.removeAttribute(attr.name);
          continue;
        }

        if (attrName === 'href' || attrName === 'src') {
          try {
            const url = new URL(attr.value, window.location.origin);
            if (!ALLOWED_PROTOCOLS.includes(url.protocol)) {
              element.removeAttribute(attr.name);
            }
          } catch {
              element.removeAttribute(attr.name);
            }
        }

        if (attrName === 'style') {
          const styleValue = attr.value;
          if (styleValue.includes('javascript:') || styleValue.includes('expression(')) {
            element.removeAttribute(attr.name);
          }
        }
      }

      if (tagName === 'a') {
        element.setAttribute('rel', 'noopener noreferrer');
        if (!element.getAttribute('target')) {
          element.setAttribute('target', '_blank');
        }
      }

      sanitizeNode(element);
    }
  }

  sanitizeNode(root);

  return root.innerHTML;
}

export { sanitizeHtml };
