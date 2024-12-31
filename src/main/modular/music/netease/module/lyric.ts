import { lyric as lyricApi } from 'NeteaseCloudMusicApi'
import { lyric_decode } from '../../tools';
export const lyric = async (
  id: string
) => {
  const res = await lyricApi({
    id
  }).catch((error: Error) => {
    console.error(error);
    return null;
  });
  try {
    if (res && res.status === 200 && res.body.code === 200 && res.body['lrc'] && (res.body['lrc'] as any)['lyric']) {
      const translateDecodeData: any = lyric_decode((res.body as any).lrc.lyric) || [];
      const translate = [];
      for (let i = 0; i < translateDecodeData.length - 1; i++) {
        if (translateDecodeData[i][1] !== translateDecodeData[i + 1][1]) {
          translate.push(translateDecodeData[i]);
        }
      }
      if (translateDecodeData.length) {
        translate.push(translateDecodeData.pop());
      }
      return {
        lyric: lyric_decode((res.body as any).lrc.lyric),
        translate
      }
    }
  } catch (error) {
    console.error(error);
  }
  return;
}