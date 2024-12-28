import { Playlist, PlaylistUpdate } from '@/types/playlist';
import { preload } from '@youliso/electronic/render';

export const playlistList = () => preload.invoke<Playlist[] | undefined>('playlist-list');

export const playlistInsert = (value: Omit<Playlist, 'key'>) =>
  preload.invoke('playlist-insert', [value]);

export const playlistUpdate = (data: PlaylistUpdate, key?: string) => {
  return preload.invoke('playlist-update', { data, key });
};

export const playlistDelete = (key: string) => preload.invoke('playlist-delete', key);
