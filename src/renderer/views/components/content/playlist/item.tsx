import { audioPlay, is_audio_play_ing_data } from '@/renderer/store/audio';
import { playlist_details_data } from '@/renderer/store/playlist';
import { textEllipsis } from '@/renderer/views/styles';
import { css, cx } from '@emotion/css';
import { SongItem } from '@fuseecodelab/ting-lib';
import { VList } from 'virtua/solid';

const songListTableStyle = css`
  &:nth-child(1) {
    padding-left: 20px;
    width: 35%;
  }
  &:nth-child(2),
  &:nth-child(3) {
    padding-left: 20px;
    width: 25%;
  }
  &:nth-child(4) {
    width: 15%;
    text-align: center;
  }
`;

const songListItemStyle = css`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: var(--size-xxxs);
  border-radius: var(--size-radius-xs);
  &.ing {
    color: var(--blue-color);
  }
  > div {
    ${songListTableStyle}
  }
  > .song {
    display: flex;
    align-items: center;
    --size-img: 25px;
    > .img {
      width: var(--size-img);
      height: var(--size-img);
    }
    > .name {
      ${textEllipsis}
      padding-left: 10px;
      width: calc(100% - var(--size-img));
    }
  }
  > .artists,
  > .album {
    ${textEllipsis}
  }
`;

const SongListItem = (props: { data: SongItem }) => {
  return (
    <div
      class={cx(
        songListItemStyle,
        is_audio_play_ing_data(`${props.data.id}_${props.data.source_type}`) && 'ing'
      )}
      onClick={() => audioPlay(props.data)}
    >
      <div class="mod song">
        <img class="img" src={props.data.song_img_url} />
        <div class="name">{props.data.song_name}</div>
      </div>
      <div class="mod artists">{props.data.artists.map((e) => e.name).join(',')}</div>
      <div class="mod album">{props.data.album.name || '-'}</div>
      <div class="mod">{props.data.song_time}</div>
    </div>
  );
};

const songListStyle = css`
  width: 100%;
  padding-top: 25px;
  height: calc(100% - var(--size-img));
  --size-title: 28px;
  > .title {
    padding: 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--size-xxxs);
    color: var(--secondary-label-color);
    height: 26px;
    > div {
      ${songListTableStyle}
    }
  }
  > .list {
    height: calc(100% - var(--size-title)) !important;
    padding: 0 40px;
    > div {
      > div:nth-child(odd) {
        background-color: var(--tertiary-label-color);
        border-radius: var(--size-radius-xs);
      }
    }
  }
`;

export const SongList = () => {
  return (
    <div class={songListStyle}>
      <div class="title">
        <div class="mod">歌曲</div>
        <div class="mod">艺人</div>
        <div class="mod">专辑</div>
        <div class="mod">时长</div>
      </div>
      <VList
        class="list"
        data={
          playlist_details_data![
            playlist_details_data.source_type === 'netease' ? 'tracks' : 'songlist'
          ]
        }
      >
        {(item: SongItem) => <SongListItem data={item} />}
      </VList>
    </div>
  );
};
