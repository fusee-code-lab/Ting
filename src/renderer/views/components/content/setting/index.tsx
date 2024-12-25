import { css } from '@emotion/css';
import Button from '../../basis/button';
import { audio_play_quality, set_audio_play_quality } from '@/renderer/store/audio';
import { SongQualityType } from '@/types/music';
import { appInfo } from '@/renderer/store';
import { openUrl } from '@youliso/electronic/render';

const titleStyle = css`
  padding: 0 30px 30px;
  font-size: var(--size-lg);
  color: var(--blue-color);
  font-weight: 600;
`;

const Title = () => <div class={titleStyle}>设置</div>;

const style = css`
  padding: 0 30px;
`;

const modStyle = css`
  margin-bottom: 22px;
  > .title {
    font-size: var(--size-xxs);
    font-weight: 600;
  }
  > .value {
    padding-top: 12px;
  }
`;

const qualityStyle = css`
  border-radius: var(--size-radius-xs);
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 4px;
  display: inline-flex;
  align-items: center;
  > .separator {
    margin: 0 2px;
    width: 1px;
    height: 8px;
    background-color: #8e8e93;
  }
  > .but {
    position: relative;
    border-radius: 3px;
    font-size: var(--size-xxxs);
    line-height: var(--size-xxxs);
    width: 90px;
    height: 24px;
  }
  > .but.act {
    background-color: var(--theme-blue);
    color: var(--white);
  }
`;

const QualityItem = (props: { type: SongQualityType; text: string }) => (
  <Button
    class="but"
    type={audio_play_quality() === props.type ? 'primary' : undefined}
    onClick={() => set_audio_play_quality(props.type)}
  >
    {props.text}
  </Button>
);

const Quality = () => (
  <div class={modStyle}>
    <div class="title">播放质量</div>
    <div class="value">
      <div class={qualityStyle}>
        <QualityItem type="standard" text="标准" />
        <div class="separator"></div>
        <QualityItem type="higher" text="较高" />
        <div class="separator"></div>
        <QualityItem type="exhigh" text="极高" />
      </div>
    </div>
  </div>
);

const aboutStyle = css`
  position: relative;
  > .txt {
    font-size: var(--size-xxs);
  }
  > .buts {
    display: flex;
    align-items: center;
    padding-top: 6px;
    > .but {
      width: 80px;
      height: 24px;
      margin-right: 10px;
      font-size: var(--size-xxxs);
      line-height: var(--size-xxxs);
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
const About = () => (
  <div class={modStyle}>
    <div class="title">
      关于 <span style="color: var(--blue-color);">Ting</span>
    </div>
    <div class="value">
      <div class={aboutStyle}>
        <div class="txt">当前版本 {appInfo.version}</div>
        <div class="txt">由 fusee-code-lab 开发</div>
        <div class="buts">
          <Button
            class="but"
            type="primary"
            onClick={() => openUrl('https://github.com/fusee-code-lab/ting-desktop')}
          >
            链接
          </Button>
          <Button class="but" onClick={() => openUrl('https://github.com/fusee-code-lab')}>
            github
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default () => {
  return (
    <>
      <Title />
      <div class={style}>
        <Quality />
        <About />
      </div>
    </>
  );
};
