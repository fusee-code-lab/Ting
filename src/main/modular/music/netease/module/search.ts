import { cloudsearch } from 'NeteaseCloudMusicApi';
import { MusicSearchType } from '@/types/music';
import { get_search_type, get_song_info } from '../protocol';

export const search = async (
  keywords: string,
  limit: number,
  offset: number,
  type: MusicSearchType
) => {
  const search_type = get_search_type(type);
  if (search_type == null) return;
  const res = await cloudsearch({
    keywords,
    limit,
    offset,
    type: search_type
  });
  if (res && res.status === 200 && res.body && res.body.code === 200 && res.body.result) {
    let count = 0;
    let list: any[] = [];
    switch (type) {
      case 'single':
        count = (res.body.result as any)['songCount'] as number;
        const songs = (res.body.result as any)['songs'] as any[];
        if (songs) {
          list = songs.map((song) => get_song_info(song));
        }
        break;
      case 'playlist':
        count = (res.body.result as any)['playlistCount'] as number;
        const playlists = (res.body.result as any)['playlists'] as any[];
        if (playlists) {
          list = playlists.map((item) => {
            item['playlist_id'] = item.id;
            item['source_type'] = 'netease';
            return item;
          });
        }
        break;
    }
    return {
      count,
      list
    };
  }
  return;
};
