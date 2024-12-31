import { audio_list_remove, audioPlay, is_audio_play_ing_data } from '@/renderer/store/audio';
import { textEllipsis } from '@/renderer/views/styles';
import { css, cx } from '@emotion/css';
import { SongItem } from '@/types/music';
import { CloseIcon } from '../../basis/icons';
import { MusicIcon } from '../../basis/music_icon';

const style = css`
  --size: 30px;
  height: 45px;
  padding: 0 10px;
  margin-bottom: 6px;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: var(--size-radius-xs);

  &:hover {
    background-color: var(--basic-color);
    > .close {
      display: flex;
    }
  }

  &.ing {
    background-color: var(--basic-color);
    > .info > .name {
      color: var(--blue-color);
    }
  }

  > .icon {
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    border-radius: var(--size-radius-xs);
  }

  > .info {
    width: calc(100% - var(--size));
    padding-left: 10px;
    > .name {
      font-size: var(--size-xxxs);
    }
    > .artists {
      font-size: var(--size-xxxs);
      color: var(--secondary-label-color);
      > .icon {
        width: var(--size-xxxs);
        height: var(--size-xxxs);
        margin-right: 4px;
      }
    }
  }

  > .close {
    --size-xs: 8px;
    --size-wh: calc(var(--size-xs) + 8px);
    position: absolute;
    right: 10px;
    width: var(--size-wh);
    height: var(--size-wh);
    border-radius: var(--size-radius-xxs);
    display: none;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: var(--tertiary-label-color);
    }
  }
`;

export const SongListItem = (props: { data: SongItem }) => {
  return (
    <div
      class={cx(
        style,
        is_audio_play_ing_data(`${props.data.id}_${props.data.source_type}`) && 'ing'
      )}
      onClick={() => audioPlay(props.data)}
    >
      <img class="icon" src={props.data.song_img_url} />
      <div class="info">
        <div class={cx('name', textEllipsis)}>{props.data.song_name}</div>
        <div class={cx('artists', textEllipsis)}>
          <MusicIcon class="icon" type={props.data.source_type} />
          {props.data.artists.map((e) => e.name).join(',')}
        </div>
      </div>
      <div
        class="close"
        onClick={(e) => {
          e.stopPropagation();
          audio_list_remove(props.data.id);
        }}
      >
        <CloseIcon />
      </div>
    </div>
  );
};
