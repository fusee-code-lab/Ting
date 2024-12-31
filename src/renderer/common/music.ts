import { preload } from '@youliso/electronic/render';
import type {
  MusicSearchType,
  MusicType,
  PlayListItem,
  SongItem,
  SongQualityType
} from '@/types/music';

/**
 * 搜索
 */
export const search = (
  keywords: string,
  limit: number = 10,
  offset: number = 1,
  type: MusicSearchType = 'single'
) => {
  return preload.invoke('music-search', {
    keywords,
    limit,
    offset,
    type
  });
};

/**
 * 获取播放链接
 */
export const song_url = (
  type: MusicType,
  ids: (string | number)[],
  level: SongQualityType = 'exhigh'
) => {
  return preload.invoke<{ [key: string]: string }>('music-songurl', { type, ids, level });
};

/**
 * 获取歌单详情
 */
export const playlist_detail = (type: MusicType, id: string | number) => {
  return preload.invoke('music-playlist-details', { type, id });
};

/**
 * 获取歌单全部歌曲
 */
export const netease_playlist_song_list = (
  type: MusicType,
  id: string | number,
  limit: number = 5,
  offset: number = 1
) => {
  return preload.invoke('music-playlist-song-list', { type, id, limit, offset });
};
