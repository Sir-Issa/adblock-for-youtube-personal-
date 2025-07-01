const adUrls = [
  "*://*.doubleclick.net/*",
  "*://*.googleads.g.doubleclick.net/*",
  "*://*.googlesyndication.com/*",
  "*://*.youtube.com/api/stats/ads*",
  "*://*.youtube.com/pagead/*",
  "*://*.youtube.com/get_midroll_info*",
  "*://*.youtube.com/yva_video*"
];

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    return { cancel: true };
  },
  { urls: adUrls },
  ["blocking"]
);