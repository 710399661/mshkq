const rootId = 'dzq-toast-root';

export function getRoot(classPrefix: string) {
  let root: HTMLElement = window[rootId] || document.getElementById(rootId);
  if (!root) {
    root = document.createElement('div');
    root.id = rootId;
    document.body.appendChild(root);
    window[rootId] = root;
  }
  return root;
}

const maxCountLimit = 1;
const listKey = 'dzq-toast-list-identification';

export function limit(notice: { hide: () => void }) {
  if (!window[listKey]) {
    window[listKey] = [];
  }
  if (window[listKey].length >= maxCountLimit) {
    try {
      window[listKey][0].hide();
      window[listKey].shift();
    } catch (_) {
      // hide failed
    }
  }
  window[listKey].push(notice);
}
