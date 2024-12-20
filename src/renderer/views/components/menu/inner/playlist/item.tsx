import { css, cx } from '@emotion/css';
import play_list_icon from '@/assets/icons/play_list_icon.png';
import play_list_icon2x from '@/assets/icons/play_list_icon@2x.png';
import { textEllipsis } from '@/renderer/views/styles';
import { Playlist } from '@/types/playlist';
import { playlist_detail } from '@/renderer/common/music';
import { MusicType } from '@fuseecodelab/ting-lib';
import { playlist_list_data_load, set_playlist_details_data } from '@/renderer/store/playlist';
import { set_content_route } from '@/renderer/store/content';

const titleStyle = css`
  font-size: var(--size-xxxs);
  color: var(--title-label-color);
`;

export const ItemTitle = (props: { class?: string; title: string }) => {
  return <div class={cx(titleStyle, props.class)}>{props.title}</div>;
};

const itemStyle = css`
  display: flex;
  align-items: center;
  height: 20px;
  --icon-size: 14 px;
  > .icon {
    width: var(--icon-size);
    height: var(--icon-size);
    object-fit: contain;
  }
  > .title {
    ${textEllipsis}
    width: calc(100% - var(--icon-size));
    padding-left: 6px;
    font-size: var(--size-xxxs);
    line-height: var(--size-xxs);
  }
`;

const toPlayList = async (data: Playlist) => {
  const [type, id] = data.key.split('_') as [MusicType, string];
  await playlist_list_data_load(type, id);
};
export const Item = (props: { class?: string; data: Playlist }) => {
  return (
    <div class={cx(itemStyle, props.class)} onClick={() => toPlayList(props.data)}>
      <img
        class="icon"
        srcset={`${play_list_icon} 1x, ${play_list_icon2x} 2x`}
        src={play_list_icon2x}
      />
      <div class="title">{props.data.name}</div>
    </div>
  );
};
