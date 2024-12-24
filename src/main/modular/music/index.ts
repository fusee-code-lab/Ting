import { preload } from '@youliso/electronic/main';
import { neteaseOn } from './netease';
import { MusicSearchType, SongQualityType } from '@/types/music';
import { search } from './netease/module/search';
import { song_url } from './netease/module/song';
import { playlist_detail, playlist_song_list } from './netease/module/playlist';

const search_song = async (
  keywords: string,
  limit: number,
  offset: number,
  type: MusicSearchType = 'single'
) => {
  const res = await search(keywords, limit, offset, type);
  return res;
};

const get_song_url = (
  ids: (string | number)[],
  level: SongQualityType = 'exhigh'
) => {
  return song_url(ids.map(id => Number(id)), level);
};

const get_playlist_details = (
  id: string
) => {
  return playlist_detail(id);
};

/**
 * 监听
 */
export function musicOn() {
  neteaseOn();
  preload.handle('music-search', async (_, args) =>
    search_song(args.keywords, args.limit, args.offset, args.type)
  );
  preload.handle('music-songurl', async (_, args) => get_song_url(args.ids, args.level));
  preload.handle('music-playlist-details', async (_, args) => get_playlist_details(args.id));
  preload.handle('music-playlist-song-list', async (_, args) => playlist_song_list(args.id, args.offset, args.limit));
}
