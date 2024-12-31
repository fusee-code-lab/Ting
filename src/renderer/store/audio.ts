import type { SongItem, SongQualityType } from '@/types/music';
import { AudioPlay, getSpeakerList } from '../common/audio';
import { song_url } from '../common/music';
import { createStore, produce } from 'solid-js/store';
import { createSignal } from 'solid-js';
import { randomInteger } from '../common/utils';
import { settingKey, settingSet } from '../common/db/basic';

// 播放设备
export const [audio_device, set_audio_device] =
  createSignal<MediaDeviceInfo['deviceId']>('default');

export const audio = new AudioPlay();

// 设置播放设备
export const audio_device_set = async (deviceId: MediaDeviceInfo['deviceId']) => {
  const speakerList = await getSpeakerList();
  const old_id = audio_device();
  const id = speakerList.find((e) => e.deviceId === deviceId)?.deviceId || 'default';
  const is_up = old_id == id;
  if (is_up) return;
  try {
    await audio.switchOutputDevice(id).catch((error) => {
      throw error;
    });
    await settingSet('audio_device', id);
    set_audio_device(id);
  } catch (error) {
    console.error(error);
  }
};

// 当前播放列表
export const [audio_list_data, set_audio_list_data] = createStore<SongItem[]>([]);

// 播放模式
export const [audio_type, set_audio_type] = createSignal<'single' | 'list' | 'random'>('list');

// 播放质量
export const [audio_quality, set_audio_quality] = createSignal<SongQualityType>('exhigh');

// 上一曲为负 下一曲为正
export const [audio_next_type, set_audio_next_type] = createSignal<number>(0);

// 当前播放下标
export const [audio_index, set_audio_index] = createSignal<number>(-1);

// 播放状态
export const [audio_status, set_audio_status] = createStore({
  type: 0,
  ingTime: 0,
  allTime: 0,
  volume: 100
});

// 当前播放歌曲
export const audio_play_ing_data = () => audio_list_data[audio_index()] || null;

// 判断是否是当前歌曲
export const is_audio_play_ing_data = (key: string) => {
  const data = audio_play_ing_data();
  if (data && `${data.id}_${data.source_type}` === key) {
    return true;
  }
  return false;
};

// 设置播放质量
export const audio_quality_set = async (type: SongQualityType) => {
  await settingSet('audio_quality', type);
  set_audio_quality(type);
};

// 歌曲列表添加（批量）
export const audio_list_adds = (data: SongItem[], reset: boolean = false) => {
  const old_data = audio_list_data.map((e) => `${e.source_type}-${e.id}`);
  const new_data = data.filter((e) => !old_data.includes(`${e.source_type}-${e.id}`));
  if (new_data.length > 0) {
    set_audio_list_data((e) => (reset ? new_data : [...e, ...new_data]));
  }
};

// 歌曲列表添加
export const audio_list_add = (data: SongItem) => {
  const index = audio_list_data.findLastIndex(
    (e) => `${e.source_type}-${e.id}` === `${data.source_type}-${data.id}`
  );
  if (index === -1) {
    set_audio_list_data((e) => [...e, data]);
    return audio_list_data.length - 1;
  }
  return index;
};

// 歌曲列表删除
export const audio_list_remove = (id: string | number) => {
  const index = audio_list_data.findLastIndex((e) => e.id === id);
  if (index !== -1) {
    const isIng = index === audio_index();
    set_audio_list_data(produce((data) => data.splice(index, 1)));
    isIng && audioPlay();
  }
};

// 歌曲列表更新
export const audio_list_update = (
  id: string | number,
  new_data: { [key: string]: string | number }
) => {
  const index = audio_list_data.findLastIndex((e) => e.id === id);
  if (index !== -1) {
    set_audio_list_data(
      produce((data) => {
        data[index] = Object.assign(data[index], new_data);
      })
    );
  }
};

// 初始化加载
export const audio_init = async () => {
  const res = await Promise.all([settingKey('audio_quality'), settingKey('audio_device')]);
  res[0] && set_audio_quality(res[0] as SongQualityType);
  // 初始化播放设备
  if (res[1]) {
    try {
      await audio.switchOutputDevice(res[1]).catch((error) => {
        throw error;
      });
      set_audio_device(res[1]);
    } catch (error) {
      console.error(error);
    }
  }
};

export const audioPlay = async (data?: SongItem) => {
  let index = (data && audio_list_add(data)) ?? audio_index();
  index === -1 && (index = 0);
  const song = audio_list_data[index];
  if (song['play_url']) {
    audio.play(song['play_url']);
    set_audio_index(index);
  } else {
    const res = await song_url(song.source_type, [song.id], audio_quality());
    if (res && res[song.id]) {
      audio_list_update(song.id, { play_url: res[song.id] });
      audio.play(res[song.id]);
      set_audio_index(index);
    }
  }
};

export const audioPlayList = async (songs: SongItem[]) => {
  audio_list_adds(songs, true);
  set_audio_index(0);
  await audioPlay();
};

export const audioNext = async (num: number) => {
  set_audio_next_type(num);
  switch (audio_type()) {
    case 'single':
      audio.src && (await audio.play());
      break;
    case 'list':
      if (audio_list_data.length === 0) return;
      if (audio_list_data.length === 1) {
        audio.src && (await audio.play());
        return;
      } else {
        const index = audio_index();
        if (index + num > audio_list_data.length - 1 || index + num < 0) {
          set_audio_index(0);
        } else {
          set_audio_index(index + num);
        }
        await audioPlay();
      }
      break;
    case 'random':
      set_audio_index(randomInteger(0, audio_list_data.length - 1));
      await audioPlay();
      break;
  }
};

export const audioSetVolume = (volume: number) => {
  audio.setVolume(volume);
  set_audio_status('volume', volume);
};

export const audioSetCurrentIngTime = (e: number) => {
  audio.currentIngTime(e);
  set_audio_status('ingTime', e);
};

export const audioSetCurrentTime = (e: number) => {
  audio.currentTime(e);
  set_audio_status('ingTime', e);
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
