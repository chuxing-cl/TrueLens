const AUDIO_PATH = '/audio/bgm.mp3';

class BgmController {
  private audio: HTMLAudioElement;
  private playing = false;

  constructor() {
    this.audio = new Audio(AUDIO_PATH);
    this.audio.loop = true;
    this.audio.volume = 0.35;
    this.audio.preload = 'auto';
    this.audio.addEventListener('error', () => {
      this.playing = false;
    });
  }

  forcePlay(): Promise<boolean> {
    this.audio.currentTime = 0;
    return this.audio.play().then(() => {
      this.playing = true;
      return true;
    }).catch(() => {
      this.playing = false;
      return false;
    });
  }

  toggle(): Promise<boolean> {
    if (this.playing) {
      this.audio.pause();
      this.playing = false;
      return Promise.resolve(false);
    } else {
      return this.forcePlay();
    }
  }

  isPlaying() {
    return this.playing;
  }
}

export const bgm = new BgmController();
export function toggleBgm() {
  return bgm.toggle();
}
export function playBgm() {
  bgm.forcePlay();
}
export function isBgmPlaying() {
  return bgm.isPlaying();
}
