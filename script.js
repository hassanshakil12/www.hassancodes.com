const loadingScreen = document.getElementById("loadingScreen");
const loadingBar = document.getElementById("loadingBar");
const loadingText = document.getElementById("loadingText");
const content = document.getElementById("content");

let loadProgress = 0;
const minimumLoadTime = 5000; // 5 seconds
const startTime = performance.now();

function updateLoadingProgress() {
  if (loadProgress < 30) {
    loadProgress += 1;
  } else if (loadProgress < 60) {
    loadProgress += 0.5;
  } else if (loadProgress < 65) {
    loadProgress += 0.2;
  } else if (loadProgress < 66) {
    loadProgress += 0.06;
  } else if (loadProgress < 80) {
    loadProgress += 0.5;
  } else if (loadProgress < 98) {
    loadProgress += 1;
  } else if (loadProgress < 100) {
    loadProgress += 0.06;
  }

  // Update loading bar width and text
  loadingBar.style.width = loadProgress + "%";
  loadingText.textContent = Math.floor(loadProgress) + "%";

  // Continue updating progress or finish loading
  if (loadProgress < 100) {
    setTimeout(updateLoadingProgress, 50); // Adjust speed here
  } else {
    // Ensure minimum load time of 5 seconds
    const elapsedTime = performance.now() - startTime;
    setTimeout(() => {
      // Hide loading screen and show content
      loadingScreen.style.opacity = 0;
      loadingScreen.addEventListener("transitionend", () => {
        loadingScreen.style.display = "none";
        content.style.display = "block";
      });
    }, Math.max(0, minimumLoadTime - elapsedTime));
  }
}

window.onload = updateLoadingProgress;


