import { pushToGithub } from "../github/githubService.js";

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SUBMISSION_SUCCESS") {
    console.log("📩 Background received:", message.payload);

    pushToGithub(message.payload);
  }
});