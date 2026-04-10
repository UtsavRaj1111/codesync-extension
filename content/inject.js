(function () {
  console.log("🔥 Injected script running");

  let last = "";

  function getCode() {
    try {
      const model = window.monaco?.editor?.getModels?.()[0];
      return model ? model.getValue() : "";
    } catch {
      return "";
    }
  }

  function getLang() {
    const el =
      document.querySelector('[data-cy="lang-select"]') ||
      document.querySelector(".ant-select-selection-item");

    if (el) {
      const t = el.innerText.trim();
      if (t.includes("Java")) return "Java";
      if (t.includes("C++")) return "C++";
      if (t.includes("Python")) return "Python";
      if (t.includes("JavaScript")) return "JavaScript";
    }

    return "Java";
  }

  function getSlug() {
    const path = window.location.pathname;
    if (path.includes("/problems/")) {
      return path.split("/problems/")[1].split("/")[0];
    }
    return "problem";
  }

  async function getDifficulty(slug) {
    try {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query getQuestionDetail($titleSlug: String!) {
              question(titleSlug: $titleSlug) {
                difficulty
              }
            }
          `,
          variables: { titleSlug: slug },
        }),
      });

      const data = await res.json();
      const diff = data?.data?.question?.difficulty;

      return diff ? diff.toLowerCase() : "easy";
    } catch (e) {
      console.warn("GraphQL error", e);
      return "easy";
    }
  }

  async function detectSubmission() {
    const result = document.querySelector(
      '[data-e2e-locator="submission-result"]'
    );

    if (!result || !result.innerText.includes("Accepted")) return;

    const id = result.innerText;
    if (id === last) return;
    last = id;

    const code = getCode();
    if (!code || code.length < 10) {
      console.warn("❌ Code not ready");
      return;
    }

    const slug = getSlug();
    const difficulty = await getDifficulty(slug);

    const payload = {
      code,
      lang: getLang(),
      title: slug,
      difficulty,
    };

    console.log("🔥 FINAL PAYLOAD:", payload);

    window.postMessage(
      {
        type: "LEETCODE_SUBMISSION",
        payload,
      },
      "*"
    );
  }

  setInterval(detectSubmission, 1500);
})();