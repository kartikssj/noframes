import {log} from "./utils";

chrome.runtime.onInstalled.addListener(async () => {
  log("Installed service worker");
  await chrome.action.setBadgeText({
    text: "OFF",
  });
});
  
chrome.action.onClicked.addListener(async (tab) => {
  log("Action clicked on Tab ID:", tab.id);
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";
  await chrome.action.setBadgeText({ tabId: tab.id, text: nextState });
  if (nextState === "ON") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  } else {
    await chrome.scripting.unregisterContentScripts();
  }
});
