import { Playlist } from '@/types/playlist';
import { createStore, unwrap, produce } from 'solid-js/store';
import { playlistInsert, playlistList, playlistUpdate } from '../common/db/playlist';
import { playlist_detail } from '../common/music';
import { set_content_route } from './content';
import { createSignal } from 'solid-js';
import { settingKey, settingSet } from '../common/db/basic';
import { showOpenDialog } from '../common/dialog';
import { OS } from '.';
import { SongItem } from '@/types/music';
import { windowMessageOn } from '@youliso/electronic/render';

// 当前歌单(本地歌单)
export const [playlist_details_data, set_playlist_details_data] = createSignal<Playlist>();

// 当前歌单(在线歌单)
export const [playlist_details_online_data, set_playlist_details_online_data] = createStore<{
  [key: string]: any;
}>();

// 本地歌单
export const [playlist_list_data, set_playlist_list_data] = createStore<Playlist[]>([]);

// 歌单存储路径
export const [playlist_save_path, set_playlist_save_path] = createSignal<string>();

// 设置歌单存储路径
export const playlist_save_path_set = async (path: string) => {
  await settingSet('playlist_save_path', path);
  set_playlist_save_path(path);
};

// 判断是否存在此歌单
export const playlist_list_data_has = (id: string) => {
  return playlist_list_data.some((e) => e.key == `netease_${id}`);
};

// 新建歌单
export const playlist_list_data_insert = async (name: string) => {
  const res = await showOpenDialog({
    title: '选择歌单路径',
    properties: ['openDirectory'],
    defaultPath: playlist_save_path()
  });
  if (res.canceled) return false;
  const playlist_path = res.filePaths[0] + (OS === 'win' ? '\\' : '/') + name;
  try {
    await playlistInsert({
      name,
      cover: '',
      playlist_path,
      songs: []
    });
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
};

// 添加歌曲到歌单
export const playlist_list_data_add = async (key: string, data: SongItem[]) => {
  let playlistIndex = playlist_list_data.findIndex((item) => item.key === key);
  if (playlistIndex != -1) {
    const old_songs = playlist_list_data[playlistIndex].songs;
    const keys = old_songs.map((item) => `${item.song_id}_${item.source_type}`);
    const add_songs = data
      .filter((item) => !keys.includes(`${item.song_id}_${item.source_type}`))
      .map((e) => ({ ...e, file_path: `./${e.song_name}` }));
    const new_songs = [...add_songs, ...unwrap(old_songs)] as Playlist['songs'];
    await playlistUpdate(
      {
        songs: new_songs
      },
      key
    );
    set_playlist_list_data(
      playlistIndex,
      produce((data) => (data.songs = new_songs))
    );
  }
};

// 加载在线歌单
export const playlist_list_online_data_load = async (id: string) => {
  if (playlist_details_online_data?.id === id) return;
  const res = await playlist_detail(id);
  if (res) {
    set_playlist_details_online_data(res);
    set_content_route('playlist_details_online');
  }
};

// 监听更新
windowMessageOn('playlist-sheet-update', ({ name }) => {
  console.log('playlist-sheet-update', name);
  playlistList().then((list) => {
    list && set_playlist_list_data(list);
  });
});

// 加载本地歌单
export const playlist_list_data_load = (data: Playlist) => {
  set_playlist_details_data(data);
  set_content_route('playlist_details');
};

// 初始化加载
export const playlist_list_data_init = async () => {
  const res = await Promise.all([playlistList(), settingKey('playlist_save_path')]);
  console.log(res[0]);

  res[0] && set_playlist_list_data(res[0]);
  res[1] && set_playlist_save_path(res[1]);
};
