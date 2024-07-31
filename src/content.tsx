import {Config, getConfig} from "./services/config";
import {log} from "./services/log";
  
declare global {
    interface Document {
        noframes: {
            iframesRemoved: number;
        }
    }
};
  
document.noframes = { 
    iframesRemoved: 0,
};
  
function run() {
  getConfig().then((config) => {
    if (!shouldRemoveIframes(config)) {
      return;
    }
    // Remove initial
    const iframes = document.getElementsByTagName("iframe");
    for (var i = 0; i < iframes.length; i++) {
      removeIframe(iframes[i], config);
    }
    // Add mutation observer
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof HTMLIFrameElement) {
            removeIframe(node, config);
          }
        }
      }
    }).observe(document, { childList: true, subtree: true });
  });
}

function shouldRemoveIframes({list, isBlacklist}: Config) {
  const url = document.location.href;
  for (const pattern of list) {
    if (url.indexOf(pattern) >= 0) {
      return isBlacklist;
    }
  }
  return !isBlacklist;
}
  
function removeIframe(iframe: HTMLIFrameElement, config: Config) {
  log("Removing iframe:", iframe.src);
  iframe.parentNode.removeChild(iframe);
  document.noframes.iframesRemoved++;
  chrome.runtime.sendMessage({
    cmd: "update-badge",
    data: { count: document.noframes.iframesRemoved },
  });
}
  
run();
  