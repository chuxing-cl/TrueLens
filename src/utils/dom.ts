export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  ...children: (HTMLElement | string)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (attrs) {
    for (const [key, val] of Object.entries(attrs)) {
      element.setAttribute(key, val);
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }
  return element;
}

export function query<T extends Element>(selector: string): T {
  return document.querySelector<T>(selector) as T;
}

export function onResize(fn: () => void): () => void {
  fn();
  const handler = () => fn();
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}
