import Netease from 'NeteaseCloudMusicApi';

export const search = (keywords: string, limit: number, offset: number, type: Netease.SearchType = 1) => {
  return Netease.search({
    keywords,
    limit,
    offset,
    type,
  });
}