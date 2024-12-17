import { MusicType, SongItem } from 'ting_lib/src/types/music';
import { AudioPlay } from '../common/audio';
import { song_url } from '../common/music';
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';

export const [audio_play_data, set_audio_play_data] = createSignal<SongItem>();

export const [audio_status, set_audio_status] = createStore({
  type: 0,
  ingTime: 0,
  allTime: 0,
  volume: 100
});

export const audio = new AudioPlay();

export const audioOn = () => {
  audio.setVolume(audio_status.volume);
  window.addEventListener('audio-play', () => {
    set_audio_status('type', (type) => (type = 1));
  });
  window.addEventListener('audio-pause', () => {
    set_audio_status('type', (type) => (type = 0));
  });
  window.addEventListener('audio-end', () => {
    set_audio_status('type', (type) => (type = 0));
  });
  window.addEventListener('audio-time-all', () => {
    set_audio_status('allTime', (allTime) => (allTime = audio.allTime));
  });
  window.addEventListener('audio-time-update', () => {
    set_audio_status('ingTime', (ingTime) => (ingTime = audio.ingTime));
  });
};

export const audioPlay = async (type: MusicType, data: SongItem) => {
  const res = await song_url(type, [data.id]);
  if (res && res[data.id]) {
    set_audio_play_data(data);
    audio.play(res[data.id]);
  }
};

audioOn();
