import { RouteSectionProps } from '@solidjs/router';
import { preload, windowShow } from '@youliso/electronic/render';
import { onMount } from 'solid-js';
import { dragStyle, nodragStyle } from '../styles';
import { css, cx } from '@emotion/css';
import { OS } from '@/renderer/store';

import logo_img from '@/assets/logo.png';
import Button from '../components/basis/button';
import { Visual } from '@/renderer/common/visual';

const bgBlueColorStyle = css`
  background-image: linear-gradient(153deg, #3b78d6 0%, #141d2e 100%);
`;

const bgPinkColorStyle = css`
  background-image: linear-gradient(153deg, #dd4e7c 0%, #1e1113 100%);
`;

const bgStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const horizontalPadding = "4em";

const wlStyle = css`
  right: 0;
  > .content {
    align-items: flex-end;
    padding-right: ${horizontalPadding};

    > .title {
      text-align: right;
    }
  }
`;

const macStyle = css`
  left: 0;
  > .content {
    align-items: flex-start;
    padding-left: ${horizontalPadding};

    > .title {
      text-align: left;
    }
  }
`;

const mainStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  /* background-color: var(--basic-color-a1); */
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > img {
      width: 54px;
      /* filter: hue-rotate(130deg) saturate(1.3) brightness(1.3); */
    }

    > .title {
      margin-top: 0.4em;
      font-size: var(--size-xxxl);
      letter-spacing: 1px;
      color: var(--white-color);
    }
  }
`;

const welcomeButtonClass = css`
  margin-top: 1.3em;
`

const onCanvas = (el: HTMLCanvasElement) => {
  el && new Visual(el, 'blue');
};

export default (props: RouteSectionProps) => {
  onMount(() => windowShow());
  const toHome = () => preload.send('window-first');

  return (
    <div class={cx('container', nodragStyle)}>
      <canvas class={cx(bgStyle, bgBlueColorStyle)} ref={onCanvas}></canvas>
      <div class={cx(dragStyle, mainStyle, OS === 'mac' ? macStyle : wlStyle)}>
        <div class="content">
          <img src={logo_img} />
          <div class="title">
            欢迎来到
            <span style="margin-left: 10px">Ting</span>
          </div>
          <Button class={welcomeButtonClass} onClick={toHome} type='primary' size='large'>
            开始
          </Button>
        </div>
      </div>
    </div>
  );
};
