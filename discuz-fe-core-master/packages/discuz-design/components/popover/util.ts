const rootId = "dzq-popover-root";

/**
 * 获取popover根节点
 */
export function getRoot() {
  let root: HTMLElement = window[rootId] || document.getElementById(rootId);
  if (!root) {
    root = document.createElement("div");
    root.id = rootId;
    document.body.appendChild(root);
    window[rootId] = root;
  }
  return root;
}
