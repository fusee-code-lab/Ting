import { textEllipsis } from '@/renderer/views/styles';
import { css, cx } from '@emotion/css';
import { SongItem } from '@/types/music';
import { MusicIcon } from '../../basis/music_icon';

const audio_info_style = css`
  height: 100%;
  display: flex;
  align-items: center;
  --size-wh: 35px;
  > .icon {
    width: var(--size-wh);
    height: var(--size-wh);
    object-fit: cover;
    border-radius: var(--size-radius-xs);
  }
  > .info {
    width: calc(100% - var(--size-wh));
    padding-left: 10px;
    > .name {
      font-size: var(--size-xxs);
    }
    > .artists {
      font-size: var(--size-xxxs);
      color: var(--secondary-label-color);
      > .icon {
        width: var(--size-xxxs);
        height: var(--size-xxxs);
        margin-right: 5px;
      }
    }
  }
`;

export const SongInfo = (props: { data: SongItem }) => {
  return (
    <div class={audio_info_style}>
      <img class="icon" src={props.data.song_img_url} />
      <div class="info">
        <div class={cx('name', textEllipsis)}>{props.data.song_name}</div>
        <div class={cx('artists', textEllipsis)}>
          <MusicIcon class="icon" type={props.data.source_type} />
          {props.data.artists.map((e) => e.name).join(',')}
        </div>
      </div>
    </div>
  );
};
