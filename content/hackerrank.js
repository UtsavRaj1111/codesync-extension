// Basic version (you can improve later)

document.addEventListener("click", () => {
  const code = document.querySelector("textarea")?.value;
  const title = document.title;
  const lang = "cpp";

  if (code) {
    chrome.runtime.sendMessage({
      type: "SUBMISSION_SUCCESS",
      payload: { code, title, lang }
    });
  }
});