import Netease from 'NeteaseCloudMusicApi';

export const search = async (keywords: string, limit: number, offset: number, type: number) => {
  const res = await Netease.search({
    keywords,
    limit,
    offset,
    type
  }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  if (res && res.status === 200 && res.body && res.body.code === 200 && res.body.result) {
    const songs = (res.body.result as any)['songs'] as any[];
    const total = (res.body.result as any)['songCount'] as number;
    return {
      total,
      songs
    };
  }
  return;
};

export const song_url = (id: string | number, level: Netease.SoundQualityType) => {
  return Netease.song_url_v1({
    id,
    level
  });
};
