
// select elements
const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const video = document.querySelector('.vid-container video');
// moves the play button cirlce around
  const outline = document.querySelector('.moving-outline circle');
// sounds
  const sounds = document.querySelectorAll('.sound-picker button');
// time display
  const timeDisplay = document.querySelector('.time-display');
// time select buttons
  const timeSelect = document.querySelectorAll('.time-select button');
// retrieve length of circle
  const outlineLength = outline.getTotalLength();

// button duration
  let fakeDuration = 600;

// circle timer animate motion
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

// selects sounds
  sounds.forEach(sound =>{
    sound.addEventListener('click', function() {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    })
  })

// play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  })

// select time setting
  timeSelect.forEach(option => {
    option.addEventListener('click', function() {
// select time setting
      fakeDuration = this.getAttribute('data-time');
// minutes & seconds
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:0${Math.floor(fakeDuration % 60)}`
    })
  })

// pause & play sound
const checkPlaying = song => {
  if(song.paused) {
    song.play();
    video.play();
    play.src = './svg/pause.svg';
  } else {
    song.pause()
    video.pause();
    play.src = './svg/play.svg';
  }
}

// display current position (in seconds) of the video playback
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
// resets to 0 after 60 seconds, rounded down to whole integer
    let seconds = Math.floor(elapsed % 60);
// 60 / 60 = 1 mins, , rounded down to whole integer
    let minutes = Math.floor(elapsed / 60);

// animate play circle outline
      let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;
// display the time
      timeDisplay.textContent = `${minutes}:${seconds}`;

// pauses song when current time reaches max duration of sound
      if(currentTime >= fakeDuration) {
// pause song & video
        song.pause();
        video.pause();
// reset timer
        song.currentTime = 0;
// reset to play icon
        play.src = './svg/play.svg';
      }
  };
};
// call app function
app();
