import {log} from "./utils";

function run() {
  log("Removing all iframes from page");
  // Remove initial
  const iframes = document.getElementsByTagName("iframe");
  for (var i = 0; i < iframes.length; i++) {
    removeIframe(iframes[i]);
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
  iframe.parentNode.removeChild(iframe);
}

run();
