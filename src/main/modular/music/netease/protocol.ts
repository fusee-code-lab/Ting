import { MusicSearchType, SongItem } from "@/types/music";

const getRestrictLevel = (bm5r: any, fC7v: any) => {
  if (!bm5r) return 0;
  if (bm5r.program) return 0;
  if (fC7v) {
    if (fC7v.st != null && fC7v.st < 0) return 100;
    if (fC7v.fee > 0 && fC7v.fee != 8 && fC7v.payed == 0 && fC7v.pl <= 0) return 10;
    if (fC7v.fee == 16 || (fC7v.fee == 4 && fC7v.flag & 2048)) return 11;
    if ((fC7v.fee == 0 || fC7v.payed) && fC7v.pl > 0 && fC7v.dl == 0) return 1e3;
    if (fC7v.pl == 0 && fC7v.dl == 0) return 100;
    return 0;
  } else {
    if (bm5r.status >= 0) return 0;
    if (bm5r.fee > 0) return 10;
    return 100;
  }
}
const qA8s = (fB4F: any) => {
  if (fB4F.st != null && fB4F.st < 0) return 100;
  if (fB4F.fee > 0 && fB4F.fee != 8 && fB4F.payed == 0 && fB4F.pl <= 0) return 10;
  if (fB4F.fee == 16 || (fB4F.fee == 4 && fB4F.flag & 2048)) return 11;
  if ((fB4F.fee == 0 || fB4F.payed) && fB4F.pl > 0 && fB4F.dl == 0) return 1e3;
  if (fB4F.pl == 0 && fB4F.dl == 0) return 100;
  return 0;
}

const disable = (song: any, privilege: any) => {
  return getRestrictLevel(song, privilege) === 100 || qA8s(privilege) === 10;
}

export const get_song_info = (info: any): SongItem => {
  let song_data = {
    album: {
      id: info.al.id,
      name: info.al.name
    },
    artists: info.ar.map((ar: { [key: string]: any }) => {
      return {
        id: ar.id,
        name: ar.name
      };
    }),
    id: info.id,
    link: `https://music.163.com/#/song?id=${info.id}`,
    song_id: info.id,
    song_name: info.name,
    song_desc: info.al.name,
    song_time: info.dt / 1000,
    song_img_url: info.al.picUrl,
    cp: disable(info, info.privilege),
    dl: !info.privilege.fee,
    quality: {
      192: info.privilege.maxbr >= 192000,
      320: info.privilege.maxbr >= 320000,
      999: info.privilege.maxbr >= 999000
    },
    mv: info.mv || null,
    source_type: 'netease'
  }
  return song_data as SongItem;
}

export const get_song_info_in_list = (info: any): SongItem => {
  let song_data = {
    album: {
      id: info.al.id,
      name: info.al.name
    },
    artists: info.ar.map((ar: { [key: string]: any }) => {
      return {
        id: ar.id,
        name: ar.name
      };
    }),
    id: info.id,
    link: `https://music.163.com/#/song?id=${info.id}`,
    song_id: info.id,
    song_name: info.name,
    song_desc: info.al.name,
    song_time: info.dt / 1000,
    song_img_url: info.al.picUrl,
    cp: info.cp,
    dl: !info.fee,
    quality: {
      192: info.m?.br >= 192000,
      320: info.h?.br >= 320000,
      999: info.sq?.br >= 999000
    },
    mv: info.mvid || null,
    source_type: 'netease'
  }
  return song_data as SongItem;
}

export const get_search_type = (type: MusicSearchType) => {
  switch (type) {
    case "single":
      return 1;
    case "album":
      return 10;
    case "artist":
      return 100;
    case "playlist":
      return 1000;
    case "user":
      return 1002;
    case "mv":
      return 1004;
    case "lyric":
      return 1006;
    case "dj":
      return 1009;
  }
};