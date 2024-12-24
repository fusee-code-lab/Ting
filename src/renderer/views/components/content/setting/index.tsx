import { css } from '@emotion/css';
import { SoundQualityType } from 'NeteaseCloudMusicApi';
import Button from '../../basis/button';

const titleStyle = css`
  padding: 0 30px 15px;
  font-size: var(--size-lg);
  color: var(--blue-color);
  font-weight: 600;
`;

const Title = () => <div class={titleStyle}>设置</div>;

const style = css`
  padding: 0 30px;
`;

const Quality = () => (
  <div>
    <div class="title">播放质量</div>
    <div class="value">
      <div class="buts">
        <Button>低</Button>
        <Button>中</Button>
        <Button type="primary">高</Button>
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
      </div>
    </>
  );
};
