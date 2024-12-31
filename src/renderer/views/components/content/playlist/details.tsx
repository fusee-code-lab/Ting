import { css, cx } from '@emotion/css';
import { SongList } from './item';
import { textEllipsis } from '@/renderer/views/styles';
import Button from '../../basis/button';
import { audioPlayList } from '@/renderer/store/audio';
import { playlist_local_data, playlist_local_index } from '@/renderer/store/playlist';

const style = css`
  height: 100%;
  --size-img: 36px;

  > .song-list {
    padding-top: 6px;
  }
`;

const headStyle = css`
  height: var(--size-img);
  padding: 0 40px;
  display: flex;
  align-items: center;
  --buts-width: 150px;
  > .name {
    font-size: var(--size-xxl);
    line-height: var(--size-name);
    max-width: calc(100% - var(--buts-width));
  }
  > .buts {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: var(--buts-width);
  }
`;

const Details = () => (
  <div class={headStyle}>
    <div class={cx('name', textEllipsis)}>{playlist_local_data[playlist_local_index()]?.name}</div>
    <div class="content"></div>
    <div class="buts">
      <Button
        type="primary"
        onClick={() => audioPlayList(playlist_local_data[playlist_local_index()]?.songs || [])}
      >
        播放全部
      </Button>
    </div>
  </div>
);

export default () => (
  <div class={style}>
    <Details />
    <SongList
      class="song-list"
      key={playlist_local_data[playlist_local_index()]?.key}
      songs={playlist_local_data[playlist_local_index()]?.songs || []}
    />
  </div>
);
