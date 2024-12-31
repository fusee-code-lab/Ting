import { get_req_form, get_song_info_in_list, net } from '../protocol';

export const playlist_detail = async (diss_id: string) => {
  const form = get_req_form('getPlaylist') as any;
  form.req_1.param['disstid'] = diss_id;
  const res = await net<any>(
    {
      data: form.req_1.param,
      method: 'GET',
      headers: {
        Referer: 'https://y.qq.com/n/yqq/playlist'
      },
      type: 'JSON'
    },
    'https://i.y.qq.com/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  );
  try {
    if (res && res.data.code === 0) {
      res.data.cdlist.forEach((item: any) => {
        item['playlist_songs'] = item.songlist.map(get_song_info_in_list);
        item['playlist_id'] = item.disstid;
        item['source_type'] = 'qq';
      });
      return res.data.cdlist[0];
    }
  } catch (error) {
    console.error(error);
  }
  return;
};
