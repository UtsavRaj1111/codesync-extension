const ENV = "dev"; // change to "prod" later

const DEBUG = ENV === "dev";

export const logger = {
  info: (...args) => {
    if (DEBUG) console.log("ℹ️ [INFO]:", ...args);
  },

  success: (...args) => {
    if (DEBUG) console.log("✅ [SUCCESS]:", ...args);
  },

  warn: (...args) => {
    if (DEBUG) console.warn("⚠️ [WARN]:", ...args);
  },

  error: (...args) => {
    console.error("❌ [ERROR]:", ...args);
  }
};