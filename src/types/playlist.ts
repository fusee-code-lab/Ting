
export interface Playlist {
  key: string;
  name: string;
  cover?: string;
  timestamp?: number;
  config?: {
    type?: 'often' | 'default';
  };
}

export interface PlaylistUpdateOpt {
  name?: Playlist['name'];
  cover?: Playlist['cover'];
  config?: Playlist['config']
}