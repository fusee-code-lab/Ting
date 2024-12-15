const QQ = require('qq-music-api');

export const set_cookie = (data: string) => QQ.setCookie(data);

export const get_cookie = () => QQ.cookie;

// 0：单曲，2：歌单，7：歌词，8：专辑，9：歌手，12：mv
export const search = async (key: string, limit: number, offset: number, type: number) => {
  const res = await QQ.api('search', { key, pageNo: offset, pageSize: limit, t: type }).catch(
    (error: Error) => {
      console.error(error);
      return null;
    }
  );
  if (res && res.list && res.list.length > 0) {
    const songs = res.list as any[];
    songs.forEach(
      (e) => (e.cover_url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${e.albummid}.jpg`)
    );
    const total = res.total as number;
    return {
      total,
      songs
    };
  }
  return;
};

export const song_url = async (id: string) => {
  const res = await QQ.api('song/urls', { id }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  if (res && res[id]) {
    return {
      id,
      url: res[id]
    };
  }
  return;
};
