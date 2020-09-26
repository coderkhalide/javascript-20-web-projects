const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "music-1",
    displayName: "シャイニングスター",
    artist: "詩歩",
  },
  {
    name: "music-2",
    displayName: "12345",
    artist: "Karin",
  },
  {
    name: "music-3",
    displayName: "泡沫のレクエルド",
    artist: "KEI（謎の人物K）",
  },
  {
    name: "music-4",
    displayName: "ムラサキのアネモネ",
    artist: "unknown",
  },
];

let isPlaying = false;

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

let currentSongIndex = 0;

const prevSong = () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
};

const nextSong = () => {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) {
    currentSongIndex = 0;
  }
  loadSong(songs[currentSongIndex]);
  playSong();
};

const getTimeBySecond = (sec) => {
  const minutes = Math.floor(sec / 60);
  const second = Math.floor(sec % 60);
  const padding = second < 10 ? "0" : "";
  return `${minutes}:${padding}${second}`;
};

const updateProgressBar = (event) => {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    durationEl.textContent = getTimeBySecond(duration);
    currentTimeEl.textContent = getTimeBySecond(currentTime);
  }
};

const setProgressBar = (event) => {
  const { offsetX } = event;
  const { clientWidth } = progressContainer;
  const { duration } = music;
  music.currentTime = (offsetX / clientWidth) * duration;
};

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);

loadSong(songs[currentSongIndex]);
