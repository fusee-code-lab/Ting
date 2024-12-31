export const randomUserAgent = () => {
  const userAgentList = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:46.0) Gecko/20100101 Firefox/46.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:46.0) Gecko/20100101 Firefox/46.0",
    "Mozilla/5.0 (Windows NT 6.3; Win64, x64; Trident/7.0; rv:11.0) like Gecko",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/13.10586",
  ];
  return userAgentList[Math.floor(Math.random() * userAgentList.length - 1)];
}

export const lyric_decode = (str: string, needTranslate = false) => {
  if (!str) {
    return needTranslate
      ? {
        lyric: [],
        translate: []
      }
      : [];
  }
  let list = str.replace(/\<\d+\>/g, '').split('\n');
  const lyric_arr: {}[] = [];
  let translate_lyric_arr: {}[] = [];
  list.forEach((item, index) => {
    const matchs = item.match(/((\[\d+:\d+\.\d+\])+)(.*)/);
    if (matchs && matchs[1]) {
      const t_array = matchs[1].match(/\[\d+:\d+\.\d+\]/g);
      if (!t_array) return;
      t_array.forEach((item) => {
        lyric_arr.push([item.substring(1, item.length - 1), matchs[3]]);
        if (needTranslate && list[index + 1]) {
          const translateMatchs = list[index + 1].match(/(\[x\-trans\])(.*)/);
          if (translateMatchs && translateMatchs[2]) {
            translate_lyric_arr.push([item.substring(1, item.length - 1), translateMatchs[2]]);
          } else {
            translate_lyric_arr.push([item.substring(1, item.length - 1), '']);
          }
        } else {
          translate_lyric_arr.push([item.substring(1, item.length - 1), '']);
        }
      });
    }
  });
  if (needTranslate && translate_lyric_arr.filter((item: any) => item[1]).length === 0) {
    translate_lyric_arr = [];
  }
  return needTranslate
    ? {
      lyric: lyric_arr.sort(),
      translate: translate_lyric_arr.sort()
    }
    : lyric_arr.sort();
}