import { audioPlayList } from '@/renderer/store/audio';
import { css, cx } from '@emotion/css';
import {
  playlist_details_data,
  playlist_list_data_add,
  playlist_list_data_has
} from '@/renderer/store/playlist';
import { createSignal, Match, Show, Switch } from 'solid-js';
import { textEllipsis } from '../../../styles';

import Button from '../../basis/button';

import netease_music_icon from '@/assets/icons/netease_music.png';
import netease_music_icon2x from '@/assets/icons/netease_music@2x.png';
import qq_music_icon from '@/assets/icons/qq_music.png';
import qq_music_icon2x from '@/assets/icons/qq_music@2x.png';
import { openUrl } from '@youliso/electronic/render';

const style = css`
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

const NeteaseHead = (props: { desc_show: boolean; on_desc_show: () => void; data: any }) => {
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
          <Button class="primary" onClick={() => audioPlayList(props.data?.tracks)}>
            播放全部
          </Button>
          <Button
            disabled={playlist_list_data_has('netease', props.data?.id)}
            onClick={() =>
              playlist_list_data_add({
                key: `netease_${props.data?.id}`,
                name: props.data?.name,
                cover: props.data?.coverImgUrl
              })
            }
          >
            {playlist_list_data_has('netease', props.data?.id) ? '已添加' : '添加'}
          </Button>
        </div>
      </div>
    </>
  );
};

const QQHead = (props: { desc_show: boolean; on_desc_show: () => void; data: any }) => {
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
          <Button class="primary" onClick={() => audioPlayList(props.data?.songlist)}>
            播放全部
          </Button>
          <Button
            disabled={playlist_list_data_has('qq', props.data?.disstid)}
            onClick={() =>
              playlist_list_data_add({
                key: `qq_${props.data?.disstid}`,
                name: props.data?.dissname,
                cover: props.data?.logo
              })
            }
          >
            {playlist_list_data_has('qq', props.data?.disstid) ? '已添加' : '添加'}
          </Button>
        </div>
      </div>
    </>
  );
};

export const Details = () => {
  const [desc_show, set_desc_show] = createSignal(false);
  const on_desc_show = () => set_desc_show(!desc_show());
  return (
    <div class={style}>
      <Show when={!!playlist_details_data}>
        <Switch>
          <Match when={playlist_details_data.source_type === 'netease'}>
            <NeteaseHead
              desc_show={desc_show()}
              on_desc_show={on_desc_show}
              data={playlist_details_data}
            />
          </Match>
          <Match when={playlist_details_data.source_type === 'qq'}>
            <QQHead
              desc_show={desc_show()}
              on_desc_show={on_desc_show}
              data={playlist_details_data}
            />
          </Match>
        </Switch>
      </Show>
    </div>
  );
};
