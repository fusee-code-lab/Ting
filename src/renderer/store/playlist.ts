import { Playlist } from "@/types/playlist";
import { MusicType } from "@fuseecodelab/ting-lib";
import { createStore } from "solid-js/store";
import { playlistInsert, playlistList } from "../common/db/playlist";
import { playlist_detail } from "../common/music";
import { set_content_route } from "./content";

// 当前歌单
export const [playlist_details_data, set_playlist_details_data] = createStore<{
  [key: string]: any;
  source_type?: MusicType;
}>();

// 本地歌单
export const [playlist_list_data, set_playlist_list_data] = createStore<Playlist[]>([]);

// 判断是否存在此歌单
export const playlist_list_data_has = (type: MusicType, id: string) => {
  return playlist_list_data.some(e => e.key === `${type}_${id}`);
}

// 添加歌单
export const playlist_list_data_add = async (data: Playlist) => {
  data.timestamp = Date.now();
  data.config = {};
  await playlistInsert(data);
  set_playlist_list_data(e => ([data, ...e]));
}

// 加载歌单
export const playlist_list_data_load = async (type: MusicType, id: string) => {
  if (playlist_details_data?.source_type === type && playlist_details_data?.id === id) return;
  const res = await playlist_detail(type, id);
  if (res) {
    res['source_type'] = type;
    set_playlist_details_data(res);
    set_content_route('play_list_details');
  }
}

// 初始化加载
export const playlist_list_data_init = async () => {
  const list = await playlistList();
  list && set_playlist_list_data(list);
}



