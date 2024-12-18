import {
  audio_play_list_add,
  audio_play_list_details_data,
  audioPlayList
} from '@/renderer/store/audio';
import { css, cx } from '@emotion/css';
import { createSignal, For, Match, Show, Switch } from 'solid-js';
import { textEllipsis } from '../../styles';

import Button from '../basis/button';
import { SongItem } from '@fuseecodelab/ting-lib';

import netease_music_icon from '@/assets/icons/netease_music.png';
import netease_music_icon2x from '@/assets/icons/netease_music@2x.png';
import qq_music_icon from '@/assets/icons/qq_music.png';
import qq_music_icon2x from '@/assets/icons/qq_music@2x.png';

const style = css`
  height: 100%;
  --size-img: 180px;
`;

const headStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--size-img);
  padding: 0 40px;

  > .img {
    width: var(--size-img);
    height: 100%;
    border-radius: var(--size-radius-xs);
  }
  > .info {
    padding-left: 20px;
    width: calc(100% - var(--size-img));
    height: 100%;
    --size-name: 28px;
    --size-vice: 18px;
    --size-creat: 18px;
    --size-buts: 36px;
    > .name {
      font-size: var(--size-xxl);
      line-height: var(--size-name);
      height: var(--size-name);
    }
    > .vice {
      font-size: var(--size-xxxs);
      line-height: var(--size-vice);
      height: var(--size-vice);
      color: var(--secondary-label-color);
      > span {
        margin-left: 5px;

        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }
    > .desc {
      display: flex;
      padding: 10px 0 5px;
      height: calc(
        100% - var(--size-name) - var(--size-vice) - var(--size-creat) - var(--size-buts)
      );
      > .text {
        font-size: var(--size-xxs);
        line-height: calc(var(--size-xxs) + 2px);
        color: var(--secondary-label);
        resize: none;
        outline: none;
        border: none;
        width: 200px;
        height: 48px;

        &.hide {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          white-space: pre-line;
        }

        &.show {
          white-space: pre-line;
          overflow: hidden;
          overflow-y: overlay;
          width: 85%;
          height: 100%;
        }
      }
      > .more {
        display: flex;
        align-items: flex-end;
        height: 50px;
        padding-bottom: 3px;
        color: var(--blue-color);
        font-size: var(--size-xxxs);
      }
    }
    > .creat {
      display: flex;
      align-items: center;
      height: var(--size-creat);
      > .icon {
        height: 14px;
        object-fit: contain;
      }
      > .name {
        padding-left: 2px;
        color: var(--blue-color);
        font-size: var(--size-xxs);
        text-decoration: underline;
        cursor: default;
      }
    }
    > .buts {
      display: flex;
      align-items: flex-end;
      height: var(--size-buts);
      > button {
        margin-right: 15px;
        height: 26px;
        line-height: 26px;
        font-size: var(--size-xxxs);
        min-width: 85px;
        &:last-child {
          margin-right: 0;
        }
      }
      > .primary {
        background-color: var(--blue-color);
        color: #fff;
      }
    }
  }
`;

const Head = () => {
  console.log(audio_play_list_details_data);

  const [desc_show, set_desc_show] = createSignal(false);
  return (
    <div class={headStyle}>
      <Switch>
        <Match when={audio_play_list_details_data.source_type === 'netease'}>
          <img class="img" src={audio_play_list_details_data.data?.coverImgUrl} />
          <div class="info">
            <div class={cx('name', textEllipsis)}>{audio_play_list_details_data.data?.name}</div>
            <div class="vice">
              <span>{audio_play_list_details_data.data?.trackCount}首</span>
              <span>{audio_play_list_details_data.data?.tags.join('/')}</span>
            </div>
            <div class="desc">
              <div class={cx('text', desc_show() ? 'show' : 'hide')}>
                {audio_play_list_details_data.data?.description}
              </div>
              <Show when={!desc_show()}>
                <div class="more" onClick={() => set_desc_show(!desc_show())}>
                  更多
                </div>
              </Show>
            </div>
            <div class="creat">
              <img
                class="icon"
                srcset={`${netease_music_icon} 1x, ${netease_music_icon2x} 2x`}
                src={netease_music_icon2x}
              />
              {/* `https://music.163.com/#/user/home?id=${playlist.userId}` */}
              <div class="name">{audio_play_list_details_data.data?.creator?.nickname}</div>
            </div>
            <div class="buts">
              <Button
                class="primary"
                onClick={() => audioPlayList(audio_play_list_details_data.data?.tracks)}
              >
                播放全部
              </Button>
              <Button
                onClick={() => audio_play_list_add(audio_play_list_details_data.data?.tracks)}
              >
                添加
              </Button>
            </div>
          </div>
        </Match>
        <Match when={audio_play_list_details_data.source_type === 'qq'}>
          <img class="img" src={audio_play_list_details_data.data?.logo} />
          <div class="info">
            <div class={cx('name', textEllipsis)}>
              {audio_play_list_details_data.data?.dissname}
            </div>
            <div class="vice">
              <span>{audio_play_list_details_data.data?.songnum}首</span>
              <span>
                {audio_play_list_details_data.data?.tags.map((e: any) => e.name).join('/')}
              </span>
            </div>
            <div class="desc">
              <div class={cx('text', desc_show() ? 'show' : 'hide')}>
                {audio_play_list_details_data.data?.desc}
              </div>
              <Show when={!desc_show()}>
                <div class="more" onClick={() => set_desc_show(!desc_show())}>
                  更多
                </div>
              </Show>
            </div>
            <div class="creat">
              <img
                class="icon"
                srcset={`${qq_music_icon} 1x, ${qq_music_icon2x} 2x`}
                src={qq_music_icon2x}
              />
              {/* `https://music.163.com/#/user/home?id=${playlist.userId}` */}
              <div class="name">{audio_play_list_details_data.data?.nickname}</div>
            </div>
            <div class="buts">
              <Button
                class="primary"
                onClick={() => audioPlayList(audio_play_list_details_data.data?.songlist)}
              >
                播放全部
              </Button>
              <Button
                onClick={() => audio_play_list_add(audio_play_list_details_data.data?.songlist)}
              >
                添加
              </Button>
            </div>
          </div>
        </Match>
      </Switch>
    </div>
  );
};

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
    <div class={songListItemStyle}>
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
  padding-top: 25px;
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
    height: calc(100% - var(--size-title));
    overflow: hidden;
    overflow-y: auto;
    padding: 0 40px;
    > div:nth-child(odd) {
      background-color: var(--tertiary-label-color);
    }
  }
`;

const SongList = () => {
  return (
    <div class={songListStyle}>
      <div class="title">
        <div class="mod">歌曲</div>
        <div class="mod">艺人</div>
        <div class="mod">专辑</div>
        <div class="mod">时长</div>
      </div>
      <div class="list">
        <Switch>
          <Match when={audio_play_list_details_data.source_type === 'netease'}>
            <For each={audio_play_list_details_data.data?.tracks}>
              {(item, i) => <SongListItem data={item} />}
            </For>
          </Match>
          <Match when={audio_play_list_details_data.source_type === 'qq'}>
            <For each={audio_play_list_details_data.data?.songlist}>
              {(item, i) => <SongListItem data={item} />}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default () => (
  <div class={style}>
    <Head />
    <SongList />
  </div>
);
