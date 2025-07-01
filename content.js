let lastTime = 0;
let isAdPlaying = false;

function getVideoId() {
  const match = location.href.match(/v=([^&]+)/);
  return match ? match[1] : null;
}

function isLikelyAd() {
  const adMarkers = [
    document.querySelector('.ytp-ad-skip-button'),
    document.querySelector('.ytp-ad-preview-container'),
    document.querySelector('.video-ads'),
    document.querySelector('.ytp-ad-player-overlay')
  ];
  return adMarkers.some(el => el && el.offsetParent !== null);
}

function skipAd() {
  const skipBtn = document.querySelector('.ytp-ad-skip-button');
  if (skipBtn) skipBtn.click();
  const closeOverlay = document.querySelector('.ytp-ad-overlay-close-button');
  if (closeOverlay) closeOverlay.click();
}

function monitorVideo() {
  const video = document.querySelector('video');
  if (!video) return;

  const videoId = getVideoId();
  if (!videoId) return;

  getAdSegments(videoId, (segments) => {
    segments.forEach(seg => {
      if (video.currentTime >= seg.start && video.currentTime < seg.end) {
        video.currentTime = seg.end;
      }
    });
  });

  if (isLikelyAd()) {
    skipAd();

    if (!isAdPlaying) {
      isAdPlaying = true;
      lastTime = video.currentTime;
    }
  } else if (isAdPlaying) {
    isAdPlaying = false;
    const endTime = video.currentTime;
    if (endTime - lastTime < 30 && endTime - lastTime > 2) {
      saveAdSegment(videoId, lastTime, endTime);
    }
  }
}

setInterval(monitorVideo, 500);