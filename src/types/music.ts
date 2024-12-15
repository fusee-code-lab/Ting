export enum MusicType {
  Netease = 'netease',
  QQ = 'qq'
}

export enum MusicSearchType {
  single = 1, // 单曲
  album = 2, // 专辑
  artist = 3, // 歌手
  playlist = 4, // 歌单
  user = 5, // 用户
  mv = 6, // mv
  lyric = 7, // 歌词
  dj = 8 // 电台
}

export const enum SoundQualityType {
  standard = 'standard',
  exhigh = 'exhigh',
  lossless = 'lossless',
  hires = 'hires',
  jyeffect = 'jyeffect',
  jymaster = 'jymaster',
  sky = 'sky'
}

export interface MusicItem {
  total: number;
  songs: any[];
}

export interface MusicList {
  netease: MusicItem[] | undefined;
  qq: MusicItem[] | undefined;
}
