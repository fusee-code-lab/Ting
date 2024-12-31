import {
  windowClose,
  windowHide,
  windowMessageSend,
  windowShow,
  windowSingleDataOn
} from '@youliso/electronic/render';
import { createSignal, onMount } from 'solid-js';
import { css, cx } from '@emotion/css';
import { isProduction, OS } from '@/renderer/store';
import { dragStyle } from '../styles';
import Input from '../components/basis/input';
import Button from '../components/basis/button';
import { playlist_local_insert } from '@/renderer/store/playlist';

const style = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  .info {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 15px;

    > .head {
      height: 24px;
      font-size: var(--size-xxl);
    }

    > .content {
      height: calc(100% - 24px - 36px);
      display: flex;
      flex-direction: column;
      justify-content: center;

      > .title {
        font-size: var(--size-xs);
        padding-bottom: 10px;
      }

      > .input {
        font-size: var(--size-xs);
        height: 36px;
        background-color: var(--gray-color);
      }
    }

    > .buts {
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > button {
        width: 49%;
      }
    }
  }
`;

export default () => {
  onMount(() => {
    windowShow();
  });

  windowSingleDataOn(() => {
    windowShow();
  });

  if (isProduction) {
    // 禁止点击就关闭
    window.onbeforeunload = (e) => {
      windowHide();
      e.returnValue = false;
    };
  }

  const [val, set_val] = createSignal('');
  const createSheet = async () => {
    const name = val().trim();
    const is = await playlist_local_insert(name);
    if (is) {
      await windowMessageSend(
        'playlist-sheet-update',
        { name },
        [window.customize.parentId!],
        false
      );
      windowClose();
    }
  };

  return (
    <div class={cx('container', dragStyle)}>
      <div class={style}>
        <div class="info">
          <div class="head">创建歌单</div>
          <div class="content">
            <div class="title">起个响亮的名字</div>
            <Input
              class="input"
              placeholder="歌单名称"
              value={val()}
              onInput={(e) => set_val(e.currentTarget.value)}
            />
          </div>
          <div class="buts">
            <Button onClick={() => windowClose()}>取消</Button>
            <Button type="primary" disabled={!val().trim()} onClick={createSheet}>
              确定
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
