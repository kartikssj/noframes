import {log} from "./utils";

function run() {
  log("Removing all iframes from page");
  // Remove initial
  const iframes = [...document.getElementsByTagName("iframe")];
  for (const iframe of iframes) {
    removeIframe(iframe);
  }
  // Add mutation observer
  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof HTMLIFrameElement) {
          removeIframe(node);
        }
      }
    }
  }).observe(document, { childList: true, subtree: true });
}

function removeIframe(iframe: HTMLIFrameElement) {
  log("Removing iframe:", iframe.src);
  if (iframe.parentNode instanceof HTMLDivElement) {
    let nodeToRemove = iframe.parentNode;
    while (
      nodeToRemove.childNodes.length === 1 &&
      nodeToRemove.parentNode instanceof HTMLDivElement
    ) {
      nodeToRemove = nodeToRemove.parentNode;
    }
    nodeToRemove.parentNode.removeChild(nodeToRemove);
  } else {
    iframe.parentNode.removeChild(iframe);
  }
}

run();
