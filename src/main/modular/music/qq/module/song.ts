import { SongQualityType } from "@/types/music";
import { get_req_form, get_sound_quality_type, net } from "../protocol";

export const song_url = async (
  ids: string[],
  quality: SongQualityType = 'exhigh'
) => {
  const guid = (Math.random() * 10000000).toFixed(0);
  const quality_type = get_sound_quality_type(quality)
  if (!quality_type) {
    console.error("不支持的音质类型: " + quality);
    return;
  }
  const form = get_req_form('getVkey') as any;
  form.req_1.param['guid'] = guid;
  form.req_1.param['songmid'].push(...ids);
  const res = await net<any>({
    body: JSON.stringify(form),
    method: "POST",
    type: "JSON"
  });
  try {
    const domain = res.data?.req_1.data.sip.find((i: string) => !i.startsWith('http://ws')) || res.data?.req_1.data.sip[0];
    let urls: { [key: string]: string } = {};
    res.data?.req_1.data.midurlinfo.filter((e: any) => !!e.purl).forEach((e: any) => {
      const id = e.songmid;
      const purl = e.purl;
      urls[id] = domain + purl;
    });
    return urls;
  } catch (error) {
    console.error(error);
  }
  return;
};