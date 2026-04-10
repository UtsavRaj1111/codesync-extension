export function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export function getExtension(lang) {
  const map = {
    "Java": "java",
    "C++": "cpp",
    "Python": "py",
    "JavaScript": "js",
  };

  return map[lang] || "txt";
}