const QQ = require('qq-music-api');

export const set_cookie = (data: string) => QQ.setCookie(data);

set_cookie(
  `pgv_pvid=2428419204; pac_uid=0_AdaixCdABydb1; _qimei_uuid42=18b09143a391003d99eb6f10339895237828b6a893; _qimei_fingerprint=2e465229aba7f47d79c2dc8a1ef2b367; _qimei_q32=7b897377f83f6e1774862588c60e37ec; _qimei_h38=883efd1099eb6f10339895230200000e418b09; _qimei_q36=143892fb09722ba261f08d9d300019c18b09; RK=VlGkVMCSny; ptcz=d41e3a14bb3ed2157090e311766c580ed4ad93478b7d4a66d0a989d6655d7f47; eas_sid=j1a7z3t1Q5B0I3i26468o758f4; qq_domain_video_guid_verify=1e2527d541b1261e; ts_refer=www.bing.com/; ts_uid=815333736; psrf_qqunionid=9B5726100A80D9C437E3C2CBF0EC0A15; psrf_qqopenid=D5FE3D3B7C606018B728F61491795ED7; psrf_musickey_createtime=1734237894; music_ignore_pskey=202306271436Hn@vBj; euin=oi-P7iS5oi657z**; uin=3247713117; psrf_qqaccess_token=E55199E1F8942EAC9BB38DE909A1B679; qqmusic_key=Q_H_L_63k3N-QzdbNOy1m5xDU55xjcnK8WBlV6M0jEFisrl4VFnhGBwW87Tc_LTY_Q9WtVzAFQp9tJhI9F37fzYKDFsgNNMO_A; wxopenid=; qm_keyst=Q_H_L_63k3N-QzdbNOy1m5xDU55xjcnK8WBlV6M0jEFisrl4VFnhGBwW87Tc_LTY_Q9WtVzAFQp9tJhI9F37fzYKDFsgNNMO_A; wxunionid=; psrf_access_token_expiresAt=1734842694; tmeLoginType=2; wxrefresh_token=; psrf_qqrefresh_token=9C47D01AB5945979E7B36671083E59D2; userAction=1; fqm_pvqid=e72787c2-5de7-4575-8a75-603919f14aca; player_exist=1; pgv_info=ssid=s1135108870; fqm_sessionid=579543ea-e23e-4b8e-8882-f1884bbfbb78; yq_index=5; yqq_stat=1; ts_last=y.qq.com/n/ryqq/songDetail/002UGAxF0zeCAj; yplayer_open=0`
);

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
