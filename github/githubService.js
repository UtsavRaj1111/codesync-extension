import { encodeBase64 } from "../utils/encoder.js";
import { getExtension } from "../utils/helpers.js";

export async function pushToGithub({ code, title, lang, difficulty }) {
  try {
    const { token, username, repo } = await chrome.storage.local.get([
      "token",
      "username",
      "repo",
    ]);

    if (!token || !username || !repo) {
      console.error("❌ Missing GitHub credentials");
      return;
    }

    const ext = getExtension(lang);
    const safeTitle = title.toLowerCase().replace(/\s+/g, "-");

    const filename = `leetcode/${difficulty}/${safeTitle}.${ext}`;

    const url = `https://api.github.com/repos/${username}/${repo}/contents/${filename}`;

    const content = encodeBase64(code);

    console.log("📤 Uploading:", filename);

    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Add ${title}`,
        content,
      }),
    });

    console.log("✅ Uploaded to GitHub");
  } catch (err) {
    console.error("❌ GitHub error:", err);
  }
}