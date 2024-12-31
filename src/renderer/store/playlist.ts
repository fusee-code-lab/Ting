import { Playlist } from '@/types/playlist';
import { createStore, unwrap, produce } from 'solid-js/store';
import { playlistInsert, playlistList, playlistUpdate } from '../common/db/playlist';
import { playlist_detail } from '../common/music';
import { set_content_route } from './content';
import { createSignal } from 'solid-js';
import { settingKey, settingSet } from '../common/db/basic';
import { showOpenDialog } from '../common/dialog';
import { MusicType, PlayList, SongItem } from '@/types/music';
import { preload, windowMessageOn } from '@youliso/electronic/render';

// 当前歌单(在线歌单)
export const [playlist_details_online_data, set_playlist_details_online_data] =
  createSignal<PlayList>();

// 加载在线歌单
export const playlist_online_load = async (type: MusicType, id: string) => {
  const playlist_details_online = playlist_details_online_data();
  if (
    playlist_details_online &&
    playlist_details_online.source_type === type &&
    playlist_details_online.id === id
  )
    return;
  const res = await playlist_detail(type, id);
  if (res) {
    set_playlist_details_online_data(res);
    set_content_route('playlist_details_online');
  }
};

// 当前歌单下标(本地歌单)
export const [playlist_local_index, set_playlist_local_index] = createSignal<number>(0);

// 本地歌单
export const [playlist_local_data, set_playlist_local_data] = createStore<Playlist[]>([]);

// 歌单存储路径
export const [playlist_save_path, set_playlist_save_path] = createSignal<string>();

// 设置歌单存储路径
export const playlist_save_path_set = async (path: string) => {
  await settingSet('playlist_save_path', path);
  set_playlist_save_path(path);
};

// 新建本地歌单
export const playlist_local_insert = async (name: string) => {
  const res = await showOpenDialog({
    title: '选择歌单歌曲存储路径',
    properties: ['openDirectory'],
    defaultPath: playlist_save_path()
  });
  if (res.canceled) return false;
  const playlist_path = res.filePaths[0];
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

// 添加歌曲到本地歌单
export const playlist_local_add = async (key: string, data: SongItem[]) => {
  let playlistIndex = playlist_local_data.findIndex((item) => item.key === key);
  if (playlistIndex != -1) {
    const old_songs = playlist_local_data[playlistIndex].songs;
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
    set_playlist_local_data(
      playlistIndex,
      produce((data) => (data.songs = new_songs))
    );
  }
};

// 监听更新
windowMessageOn('playlist-sheet-update', ({ name }) => {
  console.log('playlist-sheet-update', name);
  playlistList().then((list) => {
    list && set_playlist_local_data(list);
  });
});

// 监听本地歌单歌曲变化
preload.on('menu-song-command', async ({ type, data }) => {
  console.log('menu-song-command', type, data);
  switch (type) {
    case 'del':
      let playlistIndex = playlist_local_data.findIndex((item) => item.key === data.key);
      if (playlistIndex != -1) {
        set_playlist_local_data(
          playlistIndex,
          produce((e) => {
            const songIndex = e.songs.findIndex(
              (song) => song.id === data.song.id && song.source_type === data.song.source_type
            );
            if (songIndex != -1) {
              e.songs.splice(songIndex, 1);
            }
          })
        );
        await playlistUpdate(
          {
            songs: unwrap(playlist_local_data[playlistIndex].songs)
          },
          data.key
        );
      }
      break;
  }
});

// 加载本地歌单
export const playlist_local_load = (index: number) => {
  set_playlist_local_index(index);
  set_content_route('playlist_details');
};

// 初始化加载
export const playlist_local_init = async () => {
  const res = await Promise.all([playlistList(), settingKey('playlist_save_path')]);
  res[0] && set_playlist_local_data(res[0]);
  res[1] && set_playlist_save_path(res[1]);
};
