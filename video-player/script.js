const player = document.querySelector(".player");

const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");

const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");

const speed = document.querySelector(".player-speed");

const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //

const showPauseIcon = () => {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
};

const showPlayIcon = () => {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    showPauseIcon();
  } else {
    video.pause();
    showPlayIcon();
  }
};

// Progress Bar ---------------------------------- //

const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
};

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} / `;
  duration.textContent = displayTime(video.duration);
};

const setProgress = (event) => {
  video.currentTime =
    (event.offsetX / progressRange.offsetWidth) * video.duration;
};

// Volume Controls --------------------------- //

const setVolumeBar = (volume) => {
  volumeBar.style.width = `${volume * 100}%`;
};

const changeVolumeIcon = (volume) => {
  let iconDesignator, attribute;
  if (volume === "mute") {
    iconDesignator = "mute";
    attribite = "Unmute";
  } else {
    iconDesignator = volume > 0.7 ? "up" : volume > 0 ? "down" : "off";
    attribute = "Mute";
  }
  volumeIcon.className = "";
  volumeIcon.classList.add("fas", `fa-volume-${iconDesignator}`);
  volumeIcon.setAttribute("title", attribute);
};

let lastVolume = 1;

const changeVolume = (event) => {
  let volume = event.offsetX / volumeRange.offsetWidth;
  volume = volume > 0.9 ? 1 : volume > 0.1 ? volume : 0;
  video.volume = volume;
  changeVolumeIcon(video.volume);
  setVolumeBar(video.volume);
  lastVolume = video.volume;
};

const toggleMute = () => {
  if (!volumeIcon.classList.contains("fa-volume-mute")) {
    lastVolume = video.volume;
    video.volume = 0;
    changeVolumeIcon("mute");
    setVolumeBar(video.volume);
    return;
  }
  video.volume = lastVolume;
  changeVolumeIcon(video.volume);
  setVolumeBar(video.volume);
};

// Change Playback Speed -------------------- //

const changeSpeed = () => {
  video.playbackRate = speed.value;
};

// Fullscreen ------------------------------- //

const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
};

/* Close fullscreen */
const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
};

let fullscreen = false;

const toggleFullScreen = () => {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
};

// Event Listners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullScreen);
