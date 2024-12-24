import { preload } from '@youliso/electronic/render';
import type { MusicSearchType, SongQualityType } from '@/types/music';

/**
 * 搜索
 */
export const search = (
  keywords: string,
  limit: number = 10,
  offset: number = 1,
  type: MusicSearchType = 'single'
) => {
  return preload.invoke('music-search', { keywords, limit, offset, type });
};

/**
 * 获取播放链接
 */
export const song_url = (
  ids: (string | number)[],
  level: SongQualityType = 'exhigh'
) => {
  return preload.invoke<{ [key: string]: string }>('music-songurl', { ids, level });
};

/**
 * 获取歌单详情
 */
export const playlist_detail = (id: string | number) => {
  return preload.invoke('music-playlist-details', { id });
};

/**
 * 获取歌单全部歌曲
 */
export const netease_playlist_song_list = (
  id: string | number,
  limit: number = 5,
  offset: number = 1
) => {
  return preload.invoke('music-playlist-song-list', { id, limit, offset });
};