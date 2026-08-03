const rootButton = document.querySelector(".root");
const rootSound = new Audio("redchakra.mp3");

rootButton.addEventListener("click", () => {

  // Restart the sound if clicked again
  rootSound.pause();
  rootSound.currentTime = 0;

  rootButton.classList.add("active");

  rootSound.volume = 0;
  rootSound.play();

  let volume = 0;

  // Fade in (0.5 seconds)
  const fadeIn = setInterval(() => {
    volume += 0.05;
    rootSound.volume = Math.min(volume, 1);

    if (volume >= 1) {
      clearInterval(fadeIn);
    }
  }, 25);

  // Fade out after 7 seconds
  setTimeout(() => {

    const fadeOut = setInterval(() => {

      volume -= 0.05;
      rootSound.volume = Math.max(volume, 0);

      if (volume <= 0) {

        clearInterval(fadeOut);

        rootSound.pause();
        rootSound.currentTime = 0;

        rootButton.classList.remove("active");

      }

    }, 20);

  }, 19000);

});