// Inject script into page
const script = document.createElement("script");
script.src = chrome.runtime.getURL("content/inject.js");
script.onload = () => script.remove();
(document.head || document.documentElement).appendChild(script);

// Listen for injected data
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "LEETCODE_SUBMISSION") {
    console.log("🚀 Received from inject:", event.data.payload);

    chrome.runtime.sendMessage({
      type: "SUBMISSION_SUCCESS",
      payload: event.data.payload,
    });
  }
});