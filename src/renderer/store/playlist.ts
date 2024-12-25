import { Playlist } from "@/types/playlist";
import { createStore } from "solid-js/store";
import { playlistInsert, playlistList } from "../common/db/playlist";
import { playlist_detail } from "../common/music";
import { set_content_route } from "./content";
import { createSignal } from "solid-js";
import { settingInsert, settingKey, settingUpdate } from "../common/db/basic";

// 当前歌单
export const [playlist_details_data, set_playlist_details_data] = createStore<{
  [key: string]: any
}>();

// 本地歌单
export const [playlist_list_data, set_playlist_list_data] = createStore<Playlist[]>([]);

// 歌单存储路径
export const [playlist_save_path, set_playlist_save_path] = createSignal<string>();

// 设置歌单存储路径
export const playlist_save_path_set = async (path: string) => {
  if (playlist_save_path()) {
    await settingUpdate('playlist_save_path', path);
  } else {
    await settingInsert([{ key: 'playlist_save_path', data: path }]);
  }
  set_playlist_save_path(path);
}

// 判断是否存在此歌单
export const playlist_list_data_has = (id: string) => {
  return playlist_list_data.some(e => e.key == `netease_${id}`);
}

// 添加歌单
export const playlist_list_data_add = async (data: Playlist) => {
  data.timestamp = Date.now();
  data.config = {};
  await playlistInsert(data);
  set_playlist_list_data(e => ([data, ...e]));
}

// 加载歌单
export const playlist_list_data_load = async (id: string) => {
  if (playlist_details_data?.id === id) return;
  const res = await playlist_detail(id);
  if (res) {
    set_playlist_details_data(res);
    set_content_route('play_list_details');
  }
}

// 初始化加载
export const playlist_list_data_init = async () => {
  const res = await Promise.all([playlistList(), settingKey('playlist_save_path')]);
  res[0] && set_playlist_list_data(res[0]);
  res[1] && set_playlist_save_path(res[1]);
}



