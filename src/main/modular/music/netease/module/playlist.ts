import { playlist_detail as playlist_detail_api, playlist_track_all } from 'NeteaseCloudMusicApi';
import { get_song_info_in_list } from '../protocol';

export const playlist_detail = async (
  id: string
) => {
  const res = await playlist_detail_api({
    id
  }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  if (res && res.status === 200 && res.body.code === 200) {
    // @ts-ignore
    res.body.playlist.tracks = res.body.playlist.tracks.map(get_song_info_in_list);
    return res.body.playlist;
  }
  return;
}

export const playlist_song_list = async (
  id: string, limit: number, offset: number
) => {
  const res = await playlist_track_all({
    id,
    limit,
    offset
  }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  if (res && res.status === 200 && res.body.code === 200) {
    // @ts-ignore
    return res.body.songs.map(get_song_info_in_list);
  }
  return;
}