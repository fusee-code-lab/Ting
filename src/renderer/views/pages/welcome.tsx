import { RouteSectionProps } from '@solidjs/router';
import { windowShow } from '@youliso/electronic/render';
import { onMount } from 'solid-js';
import { dragStyle, nodragStyle } from '../styles';
import { css, cx } from '@emotion/css';
import { OS } from '@/renderer/store';

import rocket_img from '@/assets/rocket.png';
import logo_img from '@/assets/logo.png';
import Button from '../components/basis/button';

const imgStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const wlStyle = css`
  right: 0;
  > .content {
    align-items: flex-end;
    padding-right: 60px;

    > .title {
      text-align: right;
    }
  }
`;

const macStyle = css`
  left: 0;
  > .content {
    align-items: flex-start;
    padding-left: 60px;

    > .title {
      text-align: left;
    }
  }
`;

const mainStyle = css`
  ${OS === 'mac' ? macStyle : wlStyle}
  ${nodragStyle}
  position: absolute;
  top: 0;
  bottom: 0;
  width: 380px;
  background-color: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > img {
      width: 20%;
    }

    > .title {
      margin-top: 17px;
      height: 41px;
      font: bold 40px/40px ping-fang;
      letter-spacing: 1px;
      color: var(--blue-color);
    }

    > .but {
      margin-top: 35px;
      width: 120px;
      height: 32px;
      background-color: var(--blue-color);
      color: var(--white-color);
      font-size: 17px;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;

export default (props: RouteSectionProps) => {
  onMount(() => windowShow());

  return (
    <div class={cx(dragStyle, 'container')}>
      <img class={imgStyle} src={rocket_img} />
      <div class={mainStyle}>
        <div class="content">
          <img src={logo_img} />
          <div class="title">
            欢迎来到
            <span style="margin-left: 10px">Ting</span>
          </div>
          <Button class="but">开始</Button>
        </div>
      </div>
    </div>
  );
};
