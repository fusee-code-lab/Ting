import { MusicSearchType, SongItem, SongQualityType } from '@/types/music';
import { randomUserAgent } from '../tools';
import request, { RequestOpt } from '../../net';

export let cookies: { [key: string]: string } = {};
export const set_cookie = (cookie_str: string) => {
  cookie_str.split('; ').forEach((c) => {
    const arr = c.split('=');
    cookies[arr[0]] = arr[1];
  });
  if (Number(cookies.login_type) === 2) {
    cookies.uin = cookies.wxuin;
  }
  cookies.uin = (cookies.uin || '').replace(/\D/g, '');
};

export const get_cookies_key = (key: string) => cookies[key];

export const get_cookies_str = () =>
  Object.keys(cookies)
    .map((k) => `${k}=${encodeURI(cookies[k])}`)
    .join('; ');

export const get_basic_form = (
  uin: string = get_cookies_key('uin'),
  qqmusic_key: string = get_cookies_key('qqmusic_key')
) => ({
  comm: {
    cv: 4747474,
    ct: 24,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 1,
    uin: uin,
    g_tk_new_20200303: qqmusic_key,
    g_tk: qqmusic_key
  }
});

export const get_req_form = (
  req_type: 'search' | 'getVkey' | 'getPlaylist',
  uin: string = get_cookies_key('uin')
) => {
  let data = {
    search: {
      req_1: {
        method: 'DoSearchForQQMusicDesktop',
        module: 'music.search.SearchCgiService',
        param: {
          uin: uin,
          search_type: 0,
          query: '',
          page_num: 0,
          num_per_page: 0
        }
      }
    },
    getVkey: {
      req_1: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '',
          songmid: [],
          songtype: [0],
          uin: uin,
          loginflag: 1,
          platform: '20'
        }
      }
    },
    getPlaylist: {
      req_1: {
        module: 'music.srfDissInfo.aiDissInfo',
        method: 'uniform_get_Dissinfo',
        param: {
          format: 'json',
          type: 1,
          utf8: 1,
          disstid: '',
          loginUin: uin
        }
      }
    }
  };
  return data[req_type];
};

export const get_cookies_form = (
  code: string,
  qqmusic_key: string = get_cookies_key('qqmusic_key')
) => ({
  comm: {
    g_tk: qqmusic_key,
    platform: 'yqq',
    ct: 24,
    cv: 0
  },
  req: {
    module: 'QQConnectLogin.LoginServer',
    method: 'QQLogin',
    param: {
      code: code
    }
  }
});

export const get_song_info = (info: any): SongItem => {
  let song_data: any = {
    album: {
      id: info.album.id,
      mid: info.album.mid,
      name: info.album.name
    },
    artists: info.singer.map((singer: { [key: string]: any }) => {
      return {
        id: singer.id,
        name: singer.name
      };
    }),
    id: info.mid,
    link: `https://y.qq.com/n/yqq/song/${info.mid}.html`,
    song_id: info.id,
    song_name: info.title,
    song_desc: info.desc,
    song_time: info.interval,
    cp: info.action.msg === 3 || !info.interval,
    dl: !info.pay.pay_down,
    quality: {
      192: Boolean(
        info.file.size_aac || info.file.size_192aac || info.file.size_ogg || info.file.size_192ogg
      ),
      320: Boolean(info.file.size_320 || info.file.size_320mp3),
      999: Boolean(info.file.size_flac)
    },
    mv: info.mv.vid || null,
    source_type: 'qq'
  };
  if (song_data.album.mid) {
    song_data['song_img_url'] =
      `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song_data.album.mid}.jpg`;
  } else if (info.vs && info.vs[1]) {
    song_data['song_img_url'] =
      `https://y.gtimg.cn/music/photo_new/T062R300x300M000${info.vs[1]}.jpg`;
  }
  return song_data;
};

export const get_song_info_in_list = (info: any): SongItem => {
  let song_data: any = {
    album: {
      id: info.albumid,
      mid: info.albummid,
      name: info.albumname
    },
    artists: info.singer.map((singer: { [key: string]: any }) => {
      return {
        id: singer.id,
        name: singer.name
      };
    }),
    id: info.songmid,
    link: `https://y.qq.com/n/yqq/song/${info.songmid}.html`,
    song_id: info.songid,
    song_name: info.songname,
    song_desc: info.albumdesc,
    song_time: info.interval,
    cp: info.msgid === 3 || !info.interval,
    dl: !info.pay.paydownload,
    quality: {
      192: Boolean(info.sizeogg),
      320: Boolean(info.size320),
      999: Boolean(info.sizeflac)
    },
    mv: info.vid || null,
    source_type: 'qq'
  };
  if (song_data.album.mid) {
    song_data['song_img_url'] =
      `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song_data.album.mid}.jpg`;
  }
  return song_data;
};

export const get_search_type = (type: MusicSearchType) => {
  switch (type) {
    case 'single':
      return 0;
    case 'album':
      return 2;
    case 'artist':
      return 8;
    case 'playlist':
      return 3;
    case 'user':
      return 8;
    case 'mv':
      return 4;
    case 'lyric':
      return 7;
    case 'dj':
      return null;
  }
};

export const sound_quality_map: { [key: string]: { s: string; e: string } } = {
  m4a: {
    s: 'C400',
    e: 'm4a'
  },
  128: {
    s: 'M500',
    e: 'mp3'
  },
  320: {
    s: 'M800',
    e: 'mp3'
  },
  ape: {
    s: 'A000',
    e: 'ape'
  },
  flac: {
    s: 'F000',
    e: 'flac'
  }
};

export const get_sound_quality_type = (type: SongQualityType) => {
  switch (type) {
    case 'standard':
      return sound_quality_map['128'];
    case 'exhigh':
      return sound_quality_map['320'];
    case 'lossless':
      return sound_quality_map['320'];
    case 'hires':
      return sound_quality_map['flac'];
    case 'jyeffect':
      return sound_quality_map['flac'];
    case 'jymaster':
      return sound_quality_map['flac'];
    case 'sky':
      return sound_quality_map['flac'];
  }
};

export const net = <T>(
  params: RequestOpt = {},
  url: string = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
) => {
  params.headers = Object.assign(
    {
      Referer: 'https://y.qq.com',
      Cookie: get_cookies_str(),
      'User-Agent': randomUserAgent()
    },
    params.headers
  );
  return request<T>(url, params);
};
