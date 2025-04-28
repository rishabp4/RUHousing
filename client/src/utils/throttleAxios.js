import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Throttle queue
let lastRequestTime = 0;
const THROTTLE_DELAY = 0; // 1.5 seconds between requests (adjust as needed)

export const throttledAxios = async (config) => {
  const now = Date.now();
  const timeSinceLast = now - lastRequestTime;

  // If it's too soon, wait
  if (timeSinceLast < THROTTLE_DELAY) {
    await delay(THROTTLE_DELAY - timeSinceLast);
  }

  lastRequestTime = Date.now();

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("Throttled request failed:", error);
    throw error;
  }
};
