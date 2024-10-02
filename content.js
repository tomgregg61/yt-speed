(function () {
  const SPEED_STEP = 0.25;
  const MIN_SPEED = 0.25;
  const MAX_SPEED = 16;

  let speedDisplay;

  function createSpeedDisplay() {
    speedDisplay = document.createElement("div");
    speedDisplay.className = "speed-display";
    speedDisplay.textContent = "1x";
    const videoContainer = document.querySelector(".html5-video-container");
    if (videoContainer) {
      videoContainer.appendChild(speedDisplay);
    }
  }

  function updateSpeedDisplay(speed) {
    if (speedDisplay) {
      speedDisplay.textContent = speed.toFixed(2) + "x";
    }
  }

  function changeSpeed(video, increase) {
    let newSpeed = video.playbackRate + (increase ? SPEED_STEP : -SPEED_STEP);
    newSpeed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, newSpeed));
    video.playbackRate = newSpeed;
    updateSpeedDisplay(newSpeed);
    console.log(`Video speed set to ${newSpeed}x`);
  }

  function handleKeyPress(e) {
    const video = document.querySelector("video");
    if (video && (e.key === "+" || e.key === "=" || e.key === "-")) {
      e.preventDefault();
      changeSpeed(video, e.key === "+" || e.key === "=");
    }
  }

  function showSpeedDisplay() {
    if (speedDisplay) {
      speedDisplay.style.opacity = "1";
    }
  }

  function hideSpeedDisplay() {
    if (speedDisplay) {
      speedDisplay.style.opacity = "0";
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  const checkForVideo = setInterval(() => {
    const video = document.querySelector("video");
    const videoContainer = document.querySelector(".html5-video-container");
    if (video && videoContainer && !speedDisplay) {
      clearInterval(checkForVideo);
      console.log("Video element found");
      createSpeedDisplay();

      videoContainer.addEventListener("mousemove", showSpeedDisplay);
      videoContainer.addEventListener("mouseenter", showSpeedDisplay);
      videoContainer.addEventListener("mouseleave", hideSpeedDisplay);

      video.addEventListener("ratechange", () => {
        updateSpeedDisplay(video.playbackRate);
      });
    }
  }, 1000);
})();
