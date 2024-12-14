const Qq = require('qq-music-api');

// 0：单曲，2：歌单，7：歌词，8：专辑，9：歌手，12：mv
export enum SearchType {
  single = 0,
  album = 8,
  playlist = 2,
  user = 9,
  mv = 12,
  lyric = 7,
}

export const search = async (key: string, limit: number, offset: number, type: SearchType = SearchType.single) => {
  return Qq.api('search', { key, pageNo: offset, pageSize: limit, t: type })
}
