import type { MusicType, SongItem } from '@fuseecodelab/ting-lib';
import { AudioPlay } from '../common/audio';
import { song_url } from '../common/music';
import { createStore } from 'solid-js/store';
import { createSignal } from 'solid-js';
import { randomInteger } from '../common/utils';

export const audio = new AudioPlay();

// 当前歌单
export const [audio_play_list_details_data, set_audio_play_list_details_data] = createStore<{
  source_type?: MusicType;
  data?: { [key: string]: any };
}>({});

// 当前播放列表
export const [audio_play_list_data, set_audio_play_list_data] = createStore<SongItem[]>([]);

// 播放模式
export const [audio_play_type, set_audio_play_type] = createSignal<'single' | 'list' | 'random'>(
  'list'
);

// 上一曲为负 下一曲为正
export const [audio_play_next_type, set_audio_play_next_type] = createSignal<number>(0);

// 当前播放下标
export const [audio_play_index, set_audio_play_index] = createSignal<number>(-1);

// 播放状态
export const [audio_status, set_audio_status] = createStore({
  type: 0,
  ingTime: 0,
  allTime: 0,
  volume: 100
});

export const audio_play_list_add = (data: SongItem[]) => {
  const old_data = audio_play_list_data.map((e) => `${e.source_type}-${e.id}`);
  const new_data = data.filter((e) => !old_data.includes(`${e.source_type}-${e.id}`));
  if (new_data.length > 0) {
    let old_len = audio_play_list_data.length;
    set_audio_play_list_data((e) => [...e, ...new_data]);
    return old_len;
  }
  return;
};

export const audio_play_list_update = (
  id: string | number,
  new_data: { [key: string]: string | number }
) => {
  const index = audio_play_list_data.findLastIndex((e) => e.id === id);
  if (index !== -1) {
    set_audio_play_list_data((e) => {
      e[index] = Object.assign(e[index], new_data);
      return e;
    });
  }
};

export const audioPlay = async (data?: SongItem) => {
  let index = (data && audio_play_list_add([data])) || audio_play_index();
  index === -1 && (index = 0);
  const song = audio_play_list_data[index];
  if (song['play_url']) {
    audio.play(song['play_url']);
    set_audio_play_index(index);
  } else {
    const res = await song_url(song.source_type, [song.id]);
    if (res && res[song.id]) {
      audio_play_list_update(song.id, { play_url: res[song.id] });
      audio.play(res[song.id]);
      set_audio_play_index(index);
    }
  }
};

export const audioPlayList = async (songs: SongItem[]) => {
  set_audio_play_list_data(songs);
  set_audio_play_index(0);
  await audioPlay();
};

export const audioNext = async (num: number) => {
  set_audio_play_next_type(num);
  switch (audio_play_type()) {
    case 'single':
      audio.src && (await audio.play());
      break;
    case 'list':
      if (audio_play_list_data.length === 0) return;
      if (audio_play_list_data.length === 1) {
        audio.src && (await audio.play());
        return;
      } else {
        const index = audio_play_index();
        if (index + num > audio_play_list_data.length - 1 || index + num < 0) {
          set_audio_play_index(0);
        } else {
          set_audio_play_index(index + num);
        }
        await audioPlay();
      }
      break;
    case 'random':
      set_audio_play_index(randomInteger(0, audio_play_list_data.length - 1));
      await audioPlay();
      break;
  }
};

export const audioOn = () => {
  audio.setVolume(audio_status.volume);
  window.addEventListener('audio-time-all', () => {
    set_audio_status('allTime', (allTime) => (allTime = audio.allTime));
  });
  window.addEventListener('audio-time-update', () => {
    set_audio_status('ingTime', (ingTime) => (ingTime = audio.ingTime));
  });
  window.addEventListener('audio-play', () => {
    set_audio_status('type', (type) => (type = 1));
  });
  window.addEventListener('audio-pause', () => {
    set_audio_status('type', (type) => (type = 0));
  });
  window.addEventListener('audio-end', () => {
    set_audio_status('type', (type) => (type = 0));
    audioNext(1);
  });
};
