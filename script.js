const sounds = {
  crown: "mchakraviolet.mp3",
  "third-eye": "mchakraindigo.mp3",
  throat: "mchakrablue.mp3",
  heart: "mchakragreen.mp3",
  solar: "mchakrayellow.mp3",
  sacral: "mchakraorange.mp3",
  root: "mchakrared.mp3"
};

// CRITICAL FIX: Limit individual volume to 25% to prevent clipping when layered
const MAX_VOLUME = 0.25; 

const chakras = document.querySelectorAll(".chakra");

chakras.forEach(chakra => {
  // Cleaner way to match the class name directly to your sounds object keys
  const chakraKey = Object.keys(sounds).find(key => chakra.classList.contains(key));
  if (!chakraKey) return; 

  const soundFile = sounds[chakraKey];
  const sound = new Audio(soundFile);

  // Keep track of active intervals for this specific chakra to prevent ghost loops
  let fadeInterval; 

  chakra.addEventListener("click", () => {
    // Clear any active fade-in or fade-out loops if clicked mid-play
    clearInterval(fadeInterval);

    // Restart this chakra if clicked again
    sound.pause();
    sound.currentTime = 0;

    // Make it glow
    chakra.classList.remove("fade-out");
    chakra.classList.add("active");

    // Start silent
    sound.volume = 0;
    sound.play();

    let currentVolume = 0;

    // Fade in over 0.5 seconds up to the MAX_VOLUME limit
    fadeInterval = setInterval(() => {
      currentVolume += 0.0125; // Slower increment step to match the lower ceiling
      sound.volume = Math.min(currentVolume, MAX_VOLUME);

      if (currentVolume >= MAX_VOLUME) {
        clearInterval(fadeInterval);
      }
    }, 25);

    // Start fade out after 19 seconds
    setTimeout(() => {
      // Don't interrupt if the user has clicked it again in the meantime
      if (!chakra.classList.contains("active")) return; 

      chakra.classList.remove("active");
      chakra.classList.add("fade-out");

      fadeInterval = setInterval(() => {
        currentVolume -= 0.0125;
        sound.volume = Math.max(currentVolume, 0);

        if (currentVolume <= 0) {
          clearInterval(fadeInterval);

          sound.pause();
          sound.currentTime = 0;

          chakra.classList.remove("fade-out");
        }
      }, 20);

    }, 19000);
  });
});
