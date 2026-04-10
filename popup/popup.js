const tokenInput = document.getElementById("token");
const usernameInput = document.getElementById("username");
const repoInput = document.getElementById("repo");
const statusText = document.getElementById("status");

// Load saved data
document.addEventListener("DOMContentLoaded", async () => {
  const data = await chrome.storage.local.get(["token", "username", "repo"]);

  if (data.token) tokenInput.value = data.token;
  if (data.username) usernameInput.value = data.username;
  if (data.repo) repoInput.value = data.repo;
});

// Save credentials
document.getElementById("save").addEventListener("click", async () => {
  const token = tokenInput.value.trim();
  const username = usernameInput.value.trim();
  const repo = repoInput.value.trim();

  if (!token || !username || !repo) {
    showStatus("⚠️ All fields are required", "red");
    return;
  }

  try {
    await chrome.storage.local.set({ token, username, repo });
    showStatus("✅ Saved successfully", "lightgreen");
  } catch (err) {
    showStatus("❌ Error saving data", "red");
  }
});

// Test GitHub connection
document.getElementById("test").addEventListener("click", async () => {
  const token = tokenInput.value.trim();

  if (!token) {
    showStatus("⚠️ Enter token first", "orange");
    return;
  }

  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`
      }
    });

    if (res.ok) {
      showStatus("✅ GitHub Connected", "lightgreen");
    } else {
      showStatus("❌ Invalid Token", "red");
    }
  } catch (err) {
    showStatus("❌ Connection failed", "red");
  }
});

// Status helper
function showStatus(msg, color) {
  statusText.textContent = msg;
  statusText.style.color = color;

  setTimeout(() => {
    statusText.textContent = "";
  }, 2500);
}