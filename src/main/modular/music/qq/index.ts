import { set_cookie } from './protocol';
import { search } from './module/search';
import { song_url } from './module/song';
import { playlist_detail } from './module/playlist';
import { lyric } from './module/lyric';

export const qq = {
  search,
  song_url,
  playlist_detail,
  set_cookie,
  lyric
};

/**
 * 监听
 */
export function qqOn() {}
