import { lyric_decode } from '../../tools';
import { net } from '../protocol';

export const lyric = async (id: string) => {
  const res = await net<any>(
    {
      data: {
        songmid: id,
        g_tk: 5381,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        nobase64: 1
      },
      method: 'GET',
      type: 'JSON'
    },
    'https://i.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  );
  try {
    return {
      lyric: lyric_decode(res.data.lyric),
      translate: lyric_decode(res.data.trans)
    };
  } catch (error) {
    console.error(error);
  }
  return;
};
