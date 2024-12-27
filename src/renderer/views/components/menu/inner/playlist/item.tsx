import { css, cx } from '@emotion/css';
import play_list_icon from '@/assets/icons/play_list_icon.png';
import play_list_icon2x from '@/assets/icons/play_list_icon@2x.png';
import { textEllipsis } from '@/renderer/views/styles';
import { Playlist } from '@/types/playlist';
import { playlist_list_data_load } from '@/renderer/store/playlist';

const titleStyle = css`
  font-size: var(--size-xxs);
  color: var(--title-label-color);
  padding-bottom: 4px;
`;

export const ItemTitle = (props: { class?: string; title: string }) => {
  return <div class={cx(titleStyle, props.class)}>{props.title}</div>;
};

const itemStyle = css`
  display: flex;
  align-items: center;
  height: 23px;
  --icon-size: 14 px;
  > .icon {
    width: var(--icon-size);
    height: var(--icon-size);
    object-fit: contain;
  }
  > .title {
    width: calc(100% - var(--icon-size));
    padding-left: 6px;
    font-size: var(--size-xxs);
    line-height: var(--size-xxs);
  }
`;

const toPlayList = async (data: Playlist) => {
  const [, id] = data.key.split('_') as [string, string];
  await playlist_list_data_load(id);
};
export const Item = (props: { class?: string; data: Playlist }) => {
  return (
    <div class={cx(itemStyle, props.class)} onClick={() => toPlayList(props.data)}>
      <img
        class="icon"
        srcset={`${play_list_icon} 1x, ${play_list_icon2x} 2x`}
        src={play_list_icon2x}
      />
      <div class={cx('title', textEllipsis)}>{props.data.name}</div>
    </div>
  );
};
