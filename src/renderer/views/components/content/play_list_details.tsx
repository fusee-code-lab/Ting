import { audio_play_list_details_data } from '@/renderer/store/audio';
import { css, cx } from '@emotion/css';
import { createSignal, Match, Show, Switch } from 'solid-js';
import { textEllipsis } from '../../styles';

import netease_music_icon from '@/assets/icons/netease_music.png';
import netease_music_icon2x from '@/assets/icons/netease_music@2x.png';
import Button from '../basis/button';

const style = css`
  padding: 0 40px 10px;
`;

const headStyle = css`
  --size-img: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--size-img);

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
        height: 50px;

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
        height: 28px;
        line-height: 28px;
        font-size: var(--size-xxs);
        min-width: 90px;
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
              <span>{audio_play_list_details_data.data?.trackCount}个</span>
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
              <Button class="primary">播放全部</Button>
              <Button>添加</Button>
            </div>
          </div>
        </Match>
        <Match when={audio_play_list_details_data.source_type === 'qq'}>
          <div>qq</div>
        </Match>
      </Switch>
    </div>
  );
};

export default () => (
  <div class={style}>
    <Head />
  </div>
);
