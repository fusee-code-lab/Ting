import Netease from 'NeteaseCloudMusicApi';

export const search = async (keywords: string, limit: number, offset: number, type: number) => {
  const res = await Netease.cloudsearch({
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

export const song_url = async (id: string | number, level: Netease.SoundQualityType) => {
  const res = await Netease.song_url_v1({
    id,
    level
  }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  if (res && res.status === 200 && res.body.code === 200) {
    return (res.body.data as any[])[0];
  }
  return;
};
