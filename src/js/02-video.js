import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY = 'videoplayer-current-time';
const time = localStorage.getItem(KEY);
const DELAY = 1000;
player.on(
  'timeupdate',
  throttle(data => {
    // data is an object containing properties specific to that event
    localStorage.setItem(KEY, data.seconds);
  }, DELAY)
);
if (time) {
  player.setCurrentTime(time);
}
