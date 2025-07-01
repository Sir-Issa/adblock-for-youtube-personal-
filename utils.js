function saveAdSegment(videoId, start, end) {
  chrome.storage.local.get(['adSegments'], (result) => {
    const db = result.adSegments || {};
    if (!db[videoId]) db[videoId] = [];
    db[videoId].push({ start, end });
    chrome.storage.local.set({ adSegments: db });
  });
}

function getAdSegments(videoId, callback) {
  chrome.storage.local.get(['adSegments'], (result) => {
    const db = result.adSegments || {};
    callback(db[videoId] || []);
  });
}