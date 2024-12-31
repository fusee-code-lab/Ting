import { MusicSearchType } from '@/types/music';
import { get_req_form, get_search_type, get_song_info, net } from '../protocol';
export const search = async (
  keywords: string,
  limit: number,
  offset: number,
  type: MusicSearchType = 'single'
) => {
  const search_type = get_search_type(type);
  if (search_type === null) return;
  const form = get_req_form('search') as any;
  form.req_1.param['query'] = keywords;
  form.req_1.param['page_num'] = offset;
  form.req_1.param['num_per_page'] = limit;
  form.req_1.param['search_type'] = search_type;
  const res = await net<{
    code: number;
    req_1: {
      code: number;
      data: any;
    };
  }>({
    body: JSON.stringify(form),
    method: 'POST',
    type: 'JSON'
  });
  if (res && res.data && res.data.code === 0 && res.data.req_1.code === 0 && res.data.req_1.data) {
    const count = res.data.req_1.data.meta.sum;
    let list: any[] = [];
    switch (search_type) {
      case 0:
      case 7:
        list = res.data.req_1.data.body.song.list.map((song: any) => get_song_info(song));
        break;
      case 2:
        list = res.data.req_1.data.body.album.list;
        break;
      case 3:
        list = res.data.req_1.data.body.songlist.list;
        list = list.map((item) => {
          item['playlist_id'] = item.dissid;
          item['source_type'] = 'qq';
          return item;
        });
        break;
      case 4:
        list = res.data.req_1.data.body.mv.list;
        break;
      case 8:
        list = res.data.req_1.data.body.user.list;
        break;
      default:
        return res.data.req_1.data.body;
    }
    return {
      count,
      list
    };
  }
  return;
};
