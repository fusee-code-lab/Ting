import { SongItem } from './music';

export interface Playlist {
  key: string;
  name: string;
  cover?: string;
  config?: {
    type?: 'often' | 'default';
  };
  playlist_path: string;
  songs: (SongItem & { file_path: string })[];
  timestamp?: number;
}

export type PlaylistUpdate = Omit<Playlist, 'key' | 'name' | 'playlist_path' | 'songs'> & {
  name?: string;
  playlist_path?: string;
  songs?: Playlist['songs'];
};
