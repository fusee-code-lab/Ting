import { css, cx } from '@emotion/css';
import Button from '../../basis/button';
import { audio_play_quality, set_audio_play_quality } from '@/renderer/store/audio';
import { SongQualityType } from '@/types/music';
import { appInfo, download_path, download_path_set } from '@/renderer/store';
import { openUrl } from '@youliso/electronic/render';
import { textEllipsis } from '@/renderer/views/styles';
import { playlist_save_path, playlist_save_path_set } from '@/renderer/store/playlist';
import { showOpenDialog } from '@/renderer/common/dialog';

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

const downloadStype = css`
  display: flex;
  align-items: center;
  > .path {
    background: rgba(0, 0, 0, 0.05);
    width: 255px;
    height: 24px;
    font-size: var(--size-xxs);
    line-height: 24px;
    padding: 0 15px;
    border-top-left-radius: var(--size-radius-xs);
    border-bottom-left-radius: var(--size-radius-xs);
  }
  > .but {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: var(--size-radius-xs);
    border-bottom-right-radius: var(--size-radius-xs);
    font-size: var(--size-xxxs);
    line-height: var(--size-xxxs);
    width: 50px;
    height: 24px;
    padding: 0;
  }
`;
const DownloadPath = () => (
  <div class={modStyle}>
    <div class="title">下载路径</div>
    <div class={cx('value', downloadStype)}>
      <div class={cx('path', textEllipsis)}>{download_path() || '-'}</div>
      <Button
        class="but"
        type="primary"
        onClick={() => {
          showOpenDialog({
            title: '选择下载路径',
            properties: ['openDirectory'],
            defaultPath: download_path()
          }).then((res) => {
            if (res.canceled) return;
            download_path_set(res.filePaths[0]);
          });
        }}
      >
        选择
      </Button>
    </div>
  </div>
);

const PlaylistPath = () => (
  <div class={modStyle}>
    <div class="title">默认歌单路径</div>
    <div class={cx('value', downloadStype)}>
      <div class={cx('path', textEllipsis)}>{playlist_save_path() || '-'}</div>
      <Button
        class="but"
        type="primary"
        onClick={() => {
          showOpenDialog({
            title: '选择默认歌单路径',
            properties: ['openDirectory'],
            defaultPath: playlist_save_path()
          }).then((res) => {
            if (res.canceled) return;
            playlist_save_path_set(res.filePaths[0]);
          });
        }}
      >
        选择
      </Button>
    </div>
  </div>
);

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
        <DownloadPath />
        <PlaylistPath />
        <Quality />
        <About />
      </div>
    </>
  );
};
