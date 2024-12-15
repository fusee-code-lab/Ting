import { MusicSearchType, MusicType } from '@/types/music';

export const getSearchType = (platform: MusicType, type: MusicSearchType) => {
  switch (type) {
    case MusicSearchType.single:
      switch (platform) {
        case MusicType.Netease:
          return 1;
        case MusicType.QQ:
          return 0;
      }
    case MusicSearchType.album:
      switch (platform) {
        case MusicType.Netease:
          return 10;
        case MusicType.QQ:
          return 8;
      }
    case MusicSearchType.artist:
      switch (platform) {
        case MusicType.Netease:
          return 100;
        case MusicType.QQ:
          return 9;
      }
    case MusicSearchType.playlist:
      switch (platform) {
        case MusicType.Netease:
          return 1000;
        case MusicType.QQ:
          return 2;
      }
    case MusicSearchType.user:
      switch (platform) {
        case MusicType.Netease:
          return 1002;
        case MusicType.QQ:
          return null;
      }
    case MusicSearchType.mv:
      switch (platform) {
        case MusicType.Netease:
          return 1004;
        case MusicType.QQ:
          return 12;
      }
    case MusicSearchType.lyric:
      switch (platform) {
        case MusicType.Netease:
          return 1006;
        case MusicType.QQ:
          return 7;
      }
    case MusicSearchType.dj:
      switch (platform) {
        case MusicType.Netease:
          return 1009;
        case MusicType.QQ:
          return null;
      }
  }
};
