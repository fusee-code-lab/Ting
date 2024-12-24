import { cloudsearch } from 'NeteaseCloudMusicApi';
import { MusicSearchType } from '@/types/music';
import { get_search_type, get_song_info } from '../protocol';

export const search = async (keywords: string, limit: number, offset: number, type: MusicSearchType) => {
  const search_type = get_search_type(type);
  if (search_type == null) return;
  const res = await cloudsearch({
    keywords,
    limit,
    offset,
    type: search_type
  });
  if (res && res.status === 200 && res.body && res.body.code === 200 && res.body.result) {
    switch (type) {
      case 'single':
        const songs = (res.body.result as any)['songs'] as any[]
        if (songs) {
          (res.body.result as any)['songs'] = songs.map(song => get_song_info(song));
        }
        break;
    }
    return res.body.result;
  }
  return;
};