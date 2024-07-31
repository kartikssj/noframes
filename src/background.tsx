import {setBadge} from "./services/badge";

chrome.runtime.onMessage.addListener((message, sender) => {
  const {cmd, data} = message;
  switch (cmd) {
    case "update-badge":
      setBadge(sender.tab.id, (data as { count: number }).count);
  }
});
