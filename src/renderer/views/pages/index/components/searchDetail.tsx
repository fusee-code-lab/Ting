import audio from '@/renderer/common/audio';
import { getSongUrl } from '@/core/renderer/musicapi';
import { css } from '@emotion/css/macro';

const style = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding: 10px;
  > .songs,
  .sheets {
    > .title {
      padding: 10px 0;
      color: var(--label);
      font: normal 16px/16px ping-fang;
    }
    > .items {
      > .item {
        position: relative;
        display: inline-flex;
        width: 120px;
        height: 120px;
        > .bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        > .name {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 5px;
          color: var(--white);
          font: normal 12px/12px ping-fang;
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
`;

export default class {
  songsEl = (
    <div class="songs">
      <div class="title"></div>
    </div>
  ) as HTMLDivElement;
  sheetsEl = (
    <div class="sheets">
      <div class="title"></div>
    </div>
  ) as HTMLDivElement;

  constructor() {
    addEventListener('search-song-sheet', this.onSearch.bind(this));
  }

  un() {
    removeEventListener('search-song-sheet', this.onSearch);
  }

  onSearch({ detail }: any) {
    console.log(detail);
    const [songsData, sheetsData] = detail;
    this.onSongs(songsData);
    this.onSheets(sheetsData);
  }

  onSongs(songsData: any) {
    if (songsData.status) {
      const titleEl = this.songsEl.getElementsByClassName('title')[0];
      titleEl.textContent = '歌曲';
      const items = <div class="items"></div>;
      for (const song of songsData.data.songs) {
        items.appendChild(
          <div class="item" onClick={() => this.play(song)}>
            <img class="bg" src={song.album.cover} alt={song.album.name} />
            <div class="name">{song.name}</div>
          </div>
        );
      }
      const oels = this.songsEl.getElementsByClassName('items');
      oels.length > 0 && this.songsEl.removeChild(oels[0]);
      this.songsEl.appendChild(items);
    }
  }

  onSheets(sheetsData: any) {
    if (sheetsData.status) {
      const titleEl = this.sheetsEl.getElementsByClassName('title')[0];
      titleEl.textContent = '歌单';
      const items = <div class="items"></div>;
      for (const sheet of sheetsData.data.sheets) {
        items.appendChild(
          <div class="item">
            <img
              class="bg"
              src={sheet.coverImgUrl || sheet.imgurl}
              alt={sheet.name || sheet.dissname}
            />
            <div class="name">{sheet.name || sheet.dissname}</div>
          </div>
        );
      }
      const oels = this.sheetsEl.getElementsByClassName('items');
      oels.length > 0 && this.sheetsEl.removeChild(oels[0]);
      this.sheetsEl.appendChild(items);
    }
  }

  async play(item: any) {
    let req = await getSongUrl(item.vendor, item.id);
    if (req) {
      console.log(req);
      audio.play(req.url);
    }
  }

  render() {
    return (
      <div class={style}>
        {this.songsEl}
        {this.sheetsEl}
      </div>
    );
  }
}
