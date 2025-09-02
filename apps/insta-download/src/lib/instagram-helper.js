
const instagramUrlDirect = require("instagram-url-direct");

async function getInstagramMedia(url) {
  return await instagramUrlDirect.instagramGetUrl(url);
  // throw new Error("Simulated failure for testing RapidAPI fallback");
}


module.exports = {
  getInstagramMedia,
};
