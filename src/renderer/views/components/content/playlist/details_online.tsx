import { audioPlayList } from '@/renderer/store/audio';
import { openUrl } from '@youliso/electronic/render';
import { css, cx } from '@emotion/css';
import { playlist_details_online_data } from '@/renderer/store/playlist';
import { createSignal, Match, Show, Switch } from 'solid-js';
import { textEllipsis } from '../../../styles';
import Button from '../../basis/button';
import { SongList } from './item';
import { SheetAdd } from '../../playlist/sheet_add';

import netease_music_icon from '@/assets/icons/netease_music.png';
import netease_music_icon2x from '@/assets/icons/netease_music@2x.png';
import qq_music_icon from '@/assets/icons/qq_music.png';
import qq_music_icon2x from '@/assets/icons/qq_music@2x.png';
import { PlayList } from '@/types/music';

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
      overflow: hidden;
      overflow-y: auto;
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
      gap: 15px;
    }
  }
`;

const NeteaseHead = (props: {
  desc_show: boolean;
  on_desc_show: () => void;
  set_show: () => void;
  data: PlayList;
}) => {
  return (
    <>
      <img class="img" src={props.data?.coverImgUrl} />
      <div class="info">
        <div class={cx('name', textEllipsis)}>{props.data?.name}</div>
        <div class="vice">
          <span>{props.data?.trackCount}首</span>
          <span>{props.data?.tags.join('/')}</span>
        </div>
        <div class="desc">
          <div class={cx('text', props.desc_show ? 'show' : 'hide')}>
            {props.data?.description || '-'}
          </div>
          <Show
            when={
              !props.desc_show && !!props.data?.description && props.data?.description?.length > 40
            }
          >
            <div class="more" onClick={props.on_desc_show}>
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
          <div
            class="name"
            onClick={() =>
              openUrl(`https://music.163.com/#/user/home?id=${props.data?.creator?.userId}`)
            }
          >
            {props.data?.creator?.nickname}
          </div>
        </div>
        <div class="buts">
          <Button type="primary" onClick={() => audioPlayList(props.data?.playlist_songs)}>
            播放全部
          </Button>
          <Button onClick={() => props.set_show()}>添加</Button>
        </div>
      </div>
    </>
  );
};

const QQHead = (props: {
  desc_show: boolean;
  on_desc_show: () => void;
  set_show: () => void;
  data: PlayList;
}) => {
  return (
    <>
      <img class="img" src={props.data?.logo} />
      <div class="info">
        <div class={cx('name', textEllipsis)}>{props.data?.dissname}</div>
        <div class="vice">
          <span>{props.data?.songnum}首</span>
          <span>{props.data?.tags?.map((e: any) => e.name).join('/')}</span>
        </div>
        <div class="desc">
          <div class={cx('text', props.desc_show ? 'show' : 'hide')}>{props.data?.desc || '-'}</div>
          <Show when={!props.desc_show && !!props.data?.desc && props.data?.desc?.length > 40}>
            <div class="more" onClick={props.on_desc_show}>
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
          <div
            class="name"
            onClick={() =>
              openUrl(`https://y.qq.com/n/ryqq/profile/like/song?uin=${props.data?.uin}`)
            }
          >
            {props.data?.nickname}
          </div>
        </div>
        <div class="buts">
          <Button type="primary" onClick={() => audioPlayList(props.data?.playlist_songs)}>
            播放全部
          </Button>
          <Button onClick={() => props.set_show()}>添加</Button>
        </div>
      </div>
    </>
  );
};

const Details = () => {
  const [sheet_show, set_sheet_show] = createSignal(false);
  const [desc_show, set_desc_show] = createSignal(false);
  const on_desc_show = () => set_desc_show(!desc_show());
  return (
    <div class={headStyle}>
      <Switch>
        <Match
          when={
            !!playlist_details_online_data() &&
            playlist_details_online_data()?.source_type === 'netease'
          }
        >
          <NeteaseHead
            set_show={() => set_sheet_show(true)}
            desc_show={desc_show()}
            on_desc_show={on_desc_show}
            data={playlist_details_online_data()!}
          />
        </Match>
        <Match
          when={
            !!playlist_details_online_data() && playlist_details_online_data()?.source_type === 'qq'
          }
        >
          <QQHead
            set_show={() => set_sheet_show(true)}
            desc_show={desc_show()}
            on_desc_show={on_desc_show}
            data={playlist_details_online_data()!}
          />
        </Match>
      </Switch>
      <SheetAdd
        onClick={() => set_sheet_show(false)}
        visible={sheet_show()}
        songs={playlist_details_online_data()?.playlist_songs || []}
      />
    </div>
  );
};

const style = css`
  height: 100%;
  --size-img: 180px;
`;

export default () => (
  <div class={style}>
    <Details />
    <SongList online={true} songs={playlist_details_online_data()?.playlist_songs || []} />
  </div>
);
