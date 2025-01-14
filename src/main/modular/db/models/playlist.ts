import { SongItem } from '@/types/music';
import { Playlist } from '@/types/playlist';
import Realm, { ObjectSchema } from 'realm';
import { getUUID } from '@/main/modular/tools';

export const playlistconfig_name = 'PlayListConfig';

export class PlayListConfig extends Realm.Object {
  type?: Playlist['config'];

  static schema: ObjectSchema = {
    name: playlistconfig_name,
    embedded: true, // default: false
    properties: {
      type: 'string?'
    }
  };
}
export const playlist_name = 'PlayList';

export class PlayList extends Realm.Object {
  key!: string;
  name!: string;
  playlist_path!: string;
  songs: Array<SongItem & { file_path: string }> = [];
  cover?: string;
  config?: PlayListConfig['type'];
  timestamp?: Date;

  static schema: ObjectSchema = {
    name: playlist_name,
    primaryKey: 'key',
    properties: {
      key: { type: 'string', default: () => getUUID() },
      name: 'string',
      playlist_path: { type: 'string', indexed: true },
      cover: 'string?',
      config: `${playlistconfig_name}?`,
      songs: {
        type: 'list',
        objectType: 'mixed'
      },
      timestamp: 'date?'
    }
  };
}
